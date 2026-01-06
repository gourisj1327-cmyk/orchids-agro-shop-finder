'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, ChevronLeft, Mic, AlertCircle, CheckCircle2, Info, ArrowRight, Activity } from 'lucide-react'
import { useTranslation, useAppStore } from '@/store/useAppStore'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ScannerPage() {
  const { t, language } = useTranslation()
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<null | 'healthy' | 'diseased'>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleScan = (file?: File) => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setResult(Math.random() > 0.5 ? 'healthy' : 'diseased')
    }, 3000)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleCameraClick = () => {
    cameraInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleScan(e.target.files[0])
    }
  }

  const resetScanner = () => {
    setResult(null)
    setPreviewUrl(null)
    setIsScanning(false)
  }

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
              <h1 className="text-xl font-black text-gray-900">{t.scanner.title}</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                AI Health Analysis
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full">
            <Mic className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Scanner Area */}
        {!result && !isScanning && (
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center space-y-8">
            <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <Camera className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                {language === 'en' ? 'Is your crop healthy?' : language === 'hi' ? 'क्या आपकी फसल स्वस्थ है?' : 'तुमचे पीक निरोगी आहे का?'}
              </h2>
              <p className="text-gray-500 font-bold leading-relaxed">
                {language === 'en' ? 'Take a clear photo of the leaf or affected area for instant AI diagnosis.' : 
                 language === 'hi' ? 'तत्काल AI निदान के लिए पत्ती या प्रभावित क्षेत्र की स्पष्ट फोटो लें।' : 
                 'झटपट AI निदानासाठी पानाचा किंवा बाधित क्षेत्राचा स्पष्ट फोटो घ्या.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <input 
                type="file" 
                ref={cameraInputRef} 
                className="hidden" 
                accept="image/*" 
                capture="environment"
                onChange={handleFileChange}
              />
              <Button 
                onClick={handleCameraClick}
                className="h-32 bg-red-600 hover:bg-red-700 rounded-[2rem] flex flex-col gap-3 shadow-lg shadow-red-100 active:scale-95 transition-transform"
              >
                <Camera className="h-8 w-8" />
                <span className="font-black">{t.scanner.takePhoto}</span>
              </Button>
              <Button 
                variant="outline"
                onClick={handleUploadClick}
                className="h-32 border-gray-200 rounded-[2rem] flex flex-col gap-3 active:scale-95 transition-transform"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="font-black text-gray-600">{t.scanner.uploadImage}</span>
              </Button>
            </div>
          </section>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center space-y-8 min-h-[400px] flex flex-col justify-center overflow-hidden">
            <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-[2rem] overflow-hidden bg-gray-100 shadow-inner">
               {previewUrl ? (
                 <img src={previewUrl} alt="Scanning" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center">
                   <Activity className="h-12 w-12 text-red-600 animate-pulse" />
                 </div>
               )}
               <div className="absolute inset-0 border-8 border-red-100/30 rounded-[2rem] animate-pulse"></div>
               <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-[scan_2s_linear_infinite] shadow-[0_0_15px_rgba(220,38,38,0.8)] z-10"></div>
               <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-gray-900 animate-pulse">{t.scanner.analyzing}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Processing Image Pixels...</p>
            </div>
          </section>
        )}

        {/* Scan Results */}
        {result && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className={`rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden ${result === 'healthy' ? 'bg-green-600 shadow-green-100' : 'bg-red-600 shadow-red-100'}`}>
              {/* Background preview blurred */}
              {previewUrl && (
                <img src={previewUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-110" />
              )}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-white/20 p-4 rounded-[1.5rem] backdrop-blur-md">
                    {result === 'healthy' ? <CheckCircle2 className="h-10 w-10" /> : <AlertCircle className="h-10 w-10" />}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/10 hover:bg-white/20 rounded-full font-bold backdrop-blur-md"
                    onClick={resetScanner}
                  >
                    {t.common.retry}
                  </Button>
                </div>
                
                <h2 className="text-3xl font-black mb-2">
                  {result === 'healthy' ? t.scanner.healthy : t.scanner.diseaseDetected}
                </h2>
                <p className="font-bold opacity-90 leading-relaxed text-lg">
                  {result === 'healthy' ? 
                    (language === 'en' ? 'Your crop looks great! Continue current maintenance.' : language === 'hi' ? 'आपकी फसल बहुत अच्छी लग रही है! वर्तमान रखरखाव जारी रखें।' : 'तुमचे पीक खूप छान दिसत आहे! सध्याची देखभाल चालू ठेवा.') :
                    (language === 'en' ? 'Early signs of Blast disease detected. Immediate action recommended.' : language === 'hi' ? 'ब्लास्ट रोग के शुरुआती लक्षण मिले हैं। तत्काल कार्रवाई की सिफारिश की जाती है।' : 'ब्लास्ट रोगाची सुरुवातीची लक्षणे आढळली आहेत. त्वरित कारवाईची शिफारस केली जाते.')}
                </p>
              </div>
            </div>

            {result === 'diseased' && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="h-5 w-5 text-orange-500" />
                    <h3 className="font-black text-gray-900">{t.scanner.treatment}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <p className="font-black text-sm text-orange-800 mb-1">{t.scanner.organicSolution}</p>
                      <p className="text-xs font-bold text-orange-700 opacity-80">Apply Neem oil spray every 3 days in the evening.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="font-black text-sm text-blue-800 mb-1">{t.scanner.chemicalSolution}</p>
                      <p className="text-xs font-bold text-blue-700 opacity-80">Use Carbendazim 50% WP (1g per liter of water).</p>
                    </div>
                  </div>
                </div>

                <Link href="/shops">
                  <Button className="w-full h-16 bg-white border border-gray-100 shadow-sm rounded-2xl text-gray-900 font-black flex items-center justify-between px-6 active:scale-95 transition-transform">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-green-600" />
                      <span>{t.scanner.nearbyMedicine}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300" />
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* History */}
        <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-lg text-gray-900">{t.scanner.history}</h3>
            <span className="text-xs font-bold text-gray-400">View All</span>
          </div>
          <div className="space-y-3 opacity-60">
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">🌾</div>
                 <div>
                   <p className="font-bold text-sm text-gray-900">Rice - Blast</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase">2 days ago</p>
                 </div>
               </div>
               <AlertCircle className="h-5 w-5 text-red-400" />
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}
