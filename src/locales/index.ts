import { en } from './en'
import { hi } from './hi'
import { mr } from './mr'

export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn' | 'gu' | 'pa' | 'bn'

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
]

export const translations: Record<string, typeof en> = {
  en,
  hi,
  mr,
  ta: en,
  te: en,
  kn: en,
  gu: en,
  pa: en,
  bn: en,
}

export type TranslationKeys = typeof en
