'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { createClient } from '@/lib/supabase'
import { 
  Lightbulb, 
  Search, 
  ArrowLeft, 
  Sprout, 
  Droplets, 
  Bug, 
  TrendingUp,
  Play,
  Share2,
  Bookmark,
  Sparkles,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { toast } from 'sonner'

interface Tip {
  id: number
  title_localized: Record<string, string>
  content_localized: Record<string, string>
  category: string
  image_url: string
  created_at: string
}

export default function TipsPage() {
  const { t, language } = useAppStore()
  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [generatingAI, setGeneratingAI] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchTips()
  }, [])

  async function fetchTips() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('farming_tips')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTips(data || [])
    } catch (error) {
      console.error('Error fetching tips:', error)
      toast.error('Failed to load tips')
    } finally {
      setLoading(false)
    }
  }

  const handleAskAI = async () => {
    setGeneratingAI(true)
    // Simulate AI generation
    setTimeout(() => {
      const aiTips = [
        {
          id: Date.now(),
          title_localized: {
            en: 'Smart Intercropping for Yield',
            hi: 'पैदावार के लिए स्मार्ट अंतरफसल',
            mr: 'उत्पादनासाठी स्मार्ट आंतरपीक'
          },
          content_localized: {
            en: 'Planting legumes alongside grains can naturally enrich soil nitrogen and boost overall yield by 20%.',
            hi: 'अनाज के साथ फलियां लगाने से प्राकृतिक रूप से मिट्टी के नाइट्रोजन में वृद्धि होती है और कुल पैदावार में 20% की वृद्धि होती है।',
            mr: 'धान्यासोबत कडधान्ये लावल्याने नैसर्गिकरीत्या मातीतील नायट्रोजन वाढते आणि एकूण उत्पादनात २०% वाढ होते.'
          },
          category: 'Yield',
          image_url: '',
          created_at: new Date().toISOString()
        },
        {
          id: Date.now() + 1,
          title_localized: {
            en: 'Organic Pest Control with Neem',
            hi: 'नीम के साथ जैविक कीट नियंत्रण',
            mr: 'निंबासोबत सेंद्रिय कीड नियंत्रण'
          },
          content_localized: {
            en: 'Using neem-based sprays can protect your crops from over 200 species of insects without harmful chemicals.',
            hi: 'नीम आधारित स्प्रे का उपयोग करने से हानिकारक रसायनों के बिना आपके फसलों को 200 से अधिक प्रकार के कीटों से बचाया जा सकता है।',
            mr: 'निंब आधारित फवारणीचा वापर केल्याने हानिकारक रसायनांशिवाय तुमच्या पिकांचे २०० हून अधिक प्रकारच्या कीटकांपासून संरक्षण होऊ शकते.'
          },
          category: 'Pest Control',
          image_url: '',
          created_at: new Date().toISOString()
        }
      ]
      const randomTip = aiTips[Math.floor(Math.random() * aiTips.length)]
      setTips(prev => [randomTip, ...prev])
      setSelectedCategory('All') // Reset category to show the new tip
      setGeneratingAI(false)
      toast.success('AI Tip Generated!')
    }, 2000)
  }

  const categories = [
    { name: 'All', icon: Lightbulb },
    { name: 'Sowing', icon: Sprout },
    { name: 'Irrigation', icon: Droplets },
    { name: 'Pest Control', icon: Bug },
    { name: 'Yield', icon: TrendingUp }
  ]

  const filteredTips = tips.filter(tip => {
    const title = tip.title_localized[language] || tip.title_localized['en'] || ''
    const content = tip.content_localized[language] || tip.content_localized['en'] || ''
    
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) || 
                         content.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-black">{t.home.farmingTips}</h1>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search tips, crops, methods..." 
            className="pl-10 bg-gray-50 border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              variant={selectedCategory === cat.name ? 'default' : 'ghost'}
              className={`rounded-full gap-2 shrink-0 ${
                selectedCategory === cat.name ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-600'
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <cat.icon className="h-4 w-4" />
              <span className="font-bold text-sm">{cat.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* AI Generator Banner */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-[2rem] p-6 text-white shadow-lg shadow-green-100 mb-6 border border-white/20">
          <div className="flex gap-4 items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-black text-lg">Smart AI Advice</h3>
              <p className="text-green-50 text-xs font-bold leading-tight">
                Get instant expert tips customized for your farm and crops.
              </p>
            </div>
          </div>
          <Button 
            onClick={handleAskAI}
            disabled={generatingAI}
            className="w-full bg-white text-green-700 hover:bg-green-50 rounded-xl font-black shadow-xl"
          >
            {generatingAI ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              'Ask AgroAI'
            )}
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-gray-200 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-bold">No tips found for "{search}"</p>
          </div>
        ) : (
          filteredTips.map((tip) => (
            <Card key={tip.id} className="overflow-hidden rounded-[2rem] border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-green-50 text-green-700 border-green-100 px-3 py-1 rounded-lg font-bold">
                    {tip.category}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-black text-lg text-gray-900 mb-2 leading-tight">
                  {tip.title_localized[language] || tip.title_localized['en']}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 font-medium leading-relaxed">
                  {tip.content_localized[language] || tip.content_localized['en']}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-green-700">AI</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">AgroAI Expert</span>
                  </div>
                  <Button variant="ghost" className="text-green-600 font-black text-sm gap-1 h-auto p-0 hover:bg-transparent">
                    Read More <Play className="h-3 w-3 fill-current" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
