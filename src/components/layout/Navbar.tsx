'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/store/useAppStore'
import { languages } from '@/locales'

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation()
  const currentLang = languages.find(l => l.code === language)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-50">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="Agroplus Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-900">
              Agroplus
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-medium bg-gray-50 rounded-full px-3">
                  <Globe className="h-4 w-4" />
                  <span>{currentLang?.nativeName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-xl border-green-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`rounded-xl cursor-pointer py-3 px-4 mb-1 last:mb-0 transition-colors ${
                      language === lang.code ? 'bg-green-50 text-green-700 font-bold' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{lang.nativeName}</span>
                      <span className="text-[10px] opacity-60 uppercase tracking-wider">{lang.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
  )
}
