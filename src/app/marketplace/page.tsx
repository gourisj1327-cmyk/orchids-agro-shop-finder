'use client'

import { useState } from 'react'
import { ChevronLeft, Mic, Search, ShoppingBag, Plus, Filter, MapPin, Phone, Star, ArrowRight, Tag } from 'lucide-react'
import { useTranslation, useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const MARKET_ITEMS = [
  {
    id: 1,
    title: { en: 'Organic Soybean', hi: 'जैविक सोयाबीन', mr: 'सेंद्रिय सोयाबीन' },
    price: 4800,
    unit: 'Quintal',
    quantity: '50',
    seller: 'Rahul Patil',
    location: 'Soundalga',
    type: 'sell',
    category: 'grain',
    rating: 4.8,
    icon: '🫘'
  },
  {
    id: 2,
    title: { en: 'Fresh Onions', hi: 'ताजा प्याज', mr: 'ताजा कांदा' },
    price: 2100,
    unit: 'Quintal',
    quantity: '120',
    seller: 'Suresh Kumar',
    location: 'Chikkodi',
    type: 'sell',
    category: 'vegetable',
    rating: 4.5,
    icon: '🧅'
  },
  {
    id: 3,
    title: { en: 'Hand Tractor', hi: 'हैंड ट्रैक्टर', mr: 'हँड ट्रॅक्टर' },
    price: 45000,
    unit: 'Piece',
    quantity: '1',
    seller: 'Mahesh Agro',
    location: 'Belgaum',
    type: 'sell',
    category: 'equipment',
    rating: 4.9,
    icon: '🚜'
  },
  {
    id: 4,
    title: { en: 'Wheat Seeds', hi: 'गेहूं के बीज', mr: 'गव्हाचे बी' },
    price: 1200,
    unit: 'Bag (50kg)',
    quantity: '10',
    seller: 'Vikas Seeds',
    location: 'Nipani',
    type: 'buy',
    category: 'seeds',
    rating: 4.2,
    icon: '🌾'
  }
]

export default function MarketplacePage() {
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredItems = MARKET_ITEMS.filter(item => {
    const matchesSearch = item.title[language as keyof typeof item.title].toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || item.type === activeTab
    return matchesSearch && matchesTab
  })

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
              <h1 className="text-xl font-black text-gray-900">{t.marketplace.title}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Farmer to Farmer Trade
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
            <Mic className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Search & Tabs */}
        <section className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder={language === 'en' ? 'Search produce or equipment...' : 'खोजें...'}
                className="pl-10 h-12 bg-white border-gray-100 rounded-2xl shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-gray-100 bg-white">
              <Filter className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
          
          <div className="flex gap-2 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {['all', 'sell', 'buy'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                className={`flex-1 rounded-xl font-black capitalize h-10 ${activeTab === tab ? 'bg-gray-900' : 'text-gray-400'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'all' ? t.schemes.allSchemes : tab === 'sell' ? t.marketplace.sellNow : t.marketplace.buyNow}
              </Button>
            ))}
          </div>
        </section>

        {/* Market Items List */}
        <section className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-gray-100 space-y-4 transition-all active:scale-98">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner">
                  {item.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-gray-900 text-lg">
                      {item.title[language as keyof typeof item.title]}
                    </h3>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      item.type === 'sell' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {item.type === 'sell' ? 'For Sale' : 'Looking to Buy'}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-gray-900">
                    ₹{item.price.toLocaleString()}
                    <span className="text-xs font-bold text-gray-400 ml-1">/{item.unit}</span>
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-orange-400" />
                      Qty: {item.quantity}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-green-400" />
                      {item.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-50 mx-2" />

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-black text-gray-600">
                    {item.seller.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{item.seller}</p>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-black text-gray-400">{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-green-600">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button className="h-10 px-6 bg-gray-900 hover:bg-black rounded-xl font-black gap-2">
                    {t.marketplace.contactSeller} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Sell Banner */}
        <section className="bg-green-600 rounded-[2.5rem] p-6 text-white overflow-hidden relative shadow-lg shadow-green-100">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-white" />
              <h3 className="font-black text-xl">Want to sell your produce?</h3>
            </div>
            <p className="text-green-50 text-sm font-bold leading-relaxed opacity-90">
              List your crops or equipment today and reach thousands of farmers in your area.
            </p>
            <Button className="w-full bg-white text-green-600 hover:bg-gray-100 rounded-2xl font-black shadow-xl">
              + {t.marketplace.addListing}
            </Button>
          </div>
          <ShoppingBag className="absolute -bottom-6 -right-6 h-40 w-40 opacity-10 rotate-12" />
        </section>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-6 right-6 w-16 h-16 bg-orange-600 hover:bg-orange-700 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-50 shadow-orange-200">
        <Plus className="h-8 w-8 text-white" />
      </Button>
    </div>
  )
}
