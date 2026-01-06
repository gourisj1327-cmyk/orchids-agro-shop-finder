'use client'

import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'
import { useAppStore, useTranslation } from '@/store/useAppStore'

export default function GovSchemesPreview() {
  const { t, language } = useTranslation()
  
  const currentLanguage = language || 'en'

  const schemes = [
    { title: 'PM-KISAN Samman Nidhi', status: currentLanguage === 'hi' ? 'पात्र' : 'Eligible', icon: '🏛️' },
    { title: 'Pradhan Mantri Fasal Bima', status: t.schemes.applyNow, icon: '🌾' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-black text-lg text-gray-900">{t.home.govSchemes}</h3>
        <Link href="/schemes" className="text-sm font-bold text-green-600">
          {t.home.viewAll}
        </Link>
      </div>

      <div className="grid gap-3">
        {schemes.map((scheme, i) => (
          <Link
            key={i}
            href="/schemes"
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-xl">
                {scheme.icon}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{scheme.title}</p>
                <p className={`text-[10px] font-black uppercase tracking-wider ${
                  scheme.status === 'Eligible' || scheme.status === 'पात्र' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {scheme.status}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300" />
          </Link>
        ))}
      </div>
    </div>
  )
}
