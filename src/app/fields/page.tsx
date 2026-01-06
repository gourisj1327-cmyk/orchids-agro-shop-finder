'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { createClient } from '@/lib/supabase'
import { 
  Sprout, 
  Plus, 
  MapPin, 
  TrendingUp, 
  Droplets, 
  Info,
  ChevronRight,
  ArrowLeft,
  Search,
  LayoutGrid,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'
import { toast } from 'sonner'

interface Field {
  id: number
  field_name: string
  crop_id: number
  area_acres: number
  soil_type: string
  irrigation_source: string
  expected_yield: number
  actual_yield: number
  notes: string
  crops?: {
    name: string
    name_hi: string
    name_mr: string
  }
}

interface Crop {
  id: number
  name: string
  name_hi: string
  name_mr: string
}

export default function FieldsPage() {
  const { t, language, user } = useAppStore()
  const [fields, setFields] = useState<Field[]>([])
  const [crops, setCrops] = useState<Crop[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const [newField, setNewField] = useState({
    field_name: '',
    crop_id: '',
    area_acres: '',
    soil_type: '',
    irrigation_source: '',
    notes: ''
  })

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [user.id])

  async function fetchData() {
    if (!user.id) return
    setLoading(true)
    try {
      const { data: fieldsData, error: fieldsError } = await supabase
        .from('user_fields')
        .select(`
          *,
          crops (
            name,
            name_hi,
            name_mr
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fieldsError) throw fieldsError
      setFields(fieldsData || [])

      const { data: cropsData, error: cropsError } = await supabase
        .from('crops')
        .select('*')
        .order('name')

      if (cropsError) throw cropsError
      setCrops(cropsData || [])
    } catch (error) {
      console.error('Error fetching fields:', error)
      toast.error('Failed to load fields')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddField() {
    if (!user.id) return
    if (!newField.field_name || !newField.crop_id || !newField.area_acres) {
      toast.error('Please fill required fields')
      return
    }

    try {
      const { error } = await supabase
        .from('user_fields')
        .insert([{
          user_id: user.id,
          field_name: newField.field_name,
          crop_id: parseInt(newField.crop_id),
          area_acres: parseFloat(newField.area_acres),
          soil_type: newField.soil_type,
          irrigation_source: newField.irrigation_source,
          notes: newField.notes
        }])

      if (error) throw error
      
      toast.success('Field added successfully')
      setIsDialogOpen(false)
      setNewField({
        field_name: '',
        crop_id: '',
        area_acres: '',
        soil_type: '',
        irrigation_source: '',
        notes: ''
      })
      fetchData()
    } catch (error) {
      console.error('Error adding field:', error)
      toast.error('Failed to add field')
    }
  }

  async function handleDeleteField(id: number) {
    if (!confirm('Are you sure you want to delete this field?')) return

    try {
      const { error } = await supabase
        .from('user_fields')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast.success('Field deleted')
      setFields(fields.filter(f => f.id !== id))
    } catch (error) {
      console.error('Error deleting field:', error)
      toast.error('Failed to delete field')
    }
  }

  const getCropName = (crop: any) => {
    if (!crop) return 'Unknown'
    return language === 'hi' ? crop.name_hi : language === 'mr' ? crop.name_mr : crop.name
  }

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
          <h1 className="text-xl font-black">{t.profile.fields}</h1>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search fields..." 
              className="pl-10 bg-gray-50 border-none rounded-xl"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 rounded-xl gap-2">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-[2rem]">
              <DialogHeader>
                <DialogTitle>Add New Field</DialogTitle>
                <DialogDescription>
                  Enter your field details to track activities and yields.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="field_name">Field Name*</Label>
                  <Input 
                    id="field_name" 
                    placeholder="e.g. North Acre" 
                    value={newField.field_name}
                    onChange={(e) => setNewField({...newField, field_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop">Main Crop*</Label>
                  <Select onValueChange={(v) => setNewField({...newField, crop_id: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map(crop => (
                        <SelectItem key={crop.id} value={crop.id.toString()}>
                          {getCropName(crop)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (Acres)*</Label>
                    <Input 
                      id="area" 
                      type="number" 
                      placeholder="e.g. 2.5" 
                      value={newField.area_acres}
                      onChange={(e) => setNewField({...newField, area_acres: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soil">Soil Type</Label>
                    <Select onValueChange={(v) => setNewField({...newField, soil_type: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Black Cotton">Black Cotton</SelectItem>
                        <SelectItem value="Red Soil">Red Soil</SelectItem>
                        <SelectItem value="Loamy">Loamy</SelectItem>
                        <SelectItem value="Sandy">Sandy</SelectItem>
                        <SelectItem value="Clay">Clay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation">Irrigation Source</Label>
                  <Select onValueChange={(v) => setNewField({...newField, irrigation_source: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Borewell">Borewell</SelectItem>
                      <SelectItem value="Canal">Canal</SelectItem>
                      <SelectItem value="River">River</SelectItem>
                      <SelectItem value="Rainfed">Rainfed</SelectItem>
                      <SelectItem value="Tank">Tank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddField} className="bg-green-600 hover:bg-green-700">Add Field</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : fields.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-1">No Fields Added</h3>
            <p className="text-sm text-gray-500 mb-6">Start by adding your first field to track progress.</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-green-600 rounded-xl gap-2">
              <Plus className="h-4 w-4" /> Add Field
            </Button>
          </div>
        ) : (
          fields.map((field) => (
            <Card key={field.id} className="overflow-hidden rounded-[2rem] border-none shadow-sm group">
              <div className="bg-green-600 p-6 text-white relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <h3 className="font-black text-lg">{field.field_name}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20 rounded-full"
                    onClick={() => handleDeleteField(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-1 text-green-100 text-sm font-bold">
                  <MapPin className="h-3 w-3" />
                  <span>{field.area_acres} {t.units.acre} • {field.soil_type || 'Unknown Soil'}</span>
                </div>
                
                <div className="absolute -bottom-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
              </div>
              
              <div className="p-6 pt-8 bg-white grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Current Crop</p>
                  <p className="font-bold text-gray-900">{getCropName(field.crops)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Irrigation</p>
                  <p className="font-bold text-gray-900">{field.irrigation_source || 'Not Set'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Expected Yield</p>
                  <div className="flex items-center gap-1.5 text-green-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span className="font-bold">{field.expected_yield || '0'} {t.units.quintal}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Status</p>
                  <div className="flex items-center gap-1.5 text-blue-600">
                    <Droplets className="h-3.5 w-3.5" />
                    <span className="font-bold">Needs Water</span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6 bg-white border-t border-gray-50 flex gap-2">
                <Button variant="ghost" className="flex-1 bg-gray-50 rounded-xl font-bold text-gray-600 text-sm">
                  View History
                </Button>
                <Button className="flex-1 bg-green-600 rounded-xl font-bold text-sm gap-2 shadow-lg shadow-green-100">
                  Daily Log <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Summary Section */}
      {fields.length > 0 && (
        <div className="px-4 pb-12">
          <div className="bg-orange-50 border border-orange-100 rounded-[2rem] p-6 flex gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
              <LayoutGrid className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-black text-gray-900 mb-1">Total Cultivation</h4>
              <p className="text-sm font-bold text-orange-800">
                You are managing {fields.reduce((acc, f) => acc + (f.area_acres || 0), 0).toFixed(1)} acres across {fields.length} fields.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
