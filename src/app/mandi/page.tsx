'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, TrendingUp, TrendingDown, Minus, Filter, ChevronLeft, Mic } from 'lucide-react'
import { useTranslation, useLocation, useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const CROPS = [
  { id: 'rice', name: { en: 'Rice', hi: 'चावल', mr: 'भात' }, icon: '🌾' },
  { id: 'wheat', name: { en: 'Wheat', hi: 'गेहूं', mr: 'गहू' }, icon: '🌾' },
  { id: 'onion', name: { en: 'Onion', hi: 'प्याज', mr: 'कांदा' }, icon: '🧅' },
  { id: 'tomato', name: { en: 'Tomato', hi: 'टमाटर', mr: 'टोमॅटो' }, icon: '🍅' },
  { id: 'cotton', name: { en: 'Cotton', hi: 'कपास', mr: 'कापूस' }, icon: '☁️' },
  { id: 'soybean', name: { en: 'Soybean', hi: 'सोयाबीन', mr: 'सोयाबीन' }, icon: '🫘' },
]

const SAMPLE_PRICES = [
  { crop: 'Onion', mandi: 'Soundalga', price: 1950, trend: 'up', lastUpdated: '2 hours ago' },
  { crop: 'Tomato', mandi: 'Soundalga', price: 1300, trend: 'down', lastUpdated: '1 hour ago' },
  { crop: 'Rice', mandi: 'Chikkodi', price: 2280, trend: 'stable', lastUpdated: '4 hours ago' },
  { crop: 'Wheat', mandi: 'Belgaum', price: 2450, trend: 'up', lastUpdated: '30 mins ago' },
  { crop: 'Cotton', mandi: 'Gokak', price: 7200, trend: 'up', lastUpdated: '5 hours ago' },
  { crop: 'Soybean', mandi: 'Nipani', price: 4600, trend: 'down', lastUpdated: '3 hours ago' },
]

export default function MandiPage() {
  const { t, language } = useTranslation()
  const { location } = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('all')

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
              <h1 className="text-xl font-black text-gray-900">{t.mandi.title}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {location.district || 'Belgaum'} Markets
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
            <Mic className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Search & Filters */}
        <section className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder={t.mandi.searchMandi}
              className="pl-10 h-12 bg-gray-50 border-none rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button 
              variant={selectedCrop === 'all' ? 'default' : 'outline'}
              className="rounded-full whitespace-nowrap px-6"
              onClick={() => setSelectedCrop('all')}
            >
              {t.mandi.allCrops}
            </Button>
            {CROPS.map(crop => (
              <Button 
                key={crop.id}
                variant={selectedCrop === crop.id ? 'default' : 'outline'}
                className="rounded-full whitespace-nowrap gap-2 px-6"
                onClick={() => setSelectedCrop(crop.id)}
              >
                <span>{crop.icon}</span>
                {crop.name[language as keyof typeof crop.name]}
              </Button>
            ))}
          </div>
        </section>

        {/* Price List */}
        <section className="space-y-3">
          {SAMPLE_PRICES.map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between transition-transform active:scale-95">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  {CROPS.find(c => c.name.en === item.crop)?.icon || '🌾'}
                </div>
                <div>
                  <h3 className="font-black text-gray-900">{item.crop}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    <MapPin className="h-3 w-3" />
                    {item.mandi}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-gray-900">₹{item.price.toLocaleString()}</p>
                <div className="flex items-center justify-end gap-1">
                  <span className={`text-[10px] font-black uppercase ${
                    item.trend === 'up' ? 'text-green-600' : 
                    item.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {t.units.perQuintal}
                  </span>
                  {item.trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-600" /> : 
                   item.trend === 'down' ? <TrendingDown className="h-4 w-4 text-red-600" /> : 
                   <Minus className="h-4 w-4 text-gray-400" />}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Advice Section */}
        <section className="bg-green-600 rounded-[2rem] p-6 text-white shadow-lg shadow-green-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-black text-lg">{t.home.aiAdvice}</h3>
          </div>
          <p className="text-green-50 font-bold leading-relaxed">
            {language === 'en' ? 
              'Onion prices are expected to rise by 15% next week in Soundalga market. Consider holding your stock for a few days.' :
              language === 'hi' ?
              'अगले सप्ताह सौंदलगा बाजार में प्याज की कीमतों में 15% की वृद्धि होने की उम्मीद है। कुछ दिनों के लिए अपना स्टॉक रखने पर विचार करें।' :
              'पुढील आठवड्यात सौंदलगा बाजारपेठेत कांद्याचे भाव १५ टक्क्यांनी वाढण्याची शक्यता आहे. तुमचा माल काही दिवस साठवून ठेवण्याचा विचार करा.'
            }
          </p>
        </section>
      </div>
    </div>
  )
}
