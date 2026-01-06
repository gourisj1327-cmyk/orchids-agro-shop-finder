"use client";

import React from 'react';
import { useTranslation, useLocation } from '@/store/useAppStore';
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DISTRICTS = [
  'Belgaum',
  'Dharwad',
  'Pune',
  'Kolhapur',
];

export default function LocationSelector({ compact = false }: { compact?: boolean }) {
  const { t, language } = useTranslation();
  const { location, setLocation } = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={compact ? "sm" : "default"} className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-600" />
          <span className="max-w-[100px] truncate font-bold text-gray-700">
            {location?.district || t.common.selectLocation}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl p-2 shadow-xl border-green-50">
        {DISTRICTS.map((district) => (
          <DropdownMenuItem
            key={district}
            onClick={() => setLocation({ state: district === 'Pune' || district === 'Kolhapur' ? 'Maharashtra' : 'Karnataka', district })}
            className="rounded-xl cursor-pointer py-2 px-4"
          >
            {district}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem 
          onClick={() => setLocation({ district: '', village: '', state: '', taluka: '' })}
          className="rounded-xl cursor-pointer py-2 px-4 text-red-600"
        >
          {language === 'hi' ? 'स्थान साफ़ करें' : 'Clear Location'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
