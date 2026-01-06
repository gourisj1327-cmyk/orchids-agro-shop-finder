'use client'

import { Cloud, Sun, CloudRain, Thermometer, Mic } from 'lucide-react'
import { useAppStore, useTranslation, useLocation } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'

export default function WeatherCard() {
  const { t, language } = useTranslation()
  const { location } = useLocation()
  
  const currentLanguage = language || 'en'

  const villageName = location.village || (currentLanguage === 'hi' ? 'सौंदलगा' : 'Soundalga')
  const districtName = location.district ? `${location.district}, ${location.state}` : (currentLanguage === 'hi' ? 'बेलगाम, कर्नाटक' : 'Belgaum, Karnataka')

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20">
        <Sun className="h-32 w-32" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-bold uppercase tracking-wider text-[10px] mb-1">
                {t.home.todayWeather}
              </p>
                <h2 className="text-2xl font-black">
                  {villageName}
                </h2>
                <p className="text-blue-100 text-sm font-medium">
                  {districtName}
                </p>

            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Sun className="h-8 w-8 text-yellow-300 fill-yellow-300" />
                <span className="text-4xl font-black">32°</span>
              </div>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-tighter mt-1">
                {t.weather.sunny}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 min-w-[100px] border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className="h-4 w-4 text-blue-200" />
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{t.weather.rainfall}</span>
              </div>
              <p className="text-lg font-black">12%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 min-w-[100px] border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="h-4 w-4 text-blue-200" />
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{t.weather.humidity}</span>
              </div>
              <p className="text-lg font-black">45%</p>
            </div>
          </div>

          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-400 p-2 rounded-xl">
                <Sun className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">{t.home.aiAdvice}</p>
                <p className="text-sm font-bold leading-tight">{t.home.sowAdvice}</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="bg-white/20 hover:bg-white/30 rounded-full h-10 w-10">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
      </div>
    </div>
  )
}
