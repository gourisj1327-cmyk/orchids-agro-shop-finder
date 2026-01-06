'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslation, useAppStore } from '@/store/useAppStore'
import WeatherCard from '@/components/home/WeatherCard'
import ActionGrid from '@/components/home/ActionGrid'
import MandiPreview from '@/components/home/MandiPreview'
import TipsCard from '@/components/home/TipsCard'
import GovSchemesPreview from '@/components/home/GovSchemesPreview'
import CommunityPreview from '@/components/home/CommunityPreview'
import { Bell, MapPin, ChevronRight, Mic, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { t, language } = useTranslation()
  const user = useAppStore(state => state.user)
  const location = useAppStore(state => state.location)

  // Default to 'en' if language is undefined
  const currentLanguage = language || 'en'

  // Safely get language-based strings
  const village = location.village || (currentLanguage === 'hi' ? 'सौंदलगा' : 'Soundalga')
  const district = location.district || (currentLanguage === 'hi' ? 'बेलगाम' : 'Belgaum')

  return (
    <div className="max-w-lg mx-auto pb-12">
      {/* Top Welcome Section */}
      <section className="px-6 py-6 bg-white border-b border-gray-50">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h1 className="text-2xl font-black text-gray-900 leading-tight">
                  {t.home.greeting.replace('{name}', user.name || t.common.farmer)}
                </h1>

                <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                  <MapPin className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-sm font-bold">{village}, {district}</span>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
            </div>
            <Button variant="ghost" size="icon" className="w-10 h-10 bg-gray-50 rounded-full text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl border border-green-100">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Mic className="h-4 w-4 text-white" />
            </div>
            <p className="text-xs font-bold text-green-800 leading-tight">
              "{t.home.todayHelp}: {t.home.sowAdvice}"
            </p>
          </div>
        </section>

      <div className="px-6 space-y-8 mt-6">
        {/* Weather + AI Advice Card */}
        <section>
          <WeatherCard />
        </section>

        {/* Main Action Buttons */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900">{t.home.quickActions}</h2>
            <Mic className="h-5 w-5 text-gray-400" />
          </div>
          <ActionGrid />
        </section>

        {/* Live Mandi Prices */}
        <section>
          <MandiPreview />
        </section>

        {/* Smart Farming Tip */}
        <section>
          <TipsCard />
        </section>

        {/* Today's Tasks */}
        <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-lg text-gray-900">{t.home.todayTasks}</h3>
            <Link href="/calendar" className="text-sm font-bold text-green-600">
              {t.home.viewAll}
            </Link>
          </div>
            <div className="space-y-3">
              {[
                { title: (currentLanguage === 'hi' ? 'धान - उर्वरक प्रयोग' : 'Paddy - Fertilizer Application'), done: false },
                { title: (currentLanguage === 'hi' ? 'कपास - कीट जांच' : 'Cotton - Pest Check'), done: true },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${task.done ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                  {task.done && <Check className="h-4 w-4 text-white" />}
                </div>
                <span className={`font-bold ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Government Schemes */}
        <section>
          <GovSchemesPreview />
        </section>

        {/* Community Inspiration */}
        <section>
          <CommunityPreview />
        </section>

        {/* Expert Talk */}
        <section>
          <div className="bg-orange-600 rounded-[2rem] p-6 text-white shadow-lg shadow-orange-100 flex items-center justify-between">
            <div>
                <h3 className="font-black text-xl mb-1">{t.home.expertChat}</h3>
                <p className="text-orange-100 text-sm font-bold">{currentLanguage === 'hi' ? 'विशेषज्ञों से मुफ्त बात करें' : 'Talk to experts for free'}</p>
              </div>
            <Link href="/expert">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 rounded-full font-black px-6 shadow-xl active:scale-95 transition-transform">
                {t.home.talkToExpert}
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer Info */}
        <section className="text-center py-8">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <span className="text-2xl">🇮🇳</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Proudly serving Indian Farmers
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
