'use client'

import Link from 'next/link'
import { Lightbulb, Mic, Play } from 'lucide-react'
import { useTranslation } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'

export default function TipsCard() {
  const { t } = useTranslation()

  return (
    <Link href="/tips" className="block active:scale-[0.98] transition-transform">
      <div className="bg-orange-50 rounded-[2rem] p-6 border border-orange-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Lightbulb className="h-24 w-24 text-orange-600" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-orange-600 p-1.5 rounded-lg">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-black text-orange-900">{t.home.farmingTips}</h3>
          </div>

          <p className="text-orange-900 font-bold text-lg leading-tight mb-4">
            "Use neem spray to control pests & save money this season"
          </p>

          <div className="flex gap-2">
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold px-4 h-9">
              <Mic className="h-4 w-4 mr-2" />
              {t.home.listen}
            </Button>
            <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100 rounded-full font-bold px-4 h-9">
              <Play className="h-4 w-4 mr-2" />
              Watch
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
