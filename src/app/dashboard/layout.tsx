import React from 'react';
import { Sidebar } from '../../components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAF7F2] text-[#1A1A1A] bg-grid">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Soft gold ambient decoration */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#D4A017]/5 blur-[120px] pointer-events-none z-0" />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-6xl mx-auto w-full space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
