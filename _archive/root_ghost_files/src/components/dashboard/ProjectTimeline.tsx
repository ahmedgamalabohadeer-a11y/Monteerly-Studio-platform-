'use client';
import React from 'react';
import { CalendarDays } from 'lucide-react';

export function ProjectTimeline() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1); // Mock 2 weeks