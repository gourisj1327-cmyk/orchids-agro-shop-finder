'use client'

import Link from 'next/link'
import { Camera, BarChart3, Calendar, ShoppingBag, Sprout, Store, FileText, Lightbulb, Users } from 'lucide-react'
import { useTranslation } from '@/store/useAppStore'

export default function ActionGrid() {
  const { t } = useTranslation()

  const actions = [
    { 
      icon: Camera, 
      label: t.home.diseaseScanner, 
      href: '/scanner', 
      color: 'bg-red-50 text-red-600',
      iconColor: 'text-red-600'
    },
    { 
      icon: BarChart3, 
      label: t.home.livePrices, 
      href: '/mandi', 
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'text-blue-600'
    },
    { 
      icon: Calendar, 
      label: t.home.cropCalendar, 
      href: '/calendar', 
      color: 'bg-green-50 text-green-600',
      iconColor: 'text-green-600'
    },
    { 
      icon: ShoppingBag, 
      label: t.home.marketplace, 
      href: '/marketplace', 
      color: 'bg-orange-50 text-orange-600',
      iconColor: 'text-orange-600'
    },
  ]

  const secondaryActions = [
    { icon: Store, label: t.nav.shops, href: '/shops' },
    { icon: FileText, label: t.home.govSchemes, href: '/schemes' },
    { icon: Users, label: t.nav.expert, href: '/expert' },
    { icon: Sprout, label: t.profile.fields, href: '/fields' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`${action.color} p-5 rounded-[2rem] flex flex-col gap-3 transition-transform active:scale-95 shadow-sm`}
          >
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm">
              <action.icon className={`h-6 w-6 ${action.iconColor}`} />
            </div>
            <span className="font-black text-sm leading-tight">{action.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {secondaryActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-2 p-2"
          >
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 active:scale-90 transition-transform">
              <action.icon className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-tighter">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
