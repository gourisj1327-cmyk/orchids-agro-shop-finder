'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, Mic, Plus, Check, Clock, AlertCircle, ChevronRight, Sprout } from 'lucide-react'
import { useTranslation, useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ACTIVITIES = [
  { id: 1, title: { en: 'Paddy - Fertilizer Application', hi: 'धान - उर्वरक प्रयोग', mr: 'भात - खत व्यवस्थापन' }, type: 'fertilizer', date: 'Today', done: false, time: '08:00 AM' },
  { id: 2, title: { en: 'Cotton - Pest Check', hi: 'कपास - कीट जांच', mr: 'कापूस - कीड तपासणी' }, type: 'pest', date: 'Today', done: true, time: '06:30 AM' },
  { id: 3, title: { en: 'Soybean - Irrigation', hi: 'सोयाबीन - सिंचाई', mr: 'सोयाबीन - पाणी देणे' }, type: 'irrigation', date: 'Tomorrow', done: false, time: '05:00 AM' },
  { id: 4, title: { en: 'Sugarcane - Weeding', hi: 'गन्ना - निराई', mr: 'ऊस - कोळपणी' }, type: 'weeding', date: 'Oct 25', done: false, time: '07:00 AM' },
]

export default function CalendarPage() {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState('upcoming')

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-black text-gray-900">{t.calendar.title}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Crop Cycle Management
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
            <Mic className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Season Info */}
        <section className="bg-green-600 rounded-[2.5rem] p-6 text-white shadow-lg shadow-green-100 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
              Current Season
            </div>
            <h2 className="text-3xl font-black mb-1">{t.calendar.kharif}</h2>
            <p className="text-green-50 font-bold opacity-80">{t.calendar.zaidSeason}</p>
          </div>
          <div className="relative z-10 bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10 text-center min-w-[80px]">
            <p className="text-[10px] font-bold uppercase mb-1 opacity-60">Day</p>
            <p className="text-3xl font-black">45</p>
          </div>
          <Sprout className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
        </section>

        {/* Calendar Navigation */}
        <section className="flex gap-2 bg-white p-2 rounded-3xl border border-gray-100 shadow-sm">
          {['upcoming', 'completed'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              className={`flex-1 rounded-2xl font-black capitalize ${activeTab === tab ? 'bg-gray-900' : 'text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'upcoming' ? t.calendar.today : t.calendar.thisWeek}
            </Button>
          ))}
        </section>

        {/* Activities List */}
        <section className="space-y-8">
          {['Today', 'Tomorrow', 'Oct 25'].map((date) => {
            const dateActivities = ACTIVITIES.filter(a => a.date === date)
            if (dateActivities.length === 0) return null

            return (
              <div key={date} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <h3 className="font-black text-gray-400 uppercase tracking-widest text-[10px]">
                    {date === 'Today' ? t.calendar.today : date}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {dateActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between transition-all active:scale-98 ${activity.done ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                          activity.type === 'fertilizer' ? 'bg-blue-50 text-blue-600' :
                          activity.type === 'pest' ? 'bg-red-50 text-red-600' :
                          activity.type === 'irrigation' ? 'bg-cyan-50 text-cyan-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {activity.type === 'fertilizer' ? '🧪' : 
                           activity.type === 'pest' ? '🪲' : 
                           activity.type === 'irrigation' ? '💧' : '🚜'}
                        </div>
                        <div>
                          <h4 className={`font-black text-gray-900 ${activity.done ? 'line-through' : ''}`}>
                            {activity.title[language as keyof typeof activity.title]}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        variant={activity.done ? 'default' : 'outline'}
                        className={`rounded-xl h-10 w-10 ${activity.done ? 'bg-green-600 border-green-600' : 'border-gray-200'}`}
                      >
                        {activity.done ? <Check className="h-5 w-5 text-white" /> : <Plus className="h-5 w-5 text-gray-300" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* AI Suggestion */}
        <section className="bg-orange-50 rounded-[2.5rem] p-6 border border-orange-100">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="font-black text-gray-900">{t.calendar.cropSuggestion}</h3>
          </div>
          <p className="text-sm font-bold text-orange-800 leading-relaxed mb-4">
            {language === 'en' ? 'Based on the weather forecast and your field data, we suggest applying fertilizer tomorrow evening.' : 'मौसम के पूर्वानुमान और आपके क्षेत्र के आंकड़ों के आधार पर, हम कल शाम उर्वरक प्रयोग करने का सुझाव देते हैं।'}
          </p>
          <Button variant="outline" className="w-full bg-white rounded-2xl font-black text-orange-700 border-orange-100 gap-2">
            {t.common.view} <ChevronRight className="h-4 w-4" />
          </Button>
        </section>

        {/* Add Button */}
        <Button className="fixed bottom-6 right-6 w-16 h-16 bg-gray-900 hover:bg-black rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-50">
          <Plus className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
