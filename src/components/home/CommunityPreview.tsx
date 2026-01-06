'use client'

import Link from 'next/link'
import { Users, MessageSquare, Phone } from 'lucide-react'
import { useTranslation } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'

export default function CommunityPreview() {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-black text-lg text-gray-900">{t.home.expertChat}</h3>
          <p className="text-xs text-gray-500 font-medium">Free advice from experts</p>
        </div>
        <Users className="h-6 w-6 text-green-600" />
      </div>

      <div className="bg-green-50 rounded-2xl p-4 mb-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-green-200">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=expert1" 
            alt="Expert" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">Dr. Patil</p>
          <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Agronomist • Online</p>
        </div>
      </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/expert" className="w-full">
            <Button variant="outline" className="w-full border-green-100 text-green-700 hover:bg-green-50 rounded-xl font-bold gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
          </Link>
          <Link href="/expert" className="w-full">
            <Button variant="outline" className="w-full border-green-100 text-green-700 hover:bg-green-50 rounded-xl font-bold gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </Link>
        </div>
    </div>
  )
}
