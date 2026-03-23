'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TaskList } from '@/components/task-list'
import { AuthForms } from '@/components/auth-forms'
import { authClient } from '@/lib/auth'
import { User } from '@/types'
import { Navigation } from '@/components/Navigation'
import { FloatingChat } from '@/components/FloatingChat'
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight, 
  Github, 
  Linkedin,
  BrainCircuit,
  Layout,
  MessageSquare,
  Mail,
  MessageCircle,
  Shapes,
  Command,
  CheckCircle2,
  Mic,
  Bot,
  Lock,
  MousePointer2,
  Layers
} from 'lucide-react'

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const isAuthenticated = authClient.isAuthenticated()
    setLoggedIn(isAuthenticated)

    if (isAuthenticated) {
      const fetchUser = async () => {
        const currentUser = await authClient.getCurrentUser()
        setUser(currentUser)
      }
      fetchUser()
    }
  }, [])

  const handleLogout = () => {
    authClient.logout()
    setLoggedIn(false)
    setUser(null)
  }

  if (!isMounted) return null

  if (!loggedIn) {
    return (
      <div className="overflow-x-hidden selection:bg-indigo-500 selection:text-white bg-white">
        {/* Navigation for Landing */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100/50 h-16 flex items-center">
          <div className="section-container w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Command className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">Syncron<span className="text-indigo-600">AI</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#86868B]">
              <a href="#features" className="hover:text-[#1D1D1F] transition-colors">Features</a>
              <a href="#chatbot" className="hover:text-[#1D1D1F] transition-colors">AI Chatbot</a>
              <a href="#security" className="hover:text-[#1D1D1F] transition-colors">Security</a>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-1.5 bg-[#1D1D1F] text-white rounded-full text-xs font-semibold hover:bg-black transition-all active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/60 rounded-full blur-[140px]"></div>
          </div>

          <div className="section-container text-center space-y-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-full text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] animate-slide-up shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>The Next Generation of Task Management</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.02] text-[#1D1D1F] animate-slide-up [animation-delay:100ms]">
              The Todo App <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 bg-clip-text text-transparent italic">with a Brain.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-[#86868B] font-medium leading-relaxed animate-slide-up [animation-delay:200ms]">
              Syncron AI isn&apos;t just a list. It&apos;s your personal assistant powered by 
              Google Gemini 1.5 Flash. Organize, prioritize, and execute with intelligence.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:300ms]">
              <button 
                onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
              >
                Create Your First Task <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-semibold hover:bg-slate-50 transition-all active:scale-95"
              >
                See AI in Action
              </button>
            </div>
          </div>
        </section>

        {/* CORE FEATURES - BENTO GRID */}
        <section id="features" className="py-32 bg-[#FBFBFD] border-y border-slate-100">
          <div className="section-container">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need. <br/>Plus everything you wished for.</h2>
              <p className="text-xl text-[#86868B] font-medium">Standard task management meets cutting-edge Agentic AI.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Feature 1 */}
              <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Streamlined List Management</h3>
                <p className="text-[#86868B] text-lg font-medium leading-relaxed max-w-md">
                  Add, edit, delete, and categorize tasks with zero friction. Our minimal UI 
                  is designed to reduce cognitive load and keep you focused on completion.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="md:col-span-4 bg-[#1D1D1F] p-10 rounded-[2.5rem] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                  <Zap className="w-40 h-40" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8">
                    <Zap className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-indigo-400">Real-time Updates</h3>
                    <p className="text-slate-400 font-medium">Instant sync across all your sessions. No refresh needed.</p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="md:col-span-4 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-8">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Filtering</h3>
                <p className="text-[#86868B] font-medium">Filter by status, priority, or category with a single click.</p>
              </div>

              {/* Feature 4 */}
              <div className="md:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                   <div className="flex-1 space-y-4">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Model Context Protocol</h3>
                    <p className="text-[#86868B] font-medium leading-relaxed">
                      We use MCP (Model Context Protocol) to bridge the gap between AI and your data. 
                      It allows Gemini to manipulate your task list securely and transparently.
                    </p>
                  </div>
                  <div className="w-full md:w-64 h-48 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Protocol Active</div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:200ms]"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:400ms]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI CHATBOT EXPERIENCE */}
        <section id="chatbot" className="py-32 bg-white">
          <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold tracking-widest uppercase">
                The Chatbot Experience
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F]">
                Stop typing. <br/>Start talking.
              </h2>
              <p className="text-xl text-[#86868B] font-medium leading-relaxed">
                Syncron AI features a built-in Gemini Assistant. Just tell it what to do:
              </p>
              <div className="space-y-6">
                {[
                  "Add a task to buy groceries tomorrow at 10 AM",
                  "List all my urgent pending tasks",
                  "Complete the task related to project documentation",
                  "Summarize my workload for this week"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-slide-up" style={{ animationDelay: `${(i+1)*100}ms` }}>
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <MessageSquare className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-slate-600 font-medium font-mono text-sm italic">&quot;{text}&quot;</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#86868B] font-medium flex items-center gap-2">
                <Bot className="w-4 h-4" /> Powered by OpenAI Agent SDK & Google Gemini 1.5 Flash
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-indigo-100/50 rounded-full blur-[100px] -z-10"></div>
              <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 p-2 border border-slate-100 rotate-1">
                <div className="bg-slate-50 rounded-[2.6rem] p-8 min-h-[500px] flex flex-col justify-end">
                   <div className="space-y-6">
                     <div className="flex justify-end">
                        <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-lg shadow-indigo-100">
                          Add a task to finish the Hackathon report by Monday.
                        </div>
                     </div>
                     <div className="flex justify-start gap-4">
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                          <Command className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-sm max-w-[80%] shadow-sm">
                          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-2">
                            <Sparkles className="w-3 h-3" /> Assistant
                          </div>
                          I&apos;ve added &quot;Finish Hackathon report&quot; to your pending tasks with a deadline for next Monday. Would you like me to prioritize this?
                        </div>
                     </div>
                     <div className="pt-4 flex justify-center">
                        <div className="px-6 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
                          Syncron is listening...
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY SECTION */}
        <section id="security" className="py-32 bg-[#FBFBFD] overflow-hidden">
          <div className="section-container text-center max-w-3xl space-y-8">
             <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-sm">
                <Lock className="w-8 h-8 text-[#1D1D1F]" />
             </div>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">Your privacy is built-in. <br/>Not bolted on.</h2>
             <p className="text-xl text-[#86868B] font-medium leading-relaxed">
               Every task you create, every message you send to the AI, and every bit of your data 
               is secured via JWT Authentication and Row-Level Security (RLS) on Neon DB. 
               We use MCP to ensure that AI only interacts with what you permit.
             </p>
             <div className="flex flex-wrap justify-center gap-12 pt-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="flex items-center gap-2 font-bold text-xl text-slate-400">NEON DB</div>
               <div className="flex items-center gap-2 font-bold text-xl text-slate-400">FAST API</div>
               <div className="flex items-center gap-2 font-bold text-xl text-slate-400">NEXT.JS</div>
               <div className="flex items-center gap-2 font-bold text-xl text-slate-400">OPENAI</div>
             </div>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section className="py-32 bg-white">
          <div className="section-container grid grid-cols-1 md:grid-cols-2 items-center gap-20">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 to-rose-50 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative p-1 bg-white rounded-[2.8rem] shadow-sm border border-slate-100">
                <Image 
                  src="https://yt3.googleusercontent.com/ytc/AIdro_nDvqZTu9DGV1ZrV_k8H00SJpHawVKCDhJbUnMO-dPTtjY=s160-c-k-c0x00ffffff-no-rj" 
                  alt="Syed Abdul Sami" 
                  width={500}
                  height={500}
                  className="rounded-[2.6rem] grayscale hover:grayscale-0 transition-all duration-700 w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 bg-white rounded-3xl shadow-xl border border-slate-50 animate-bounce-slow">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Status</div>
                <div className="text-sm font-bold text-slate-900">Building the Future</div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-block text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Behind the Innovation</div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">Syed Abdul Sami</h2>
                <div className="text-xl font-medium text-indigo-600">Lead Architect & Visionary</div>
              </div>
              <p className="text-xl text-[#86868B] font-medium leading-relaxed italic">
                &quot;Syncron was built to bridge the gap between human intent and machine execution. 
                It’s not just a tool; it’s an extension of your mind, powered by the latest in Agentic AI.&quot;
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/SyedAbdulSami1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/syed-abdul-sami-964a36277/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:samiwpp@gmail.com" className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://wa.me/923018420180" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:border-green-200 hover:text-green-600 transition-all shadow-sm">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* AUTH SECTION */}
        <section id="auth-section" className="py-32 bg-[#F5F5F7] relative">
          <div className="max-w-md mx-auto px-6 relative z-10">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-4xl font-bold tracking-tight">Experience Syncron AI</h2>
              <p className="text-[#86868B] font-medium">Create your secure account to start mastering your tasks.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <AuthForms onSuccess={() => setLoggedIn(true)} />
            </div>
          </div>
        </section>

        <footer className="py-24 bg-white border-t border-slate-100">
          <div className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <Command className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-bold tracking-tight">Syncron<span className="text-indigo-600">AI</span></span>
                </div>
                <p className="text-sm text-[#86868B] max-w-xs">Building the future of productivity with human-centric AI agents.</p>
              </div>
              <div className="text-center md:text-right space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Designed & Developed by Syed Abdul Sami</p>
                <p className="text-xs text-slate-300">© 2026 Hackathon Phase IV Edition. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] pb-20">
      <Navigation user={user || undefined} onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <TaskList />
      </div>
      <FloatingChat user={user} />
    </div>
  )
}
