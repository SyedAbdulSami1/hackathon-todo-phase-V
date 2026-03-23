from datetime import datetime
from typing import Optional, List, Union
from enum import Enum
from sqlmodel import SQLModel, Field, select
from pydantic import BaseModel, EmailStr, Field as PydanticField


# Base model for database tables
class BaseSQLModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Task Status Enum
class TaskStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


# Task Priority Enum
class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


# Recurrence Interval Enum
class RecurrenceInterval(str, Enum):
    none = "none"
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"


# Database Models
class User(BaseSQLModel, table=True):
    __tablename__ = "users"

    username: str = Field(sa_column_kwargs={"unique": True}, index=True)
    email: EmailStr = Field(sa_column_kwargs={"unique": True}, index=True)
    hashed_password: str
    is_active: bool = Field(default=True)


class Task(BaseSQLModel, table=True):
    __tablename__ = "tasks"

    title: str = Field(max_length=200, index=True)
    description: Optional[str] = Field(max_length=1000, default=None)
    status: TaskStatus = Field(default=TaskStatus.pending, index=True)
    priority: Priority = Field(default=Priority.medium, index=True)
    tags: Optional[str] = Field(default=None) # Comma-separated strings
    due_date: Optional[datetime] = Field(default=None, index=True)
    is_recurring: bool = Field(default=False)
    recurrence_interval: RecurrenceInterval = Field(default=RecurrenceInterval.none)
    user_id: int = Field(foreign_key="users.id", index=True)


# Pydantic Models for API
class TaskCreate(BaseModel):
    title: str = PydanticField(min_length=1, max_length=200)
    description: Optional[str] = PydanticField(max_length=1000, default=None)
    status: Optional[TaskStatus] = PydanticField(default=TaskStatus.pending)
    priority: Optional[Priority] = PydanticField(default=Priority.medium)
    tags: Optional[str] = PydanticField(default=None)
    due_date: Optional[datetime] = PydanticField(default=None)
    is_recurring: Optional[bool] = PydanticField(default=False)
    recurrence_interval: Optional[RecurrenceInterval] = PydanticField(default=RecurrenceInterval.none)


class TaskUpdate(BaseModel):
    title: Optional[str] = PydanticField(default=None, min_length=1, max_length=200)
    description: Optional[str] = PydanticField(default=None, max_length=1000)
    status: Optional[TaskStatus] = None
    priority: Optional[Priority] = None
    tags: Optional[str] = None
    due_date: Optional[datetime] = None
    is_recurring: Optional[bool] = None
    recurrence_interval: Optional[RecurrenceInterval] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    priority: Priority
    tags: Optional[str]
    due_date: Optional[datetime]
    is_recurring: bool
    recurrence_interval: RecurrenceInterval
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]
    total: int
    page: int
    per_page: int


class TaskFilter(BaseModel):
    status: Optional[TaskStatus] = None
    priority: Optional[Priority] = None
    tags: Optional[str] = None
    search: Optional[str] = None
    sort_by: Optional[str] = "created_at"
    order: Optional[str] = "desc"


# Pydantic Models for API
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class AuthResponse(BaseModel):
    user: UserResponse
    token: str
    token_type: str
