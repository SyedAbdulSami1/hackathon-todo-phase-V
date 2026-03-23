'use client'

import React from 'react'
import { TaskStatus } from '@/types'
import { Filter, ListTodo, Clock, CheckCircle2, Search, ArrowUp, ArrowDown, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskFiltersProps {
  currentFilter: TaskStatus
  onFilterChange: (filter: TaskStatus) => void
  currentPriority: string
  onPriorityChange: (priority: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortByChange: (sortBy: string) => void
  sortOrder: 'asc' | 'desc'
  onSortOrderChange: (order: 'asc' | 'desc') => void
  className?: string
}

const statusOptions = [
  { value: 'all' as TaskStatus, label: 'All', icon: ListTodo },
  { value: 'pending' as TaskStatus, label: 'Pending', icon: Clock },
  { value: 'completed' as TaskStatus, label: 'Completed', icon: CheckCircle2 }
] as const

const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]

export function TaskFilters({
  currentFilter,
  onFilterChange,
  currentPriority,
  onPriorityChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  className
}: TaskFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Status Filters */}
        <div className="flex flex-wrap p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200/50 w-fit">
          {statusOptions.map((option) => {
            const Icon = option.icon;
            const isActive = currentFilter === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                  isActive 
                    ? "bg-white text-indigo-600 shadow-sm border border-slate-200/60" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-indigo-500" : "text-slate-300")} />
                {option.label}
              </button>
            )
          })}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Priority:</span>
          <div className="flex p-1 bg-slate-100/50 rounded-xl border border-slate-200/50">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onPriorityChange(option.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                  currentPriority === option.value 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/60" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search objectives or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none transition-all"
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value="created_at">Created Date</option>
              <option value="due_date">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Alphabetical</option>
            </select>
            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="ml-2 p-1.5 rounded-lg hover:bg-slate-50 text-indigo-500 transition-all"
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
