'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Navigation, ChevronRight, Check, Search, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation, useLocation } from '@/store/useAppStore'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

export default function LocationPage() {
  const { t, language } = useTranslation()
  const { location, setLocation } = useLocation()
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState(1) // 1: State, 2: District, 3: Taluka, 4: Village
  const [states, setStates] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [talukas, setTalukas] = useState<any[]>([])
  const [villages, setVillages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [selectedState, setSelectedState] = useState<any>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
  const [selectedTaluka, setSelectedTaluka] = useState<any>(null)

  useEffect(() => {
    fetchStates()
  }, [])

  const fetchStates = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('states').select('*').order('name')
    if (data) setStates(data)
    setLoading(false)
  }

  const fetchDistricts = async (stateId: number) => {
    setLoading(true)
    const { data, error } = await supabase.from('districts').select('*').eq('state_id', stateId).order('name')
    if (data) setDistricts(data)
    setLoading(false)
  }

  const fetchTalukas = async (districtId: number) => {
    setLoading(true)
    const { data, error } = await supabase.from('talukas').select('*').eq('district_id', districtId).order('name')
    if (data) setTalukas(data)
    setLoading(false)
  }

  const fetchVillages = async (talukaId: number) => {
    setLoading(true)
    const { data, error } = await supabase.from('villages').select('*').eq('taluka_id', talukaId).order('name')
    if (data) setVillages(data)
    setLoading(false)
  }

  const handleStateSelect = (state: any) => {
    setSelectedState(state)
    fetchDistricts(state.id)
    setStep(2)
    setSearchQuery('')
  }

  const handleDistrictSelect = (district: any) => {
    setSelectedDistrict(district)
    fetchTalukas(district.id)
    setStep(3)
    setSearchQuery('')
  }

  const handleTalukaSelect = (taluka: any) => {
    setSelectedTaluka(taluka)
    fetchVillages(taluka.id)
    setStep(4)
    setSearchQuery('')
  }

  const handleVillageSelect = (village: any) => {
    const getName = (obj: any) => {
      if (language === 'hi' && obj.name_hi) return obj.name_hi
      if (language === 'mr' && obj.name_mr) return obj.name_mr
      return obj.name
    }

    setLocation({
      state: getName(selectedState),
      district: getName(selectedDistrict),
      taluka: getName(selectedTaluka),
      village: getName(village)
    })
    toast.success(t.common.selectLocation)
    router.push('/')
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t.location.locationPermission)
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        // Reverse geocoding would happen here in a real app
        // For now, we'll just show a success message
        toast.success("Location detected via GPS")
        setLoading(false)
        router.push('/')
      },
      (error) => {
        toast.error(t.location.locationPermission)
        setLoading(false)
      }
    )
  }

  const getName = (obj: any) => {
    if (language === 'hi' && obj.name_hi) return obj.name_hi
    if (language === 'mr' && obj.name_mr) return obj.name_mr
    return obj.name
  }

  const filteredItems = () => {
    const list = step === 1 ? states : step === 2 ? districts : step === 3 ? talukas : villages
    return list.filter(item => 
      getName(item).toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="p-6 sticky top-0 bg-white z-10 border-b border-gray-50">
        <h1 className="text-2xl font-black text-gray-900 mb-6">
          {step === 1 ? t.location.selectState : 
           step === 2 ? t.location.selectDistrict : 
           step === 3 ? t.location.selectTaluka : 
           t.location.selectVillage}
        </h1>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.common.search}
              className="w-full h-14 bg-gray-50 rounded-2xl pl-12 pr-4 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" className="h-14 w-14 bg-gray-50 rounded-2xl">
            <Mic className="h-6 w-6 text-gray-400" />
          </Button>
        </div>

        {step === 1 && (
          <Button 
            onClick={detectLocation}
            disabled={loading}
            className="w-full h-14 bg-green-50 hover:bg-green-100 text-green-700 rounded-2xl font-bold gap-3 border border-green-100 mb-4 shadow-sm shadow-green-100/50"
          >
            <Navigation className="h-5 w-5 fill-current" />
            {t.location.useCurrentLocation}
          </Button>
        )}

        {/* Progress Breadcrumbs */}
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {selectedState ? getName(selectedState) : 'State'}
          </div>
          {step >= 2 && <ChevronRight className="h-4 w-4 text-gray-300 mt-2 flex-shrink-0" />}
          <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {selectedDistrict ? getName(selectedDistrict) : 'District'}
          </div>
          {step >= 3 && <ChevronRight className="h-4 w-4 text-gray-300 mt-2 flex-shrink-0" />}
          <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {selectedTaluka ? getName(selectedTaluka) : 'Taluka'}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-bold text-gray-400">{t.common.loading}</p>
          </div>
        ) : (
          filteredItems().map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (step === 1) handleStateSelect(item)
                else if (step === 2) handleDistrictSelect(item)
                else if (step === 3) handleTalukaSelect(item)
                else handleVillageSelect(item)
              }}
              className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all active:scale-[0.98] group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-green-600 transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="font-black text-gray-800 text-lg">
                  {getName(item)}
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-green-600 transition-colors" />
            </button>
          ))
        )}

        {!loading && filteredItems().length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-10 w-10 text-gray-200" />
            </div>
            <p className="font-bold text-gray-400">{t.common.noData}</p>
          </div>
        )}
      </div>
    </div>
  )
}
