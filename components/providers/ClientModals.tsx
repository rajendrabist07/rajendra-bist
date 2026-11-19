'use client';

import dynamic from 'next/dynamic';

const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'), { ssr: false });
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
