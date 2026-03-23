import React from 'react'
import { 
  CheckCircle2, 
  Trash2, 
  Calendar, 
  Clock,
  Tag,
  Flag,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import { Task } from '@/types'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onToggleComplete: (taskId: number) => void
  onDelete: (taskId: number) => void
  className?: string
}

export function TaskCard({
  task,
  onToggleComplete,
  onDelete,
  className
}: TaskCardProps) {
  const isCompleted = task.status === 'completed'
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !isCompleted

  const priorityColors = {
    low: 'bg-blue-50 text-blue-600 border-blue-100',
    medium: 'bg-amber-50 text-amber-600 border-amber-100',
    high: 'bg-rose-50 text-rose-600 border-rose-100'
  }

  const tagsList = task.tags ? task.tags.split(',').map(t => t.trim()).filter(t => t !== '') : []

  return (
    <div
      id={`task-${task.id}`}
      className={cn(
        "group relative bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 overflow-hidden",
        isCompleted && "bg-slate-50/50 border-slate-100",
        className
      )}
    >
      {/* Dynamic Background Element */}
      <div className={cn(
        "absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl transition-opacity duration-500",
        isCompleted ? "bg-green-100/40 opacity-100" : "bg-indigo-100/40 opacity-0 group-hover:opacity-100"
      )} />

      <div className="relative flex items-start gap-5">
        {/* Modern Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={cn(
            "mt-1 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ring-4",
            isCompleted 
              ? "bg-green-500 text-white ring-green-50 shadow-lg shadow-green-200" 
              : "bg-white border-2 border-slate-200 text-transparent ring-transparent hover:border-indigo-400 hover:ring-indigo-50"
          )}
        >
          <CheckCircle2 className={cn("w-4 h-4 transition-transform duration-300", isCompleted ? "scale-100" : "scale-0")} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <h3
              className={cn(
                "text-lg font-black tracking-tight transition-all duration-300 mr-1",
                isCompleted ? "text-slate-400 line-through" : "text-slate-900"
              )}
            >
              {task.title}
            </h3>
            
            {/* Priority Badge */}
            <span className={cn(
              "px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-lg border",
              priorityColors[task.priority]
            )}>
              {task.priority}
            </span>

            {task.is_recurring && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">
                <RefreshCw className="w-2.5 h-2.5" />
                {task.recurrence_interval}
              </span>
            )}

            {isCompleted && (
              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-green-200">
                Done
              </span>
            )}
          </div>

          {task.description && (
            <p
              className={cn(
                "text-[14px] font-medium leading-relaxed mb-4 line-clamp-2 transition-all duration-300",
                isCompleted ? "text-slate-300" : "text-slate-500"
              )}
            >
              {task.description}
            </p>
          )}

          {/* Tags */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tagsList.map((tag, idx) => (
                <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
            <div className={cn(
              "flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest",
              isOverdue ? "text-rose-500" : "text-slate-400"
            )}>
              <Calendar className={cn("w-3.5 h-3.5", isOverdue ? "text-rose-500" : "text-indigo-400")} />
              <span>
                {task.due_date 
                  ? new Date(task.due_date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : new Date(task.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                }
              </span>
              {isOverdue && <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />}
            </div>
            
            {task.updated_at !== task.created_at && (
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 text-slate-300" />
                <span>Updated</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDelete(task.id)}
            className="p-2.5 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
            title="Delete Task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Subtle indicator for high-priority tasks */}
      {!isCompleted && task.priority === 'high' && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-rose-500 rounded-r-full shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-all" />
      )}
    </div>
  )
}
