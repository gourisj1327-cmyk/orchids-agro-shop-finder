'use client'

import { useState } from 'react'
import { ChevronLeft, Mic, Search, FileText, ChevronRight, CheckCircle2, Calendar, Users, Building2, ExternalLink } from 'lucide-react'
import { useTranslation, useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const SCHEMES = [
  {
    id: 1,
    title: { en: 'PM-Kisan Samman Nidhi', hi: 'पीएम-किसान सम्मान निधि', mr: 'पीएम-किसान सन्मान निधी' },
    category: 'central',
    benefit: '₹6,000 per year',
    description: { 
      en: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.',
      hi: 'सभी भूमिधारक किसान परिवारों को तीन समान किस्तों में प्रति वर्ष ₹6,000 की सीधी आय सहायता।',
      mr: 'सर्व जमीनधारक शेतकरी कुटुंबांना वर्षाला तीन समान हप्त्यांमध्ये ₹६,००० थेट उत्पन्न सहाय्य.'
    },
    eligibility: 'All landholding farmers',
    deadline: 'Ongoing',
    icon: '💰'
  },
  {
    id: 2,
    title: { en: 'Pradhan Mantri Fasal Bima Yojana', hi: 'प्रधानमंत्री फसल बीमा योजना', mr: 'प्रधानमंत्री पीक विमा योजना' },
    category: 'central',
    benefit: 'Crop Insurance',
    description: {
      en: 'Financial support to farmers suffering crop loss/damage arising out of unforeseen events.',
      hi: 'अप्रत्याशित घटनाओं से होने वाले फसल नुकसान/क्षति से पीड़ित किसानों को वित्तीय सहायता।',
      mr: 'अनपेक्षित घटनांमुळे पिकांचे नुकसान/नुकसान सोसावे लागणाऱ्या शेतकऱ्यांना आर्थिक सहाय्य.'
    },
    eligibility: 'All farmers (loanee & non-loanee)',
    deadline: 'Dec 31, 2024',
    icon: '🛡️'
  },
  {
    id: 3,
    title: { en: 'Kisan Credit Card (KCC)', hi: 'किसान क्रेडिट कार्ड (KCC)', mr: 'किसान क्रेडिट कार्ड (KCC)' },
    category: 'central',
    benefit: 'Low-interest Loans',
    description: {
      en: 'Provides adequate and timely credit support from the banking system for agricultural needs.',
      hi: 'कृषि आवश्यकताओं के लिए बैंकिंग प्रणाली से पर्याप्त और समय पर ऋण सहायता प्रदान करता है।',
      mr: 'शेतीविषयक गरजांसाठी बँकिंग प्रणालीकडून पुरेसे आणि वेळेवर कर्ज सहाय्य प्रदान करते.'
    },
    eligibility: 'Farmers, Self Help Groups',
    deadline: 'N/A',
    icon: '💳'
  },
  {
    id: 4,
    title: { en: 'Namo Shetkari Mahasanman Nidhi', hi: 'नमो शेतकारी महासन्मान निधि', mr: 'नमो शेतकरी महासन्मान निधी' },
    category: 'state',
    benefit: '₹6,000 per year (Additional)',
    description: {
      en: 'State government scheme providing additional income support to farmers already enrolled in PM-Kisan.',
      hi: 'राज्य सरकार की योजना जो पीएम-किसान में नामांकित किसानों को अतिरिक्त आय सहायता प्रदान करती है।',
      mr: 'पीएम-किसानमध्ये आधीच नोंदणी केलेल्या शेतकऱ्यांना अतिरिक्त उत्पन्न सहाय्य देणारी राज्य सरकारची योजना.'
    },
    eligibility: 'PM-Kisan beneficiaries in Maharashtra',
    deadline: 'Ongoing',
    icon: '🏛️'
  }
]

export default function SchemesPage() {
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredSchemes = SCHEMES.filter(scheme => {
    const matchesSearch = scheme.title[language as keyof typeof scheme.title].toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || scheme.category === activeTab
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
              <h1 className="text-xl font-black text-gray-900">{t.schemes.title}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Benefits & Direct Support
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder={t.schemes.searchScheme}
              className="pl-10 h-12 bg-white border-gray-100 rounded-2xl shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
            {['all', 'central', 'state'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                className={`flex-1 rounded-xl font-black capitalize h-10 ${activeTab === tab ? 'bg-gray-900' : 'text-gray-400'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'all' ? t.schemes.allSchemes : tab === 'central' ? t.schemes.central : t.schemes.state}
              </Button>
            ))}
          </div>
        </section>

        {/* Schemes List */}
        <section className="space-y-4">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4 transition-transform active:scale-98">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                    {scheme.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-lg leading-tight">
                      {scheme.title[language as keyof typeof scheme.title]}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        scheme.category === 'central' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {scheme.category === 'central' ? t.schemes.central : t.schemes.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  {t.schemes.benefits}
                </div>
                <p className="font-black text-green-700">{scheme.benefit}</p>
              </div>

              <p className="text-sm font-bold text-gray-500 leading-relaxed">
                {scheme.description[language as keyof typeof scheme.description]}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase">{t.schemes.deadline}</span>
                  <div className="flex items-center gap-2 text-sm font-black text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {scheme.deadline}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase">{t.schemes.eligibility}</span>
                  <div className="flex items-center gap-2 text-sm font-black text-gray-700">
                    <Users className="h-4 w-4 text-gray-400" />
                    {scheme.eligibility.split(' ')[0]}...
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-2xl font-black shadow-lg shadow-green-100 gap-2">
                  {t.schemes.applyNow} <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl border-gray-100">
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </section>

        {/* Help Banner */}
        <section className="bg-gray-900 rounded-[2.5rem] p-6 text-white overflow-hidden relative">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-green-400" />
              <h3 className="font-black text-lg">Need help applying?</h3>
            </div>
            <p className="text-gray-400 text-sm font-bold leading-relaxed">
              Visit your nearest Common Service Center (CSC) or talk to our experts for assistance with document preparation.
            </p>
            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-2xl font-black">
              Find Nearest CSC
            </Button>
          </div>
          <FileText className="absolute -bottom-6 -right-6 h-32 w-32 opacity-10" />
        </section>
      </div>
    </div>
  )
}
