'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart3, Calendar, Users, Settings } from 'lucide-react'
import { useTranslation } from '@/store/useAppStore'

export default function BottomNav() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { icon: Home, label: t.nav.home, href: '/' },
    { icon: BarChart3, label: t.nav.mandi, href: '/mandi' },
    { icon: Calendar, label: t.nav.calendar, href: '/calendar' },
      { icon: Users, label: t.nav.expert, href: '/expert' },
    { icon: Settings, label: t.nav.settings, href: '/settings' },
  ]

  if (!mounted) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'fill-green-600/10' : ''}`} />
              <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-green-600 rounded-b-full shadow-[0_1px_4px_rgba(22,163,74,0.4)]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
