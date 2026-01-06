"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation, useAppStore } from '@/store/useAppStore';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Phone, Navigation, Star, Store, Filter, X, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import LocationSelector from '@/components/LocationSelector';
import VoiceButton from '@/components/VoiceButton';

const SAMPLE_SHOPS = [
  { id: 1, name: 'Krishna Fertilizers', type: 'fertilizer', address: 'Main Road, Soundalga', state: 'Karnataka', district: 'Belgaum', village: 'Soundalga', phone: '+91 9876543210', products_available: ['Urea', 'DAP', 'Potash', 'NPK'], rating: 4.5, is_verified: true },
  { id: 2, name: 'Shree Seeds Center', type: 'seeds', address: 'Market Road, Chikkodi', state: 'Karnataka', district: 'Belgaum', village: 'Chikkodi', phone: '+91 9876543211', products_available: ['Cotton Seeds', 'Soybean Seeds', 'Wheat Seeds'], rating: 4.2, is_verified: true },
  { id: 3, name: 'Agro Pesticides Shop', type: 'pesticides', address: 'APMC Yard, Belgaum', state: 'Karnataka', district: 'Belgaum', phone: '+91 9876543212', products_available: ['Insecticides', 'Fungicides', 'Herbicides'], rating: 4.0, is_verified: false },
  { id: 4, name: 'Farm Tools & Equipment', type: 'tools', address: 'Industrial Area, Hubli', state: 'Karnataka', district: 'Dharwad', phone: '+91 9876543213', products_available: ['Sprayers', 'Ploughs', 'Harvesters'], rating: 4.8, is_verified: true },
  { id: 5, name: 'Green Organic Store', type: 'organic', address: 'Gandhi Nagar, Pune', state: 'Maharashtra', district: 'Pune', phone: '+91 9876543214', products_available: ['Vermicompost', 'Neem Oil', 'Bio Fertilizers'], rating: 4.6, is_verified: true },
  { id: 6, name: 'Kisan Seva Kendra', type: 'general', address: 'Bus Stand Road, Kolhapur', state: 'Maharashtra', district: 'Kolhapur', phone: '+91 9876543215', products_available: ['Seeds', 'Fertilizers', 'Pesticides', 'Tools'], rating: 4.3, is_verified: true },
];

const SHOP_TYPES = [
  { value: 'all', label: { en: 'All Types', hi: 'सभी प्रकार' } },
  { value: 'fertilizer', label: { en: 'Fertilizers', hi: 'खाद' } },
  { value: 'seeds', label: { en: 'Seeds', hi: 'बीज' } },
  { value: 'pesticides', label: { en: 'Pesticides', hi: 'कीटनाशक' } },
  { value: 'tools', label: { en: 'Tools', hi: 'उपकरण' } },
  { value: 'organic', label: { en: 'Organic', hi: 'जैविक' } },
  { value: 'general', label: { en: 'General', hi: 'सामान्य' } },
];

export default function AgroShops() {
  const { t, language = 'en' } = useTranslation();
  const location = useAppStore(state => state.location);
  const [shops, setShops] = useState<any[]>([]);
  const [filteredShops, setFilteredShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    loadShops();
  }, []);

  useEffect(() => {
    filterShops();
  }, [shops, searchQuery, selectedType, location]);

  const loadShops = async () => {
    setLoading(true);
    try {
      const data = await base44.entities.AgroShop.list('-created_date', 50);
      if (data.length > 0) {
        setShops(data);
      } else {
        setShops(SAMPLE_SHOPS);
      }
    } catch (error) {
      setShops(SAMPLE_SHOPS);
    }
    setLoading(false);
  };

  const filterShops = () => {
    let filtered = [...shops];

    // Filter by location
    if (location?.district) {
      filtered = filtered.sort((a, b) => {
        const aMatch = a.district?.toLowerCase() === location.district?.toLowerCase() ? 0 : 1;
        const bMatch = b.district?.toLowerCase() === location.district?.toLowerCase() ? 0 : 1;
        return aMatch - bMatch;
      });
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(s => s.type === selectedType);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.name?.toLowerCase().includes(query) ||
        s.village?.toLowerCase().includes(query) ||
        s.district?.toLowerCase().includes(query) ||
        s.products_available?.some((p: string) => p.toLowerCase().includes(query))
      );
    }

    setFilteredShops(filtered);
  };

  const getTypeLabel = (type: string) => {
    const typeObj = SHOP_TYPES.find(t => t.value === type);
    return typeObj?.label?.[language as 'en' | 'hi'] || typeObj?.label?.en || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      fertilizer: 'bg-green-100 text-green-700',
      seeds: 'bg-amber-100 text-amber-700',
      pesticides: 'bg-red-100 text-red-700',
      tools: 'bg-blue-100 text-blue-700',
      organic: 'bg-emerald-100 text-emerald-700',
      general: 'bg-purple-100 text-purple-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getShopVoiceText = (shop: any) => {
    const texts = {
      en: `${shop.name}. Located in ${shop.village || shop.district}. Phone number ${shop.phone}. Products available: ${shop.products_available?.join(', ')}`,
      hi: `${shop.name}। ${shop.village || shop.district} में स्थित। फोन नंबर ${shop.phone}। उपलब्ध उत्पाद: ${shop.products_available?.join(', ')}`,
    };
    return texts[language as 'en' | 'hi'] || texts.en;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100 rounded-xl">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t.nav.shops}</h1>
                  <p className="text-xs text-gray-500">
                    {language === 'hi' ? 'नज़दीकी कृषि दुकानें खोजें' : 'Find nearby agro shops'}
                  </p>
                </div>

            </div>
            <LocationSelector compact />
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'दुकान, गांव या उत्पाद खोजें...' : 'Search shop, village or product...'}
              className="pl-10 h-12 text-base rounded-xl border-gray-200"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {SHOP_TYPES.map(type => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? 'default' : 'outline'}
                onClick={() => setSelectedType(type.value)}
                className={`rounded-full whitespace-nowrap ${
                  selectedType === type.value 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'border-gray-200'
                }`}
              >
                {type.label[language as 'en' | 'hi'] || type.label.en}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          {filteredShops.length} {language === 'hi' ? 'दुकानें मिलीं' : 'shops found'}
        </p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : filteredShops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'hi' ? 'कोई दुकान नहीं मिली' : 'No shops found'}
            </h3>
            <p className="text-gray-500 text-sm">
              {language === 'hi' ? 'अपना स्थान या खोज बदलें' : 'Try changing location or search'}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {filteredShops.map((shop, i) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all border-0 shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg text-gray-900">{shop.name}</h3>
                            {shop.is_verified && (
                              <Badge className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0 border-0">VERIFIED</Badge>
                            )}
                          </div>
                          <Badge className={`${getTypeColor(shop.type)} text-[10px] border-0`}>
                            {getTypeLabel(shop.type).toUpperCase()}
                          </Badge>
                        </div>
                        <VoiceButton text={getShopVoiceText(shop)} size="sm" />
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm">{shop.address || `${shop.village || ''} ${shop.district}, ${shop.state}`}</span>
                        </div>
                        {shop.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-medium">{shop.rating}</span>
                          </div>
                        )}
                      </div>

                      {shop.products_available?.length > 0 && (
                        <div className="mb-4">
                            <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-wider">{t.shops.products}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {shop.products_available.slice(0, 4).map((product: string, j: number) => (
                                <Badge key={j} variant="outline" className="text-[11px] font-normal border-gray-100">
                                  {product}
                                </Badge>
                              ))}
                              {shop.products_available.length > 4 && (
                                <Badge variant="outline" className="text-[11px] font-normal border-gray-100">
                                  +{shop.products_available.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 mt-2">
                          <Button asChild className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl h-11 text-white shadow-sm">
                            <a href={`tel:${shop.phone}`}>
                              <Phone className="h-4 w-4 mr-2" />
                              {t.shops.contact}
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="flex-1 rounded-xl h-11 border-gray-200 text-gray-700 hover:bg-gray-50">
                            <a 
                              href={`https://maps.google.com/?q=${shop.address || shop.village + ' ' + shop.district}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Navigation className="h-4 w-4 mr-2" />
                              {t.shops.directions}
                            </a>
                          </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
