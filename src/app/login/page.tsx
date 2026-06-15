'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radar, Mail, Lock, ArrowRight, Shield, Globe } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem('saasradar_user_email', email || 'demo@saasradar.ai');
    localStorage.setItem('saasradar_user_name', email ? email.split('@')[0] : 'Demo Founder');
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    localStorage.setItem('saasradar_user_email', 'demo@saasradar.ai');
    localStorage.setItem('saasradar_user_name', 'Demo Founder');
    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] bg-grid overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Background glow decoration */}
      <div className="absolute top-[20%] w-[350px] h-[350px] rounded-full bg-[#D4A017]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#C58B0F] mb-1">
            <Radar className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#1A1A1A]">Welcome to SaaSRadar AI</h1>
          <p className="text-xs text-[#6B6B6B]">Venture Intelligence & SaaS Opportunity Validation Platform</p>
        </div>

        <GlassCard className="p-8 border-[#E8DFD0] space-y-6 shadow-md">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="founder@venture.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#D4A017] transition-all"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFD0] rounded-xl text-xs text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#D4A017] transition-all"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#D4A017] hover:bg-[#C58B0F] text-white rounded-xl text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer"
            >
              {isLoading ? 'Authorizing...' : 'Sign In with Email'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Separator */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E8DFD0]"></div>
            <span className="flex-shrink mx-4 text-[9px] text-gray-400 uppercase tracking-widest font-bold">Or</span>
            <div className="flex-grow border-t border-[#E8DFD0]"></div>
          </div>

          {/* Social Logins & Demo Bypass */}
          <div className="space-y-2.5">
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#1A1A1A] border border-[#E8DFD0] rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Shield className="h-3.5 w-3.5 text-[#C58B0F]" />
              <span>Sandbox Demo Login</span>
            </button>
            
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#F5EFE4] hover:bg-[#E8DFD0]/60 text-[#1A1A1A] border border-transparent rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-[#C58B0F]" />
              <span>Continue with Google</span>
            </button>
          </div>
        </GlassCard>
        
        <p className="text-[10px] text-center text-[#6B6B6B] italic">
          Tip: Log in with <span className="font-bold text-[#D4A017]">admin@saasradar.ai</span> to configure global models and API credentials.
        </p>
      </div>
    </div>
  );
}
