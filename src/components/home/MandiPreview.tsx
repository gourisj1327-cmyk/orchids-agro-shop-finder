'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useAppStore, useTranslation, useLocation } from '@/store/useAppStore'

export default function MandiPreview() {
  const { t, language } = useTranslation()
  const { location } = useLocation()

  const currentLanguage = language || 'en'
  const marketName = location.village || (currentLanguage === 'hi' ? 'सौंदलगा' : 'Soundalga')

  const prices = [
    { crop: t.crops.onion, price: `₹1,900${t.units.perQuintal}`, trend: 'up', icon: '🧅' },
    { crop: t.crops.tomato, price: `₹1,300${t.units.perQuintal}`, trend: 'down', icon: '🍅' },
    { crop: t.crops.rice, price: `₹2,280${t.units.perQuintal}`, trend: 'stable', icon: '🌾' },
  ]

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-black text-lg text-gray-900">{t.home.livePrices}</h3>
          <p className="text-xs text-gray-500 font-medium">{marketName} Market</p>
        </div>
        <Link href="/mandi">
          <button className="bg-green-50 text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors">
            <ArrowRight className="h-5 w-5" />
          </button>
        </Link>
      </div>

      <div className="space-y-3">
        {prices.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-lg">
                  {item.icon}
                </span>
              </div>
              <span className="font-bold text-gray-700">{item.crop}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-black text-gray-900">{item.price}</span>
              {item.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : item.trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-red-600" />
              ) : (
                <Minus className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Link href="/mandi" className="block mt-4 text-center">
        <span className="text-sm font-bold text-green-600 hover:underline">
          {t.home.viewAll}
        </span>
      </Link>
    </div>
  )
}
