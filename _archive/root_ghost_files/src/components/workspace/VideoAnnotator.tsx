'use client';
import React, { useState } from 'react';
import { Play, Pause, MessageSquarePlus, PenTool, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function VideoAnnotator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [markers, setMarkers] = useState<{ x: number; y: number; text: string }[]>([]);