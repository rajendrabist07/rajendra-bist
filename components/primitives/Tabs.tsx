'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTab,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  return (
    <div className={`w-full ${className}`}>
      <div
        role="tablist"
        aria-label="Category tabs"
        className="flex items-center gap-2 border-b border-[--border-hairline] pb-px overflow-x-auto"
      >
        {items.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-[--duration-micro] cursor-pointer rounded-t-[--radius-control] border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] ${
                isSelected
                  ? 'border-[--accent] text-[--accent] bg-[--accent-dim]'
                  : 'border-transparent text-[--text-tertiary] hover:text-[--text-secondary] hover:border-[--border-strong]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="pt-4">
        {items.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={!isSelected}
            >
              {isSelected && tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
