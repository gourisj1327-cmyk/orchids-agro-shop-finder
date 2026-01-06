import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language, translations, TranslationKeys } from '@/locales'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
  
  location: {
    state: string
    district: string
    taluka: string
    village: string
    latitude: number | null
    longitude: number | null
  }
  setLocation: (location: Partial<AppState['location']>) => void
  
  isOffline: boolean
  setOffline: (offline: boolean) => void
  
  user: {
    id: string | null
    name: string | null
    email: string | null
  }
  setUser: (user: Partial<AppState['user']>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang, t: translations[lang] }),
      t: translations['en'],
      
      location: {
        state: '',
        district: '',
        taluka: '',
        village: '',
        latitude: null,
        longitude: null,
      },
      setLocation: (location) => set((state) => ({
        location: { ...state.location, ...location }
      })),
      
      isOffline: false,
      setOffline: (offline) => set({ isOffline: offline }),
      
      user: {
        id: null,
        name: null,
        email: null,
      },
      setUser: (user) => set((state) => ({
        user: { ...state.user, ...user }
      })),
    }),
    {
      name: 'agro-plus-storage',
      partialize: (state) => ({
        language: state.language,
        location: state.location,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.language]
        }
      },
    }
  )
)

export const useTranslation = () => {
  const t = useAppStore(state => state.t)
  const language = useAppStore(state => state.language)
  const setLanguage = useAppStore(state => state.setLanguage)
  return { t, language, setLanguage }
}

export const useLocation = () => {
  const { location, setLocation } = useAppStore()
  return { location, setLocation }
}
