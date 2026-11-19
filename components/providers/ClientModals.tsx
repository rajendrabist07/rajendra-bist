'use client';

import dynamic from 'next/dynamic';
import CommandPalette from '@/components/ui/CommandPalette';

const FloatingAskAI = dynamic(() => import('@/components/ui/FloatingAskAI'), { ssr: false });
const ChatAgent = dynamic(() => import('@/components/sections/ChatAgent'), { ssr: false });

export default function ClientModals() {
  return (
    <>
      <CommandPalette />
      <FloatingAskAI />
      <ChatAgent />
    </>
  );
}
