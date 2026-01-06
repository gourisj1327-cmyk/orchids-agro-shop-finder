'use client'

import { useState } from 'react'
import { ChevronLeft, MessageSquare, Phone, Send, Search, Filter, User, BadgeCheck, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation, useAppStore } from '@/store/useAppStore'
import Link from 'next/link'

const EXPERTS = [
  {
    id: 1,
    name: { en: 'Dr. Ramesh Patil', hi: 'डॉ. रमेश पाटिल', mr: 'डॉ. रमेश पाटील' },
    role: { en: 'Soil Scientist', hi: 'मृदा वैज्ञानिक', mr: 'मृदा शास्त्रज्ञ' },
    online: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patil',
    rating: 4.9
  },
  {
    id: 2,
    name: { en: 'Sandeep Deshmukh', hi: 'संदीप देशमुख', mr: 'संदीप देशमुख' },
    role: { en: 'Crop Protection Expert', hi: 'फसल सुरक्षा विशेषज्ञ', mr: 'पीक संरक्षण तज्ज्ञ' },
    online: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deshmukh',
    rating: 4.8
  },
  {
    id: 3,
    name: { en: 'Priya Sharma', hi: 'प्रिया शर्मा', mr: 'प्रिया शर्मा' },
    role: { en: 'Horticulture Specialist', hi: 'बागवानी विशेषज्ञ', mr: 'फलोत्पादन तज्ज्ञ' },
    online: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    rating: 4.7
  }
]

const SAMPLE_CHATS = [
  {
    id: 101,
    question: { 
      en: 'What is the best fertilizer for Soybean?', 
      hi: 'सोयाबीन के लिए सबसे अच्छा उर्वरक कौन सा है?', 
      mr: 'सोयाबीनसाठी सर्वोत्तम खत कोणते आहे?' 
    },
    expert: 'Dr. Ramesh Patil',
    time: '2 hours ago',
    responses: 3
  },
  {
    id: 102,
    question: { 
      en: 'My cotton leaves are turning yellow. Help!', 
      hi: 'मेरी कपास की पत्तियां पीली पड़ रही हैं। मदद करें!', 
      mr: 'माझ्या कापसाची पाने पिवळी पडत आहेत. मदत करा!' 
    },
    expert: 'Sandeep Deshmukh',
    time: '5 hours ago',
    responses: 1
  }
]

import { toast } from 'sonner'

export default function ExpertPage() {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chats, setChats] = useState(SAMPLE_CHATS)

    const handleSubmit = () => {
      if (!message.trim()) return
      setIsSubmitting(true)
      
      const userMessage = message
      setMessage('')

      // Add user question to history
      const newUserChat = {
        id: Date.now(),
        question: { en: userMessage, hi: userMessage, mr: userMessage },
        expert: 'Expert is typing...',
        time: 'Just now',
        responses: 0
      }

      setChats([newUserChat, ...chats])
      setActiveTab('history')
      
      toast.success(language === 'en' ? 'Question submitted!' : 'प्रश्न भेज दिया गया है!')

      // Simulate expert response after 3 seconds
      setTimeout(() => {
        setChats(prev => prev.map(chat => 
          chat.id === newUserChat.id 
            ? { 
                ...chat, 
                expert: 'Dr. Ramesh Patil', 
                responses: 1, 
                time: '1 min ago' 
              } 
            : chat
        ))
        toast.info(language === 'en' ? 'Expert has responded to your question!' : 'विशेषज्ञ ने आपके प्रश्न का उत्तर दिया है!')
        setIsSubmitting(false)
      }, 3000)
    }

  const handleChatNow = (name: string) => {
    toast.info(language === 'en' ? `Connecting to ${name}...` : language === 'hi' ? `${name} से जुड़ रहे हैं...` : `${name} शी जोडत आहे...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-black text-gray-900">{t.expert.title}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {t.expert.subtitle}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
            <Mic className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Ask Question Input */}
        <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <h2 className="font-black text-lg mb-4 text-gray-900">{t.expert.askQuestion}</h2>
          <div className="relative">
            <textarea 
              className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-green-500 min-h-[100px] resize-none"
              placeholder={language === 'en' ? 'Type your question here...' : language === 'hi' ? 'अपना प्रश्न यहाँ लिखें...' : 'तुमचा प्रश्न येथे लिहा...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
              <Button 
                className="absolute bottom-3 right-3 bg-green-600 hover:bg-green-700 rounded-xl px-4 font-bold shadow-lg shadow-green-100"
                disabled={!message.trim() || isSubmitting}
                onClick={handleSubmit}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? t.common.loading : t.common.submit}
              </Button>

          </div>
        </section>

        {/* Online Experts */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-black text-lg text-gray-900">{language === 'en' ? 'Online Experts' : language === 'hi' ? 'ऑनलाइन विशेषज्ञ' : 'ऑनलाइन तज्ज्ञ'}</h2>
            <Link href="#" className="text-xs font-bold text-green-600 uppercase tracking-wider">{t.home.viewAll}</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {EXPERTS.map(expert => (
              <div key={expert.id} className="min-w-[140px] bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-50">
                    <img src={expert.avatar} alt={expert.name.en} className="w-full h-full object-cover" />
                  </div>
                  {expert.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <h3 className="font-black text-sm text-gray-900 line-clamp-1">{expert.name[language as keyof typeof expert.name]}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{expert.role[language as keyof typeof expert.role]}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-500 text-[10px]">⭐</span>
                  <span className="text-[10px] font-black text-gray-700">{expert.rating}</span>
                </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 rounded-xl border-green-100 text-green-700 font-bold h-8 text-[10px] uppercase"
                    onClick={() => handleChatNow(expert.name[language as keyof typeof expert.name])}
                  >
                    {t.expert.chatNow}
                  </Button>

              </div>
            ))}
          </div>
        </section>

        {/* Recent Questions / History */}
        <section>
          <div className="flex bg-white p-1 rounded-2xl border border-gray-100 mb-6">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'chat' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-400'}`}
            >
              {t.expert.recentQuestions}
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'history' ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-400'}`}
            >
              {language === 'en' ? 'My Questions' : language === 'hi' ? 'मेरे प्रश्न' : 'माझे प्रश्न'}
            </button>
          </div>

          <div className="space-y-4">
            {chats.map(chat => (
              <div key={chat.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <p className="font-bold text-gray-900 leading-tight pr-8">
                    {chat.question[language as keyof typeof chat.question]}
                  </p>
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-900">{chat.expert}</p>
                      <p className="text-[10px] font-bold text-gray-400">{chat.time}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 rounded-full">
                    <span className="text-[10px] font-black text-green-700">{chat.responses} {language === 'en' ? 'Answers' : language === 'hi' ? 'उत्तर' : 'उत्तर'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
