'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Globe, 
  MapPin, 
  Bell, 
  Mic, 
  Moon, 
  Database, 
  Info, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  User,
  ShieldCheck,
  Languages
} from 'lucide-react'
import { useAppStore, useTranslation } from '@/store/useAppStore'
import { languages } from '@/locales'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'

export default function SettingsPage() {
  const router = useRouter()
  const { t, language, setLanguage } = useTranslation()
  const { location, user, setUser, isOffline, setOffline } = useAppStore()
  const [showLangModal, setShowLangModal] = useState(false)
  const supabase = createClient()

  const settingsGroups = [
    {
      title: t.settings.appSettings,
      items: [
        {
          id: 'language',
          label: t.settings.language,
          value: languages.find(l => l.code === language)?.nativeName,
          icon: Globe,
          bg: 'bg-blue-50',
          color: 'text-blue-600',
          onClick: () => setShowLangModal(true)
        },
        {
          id: 'location',
          label: t.settings.location,
          value: `${location.village}, ${location.district}`,
          icon: MapPin,
          bg: 'bg-green-50',
          color: 'text-green-600',
          onClick: () => router.push('/location')
        },
        {
          id: 'notifications',
          label: t.settings.notifications,
          icon: Bell,
          bg: 'bg-orange-50',
          color: 'text-orange-600',
          toggle: true,
          checked: true,
          onClick: () => {}
        }
      ]
    },
    {
      title: t.settings.features,
      items: [
        {
          id: 'voice',
          label: t.settings.voiceAssistance,
          icon: Mic,
          bg: 'bg-purple-50',
          color: 'text-purple-600',
          toggle: true,
          checked: true,
          onClick: () => {}
        },
        {
          id: 'offline',
          label: t.settings.offlineMode,
          icon: Database,
          bg: 'bg-amber-50',
          color: 'text-amber-600',
          toggle: true,
          checked: isOffline,
          onChange: setOffline,
          onClick: () => {}
        },
        {
          id: 'darkMode',
          label: t.settings.darkMode,
          icon: Moon,
          bg: 'bg-slate-900',
          color: 'text-slate-100',
          toggle: true,
          checked: false,
          onClick: () => {}
        }
      ]
    },
    {
      title: t.settings.support,
      items: [
        {
          id: 'help',
          label: t.settings.helpCenter,
          icon: HelpCircle,
          bg: 'bg-sky-50',
          color: 'text-sky-600',
          onClick: () => {}
        },
        {
          id: 'privacy',
          label: t.settings.privacyPolicy,
          icon: ShieldCheck,
          bg: 'bg-indigo-50',
          color: 'text-indigo-600',
          onClick: () => {}
        },
        {
          id: 'about',
          label: t.settings.aboutApp,
          icon: Info,
          bg: 'bg-gray-50',
          color: 'text-gray-600',
          onClick: () => {}
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm border-b sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">{t.settings.title}</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 space-y-8">
        {/* Settings Groups */}
        {settingsGroups.map((group, groupIdx) => (
          <motion.div 
            key={`group-${groupIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * groupIdx }}
            className="space-y-3"
          >
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">{group.title}</h3>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              {group.items.map((item, itemIdx) => (
                <div
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    itemIdx !== group.items.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-2xl ${item.bg} ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      {item.value && <p className="text-xs text-gray-500 mt-0.5">{item.value}</p>}
                    </div>
                  </div>
                  
                  {item.toggle ? (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation()
                        item.onChange?.(!item.checked)
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative ${item.checked ? 'bg-green-600' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${item.checked ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Version Info */}
        <div className="text-center pb-8">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Agroplus v2.4.0</p>
        </div>
      </div>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {showLangModal && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLangModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 pb-12 sm:pb-8 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Languages className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{t.settings.selectLanguage}</h2>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setShowLangModal(false)
                    }}
                    className={`p-4 rounded-3xl text-left transition-all border-2 ${
                      language === lang.code 
                        ? 'border-green-600 bg-green-50 shadow-sm' 
                        : 'border-gray-50 bg-gray-50 hover:border-gray-100'
                    }`}
                  >
                    <p className={`text-base font-bold ${language === lang.code ? 'text-green-700' : 'text-gray-900'}`}>
                      {lang.nativeName}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">{lang.name}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
