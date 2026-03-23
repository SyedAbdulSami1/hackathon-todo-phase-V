from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, or_, case
from typing import List, Optional
from datetime import datetime, timedelta
from models import (
    Task, TaskCreate, TaskUpdate, TaskResponse,
    User, TaskStatus, TaskFilter, Priority, RecurrenceInterval
)
from db import get_session
from dependencies.auth import get_current_active_user

router = APIRouter()

def get_next_due_date(current_due_date: datetime, interval: RecurrenceInterval) -> datetime:
    """Calculate the next due date based on the interval."""
    if not current_due_date:
        current_due_date = datetime.utcnow()
        
    if interval == RecurrenceInterval.daily:
        return current_due_date + timedelta(days=1)
    elif interval == RecurrenceInterval.weekly:
        return current_due_date + timedelta(weeks=1)
    elif interval == RecurrenceInterval.monthly:
        # Improved monthly calculation (handles different month lengths better than simple +30)
        # We add 30 days as fallback, or use a slightly better logic
        # For full accuracy we'd use dateutil.relativedelta
        new_month = current_due_date.month + 1
        new_year = current_due_date.year
        if new_month > 12:
            new_month = 1
            new_year += 1
        
        try:
            return current_due_date.replace(year=new_year, month=new_month)
        except ValueError:
            # If the day doesn't exist in the next month (e.g. Jan 31 -> Feb)
            # Cap it at the last day of the next month
            return current_due_date + timedelta(days=30)
            
    return current_due_date

@router.post("", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Create a new task"""
    db_task = Task(
        title=task.title,
        description=task.description,
        status=task.status or TaskStatus.pending,
        priority=task.priority or Priority.medium,
        tags=task.tags,
        due_date=task.due_date,
        is_recurring=task.is_recurring or False,
        recurrence_interval=task.recurrence_interval or RecurrenceInterval.none,
        user_id=current_user.id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("", response_model=List[TaskResponse])
@router.get("/", response_model=List[TaskResponse])
def read_tasks(
    skip: int = 0,
    limit: int = 100,
    status: Optional[TaskStatus] = None,
    priority: Optional[Priority] = None,
    tags: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = "created_at",
    order: Optional[str] = "desc",
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get tasks for current user with optional filtering and sorting"""
    query = select(Task).where(Task.user_id == current_user.id)

    if status:
        query = query.where(Task.status == status)
    
    if priority:
        query = query.where(Task.priority == priority)
    
    if tags:
        # Simple search in tags string
        query = query.where(Task.tags.ilike(f"%{tags}%"))

    if search:
        query = query.where(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%"),
                Task.tags.ilike(f"%{search}%")
            )
        )

    # Special handling for priority sorting (High > Medium > Low)
    if sort_by == "priority":
        priority_order = case(
            (Task.priority == Priority.high, 1),
            (Task.priority == Priority.medium, 2),
            (Task.priority == Priority.low, 3),
            else_=4
        )
        if order == "desc":
            query = query.order_by(priority_order.desc())
        else:
            query = query.order_by(priority_order.asc())
    else:
        # Standard sorting logic
        sort_column = getattr(Task, sort_by) if hasattr(Task, sort_by) else Task.created_at
        if order == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

    tasks = session.exec(query.offset(skip).limit(limit)).all()
    return tasks

@router.get("/reminders", response_model=List[TaskResponse])
def get_reminders(
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get tasks that are due soon (within next 24 hours) or overdue"""
    now = datetime.utcnow()
    soon = now + timedelta(hours=24)
    
    # Fetch tasks that are not completed AND (overdue OR due within 24 hours)
    query = select(Task).where(
        Task.user_id == current_user.id,
        Task.status != TaskStatus.completed,
        Task.due_date != None,
        or_(Task.due_date <= soon)
    ).order_by(Task.due_date.asc())
    
    return session.exec(query).all()

@router.get("/{task_id}", response_model=TaskResponse)
def read_task(
    task_id: int,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get a specific task"""
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this task"
        )
    return task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Update a task and handle recurring logic"""
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    old_status = task.status
    
    # Update fields if provided
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    task.updated_at = datetime.utcnow()

    # Recurring Task Logic
    # If task is now completed and it was not completed before, and it is recurring
    if task.status == TaskStatus.completed and old_status != TaskStatus.completed and task.is_recurring:
        next_due = get_next_due_date(task.due_date or datetime.utcnow(), task.recurrence_interval)
        
        new_task = Task(
            title=task.title,
            description=task.description,
            status=TaskStatus.pending,
            priority=task.priority,
            tags=task.tags,
            due_date=next_due,
            is_recurring=True,
            recurrence_interval=task.recurrence_interval,
            user_id=task.user_id
        )
        session.add(new_task)

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Delete a task"""
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this task"
        )

    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}

@router.patch("/{task_id}/status")
def update_task_status(
    task_id: int,
    status: TaskStatus,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Update task status (quick status update) with recurring logic"""
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    if task.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this task"
        )

    old_status = task.status
    task.status = status
    task.updated_at = datetime.utcnow()

    # Recurring Task Logic
    if task.status == TaskStatus.completed and old_status != TaskStatus.completed and task.is_recurring:
        next_due = get_next_due_date(task.due_date or datetime.utcnow(), task.recurrence_interval)
        
        new_task = Task(
            title=task.title,
            description=task.description,
            status=TaskStatus.pending,
            priority=task.priority,
            tags=task.tags,
            due_date=next_due,
            is_recurring=True,
            recurrence_interval=task.recurrence_interval,
            user_id=task.user_id
        )
        session.add(new_task)

    session.add(task)
    session.commit()
    return {"message": "Task status updated successfully"}
