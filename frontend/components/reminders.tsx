'use client'

import React, { useEffect, useState } from 'react'
import { Bell, Clock, Calendar, AlertTriangle, ChevronRight, X } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { Task } from '@/types'
import { cn } from '@/lib/utils'

export function Reminders() {
  const [reminders, setReminders] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await apiClient.getReminders()
        setReminders(data)
      } catch (err) {
        console.error('Failed to fetch reminders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReminders()
    // Refresh every 5 minutes
    const interval = setInterval(fetchReminders, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading || reminders.length === 0 || !isOpen) return null

  return (
    <div className="mb-8 animate-in slide-in-from-top duration-700">
      <div className="glass overflow-hidden rounded-[2rem] border border-amber-100 shadow-xl shadow-amber-50/50 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-400" />
        
        <div className="p-5 flex items-center justify-between bg-amber-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
              <Bell className="w-5 h-5 animate-ring" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">Upcoming Deadlines</h3>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest leading-none">Attention Required</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-amber-50">
          {reminders.map((task) => {
            const isOverdue = task.due_date && new Date(task.due_date) < new Date()
            return (
              <div key={task.id} className="p-4 flex items-center justify-between group hover:bg-white/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isOverdue ? "bg-rose-500 animate-pulse" : "bg-amber-400"
                  )} />
                  <div>
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn(
                        "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                        isOverdue ? "text-rose-500" : "text-slate-400"
                      )}>
                        <Clock className="w-3 h-3" />
                        {isOverdue ? 'Overdue' : 'Due Soon'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300">
                        {task.due_date && new Date(task.due_date).toLocaleString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById(`task-${task.id}`)
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    el?.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-4')
                    setTimeout(() => el?.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-4'), 2000)
                  }}
                  className="p-2 rounded-lg bg-white shadow-sm border border-slate-100 text-slate-400 group-hover:text-amber-600 group-hover:border-amber-200 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
        
        {reminders.length > 2 && (
          <div className="p-2 text-center bg-white/50 border-t border-amber-50">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Showing {reminders.length} urgent objectives
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }
        .animate-ring {
          animation: ring 2s ease infinite;
        }
      `}</style>
    </div>
  )
}
