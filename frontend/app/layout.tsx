import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SyncronAI - Next Generation Task Management',
  description: 'Organize, prioritize, and execute with intelligence using SyncronAI powered by Google Gemini.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} mesh-gradient-light min-h-screen antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}