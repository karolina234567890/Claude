import { useState } from 'react';
import TopNav from './components/TopNav';
import HomeScreen from './components/HomeScreen';
import CKBScreen from './components/CKBScreen';
import MediaPlanScreen from './components/MediaPlanScreen';

// Screens: 'home' | 'ckb' | 'media-plan'
export default function App() {
  const [screen, setScreen] = useState('home');
  const [market, setMarket] = useState('United States');

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FC] overflow-hidden">
      <TopNav
        market={market}
        onMarketChange={setMarket}
        onOpenCKB={() => setScreen('ckb')}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {screen === 'home' && (
          <HomeScreen
            market={market}
            onOpenMediaPlan={() => setScreen('media-plan')}
          />
        )}
        {screen === 'ckb' && (
          <CKBScreen onBack={() => setScreen('home')} />
        )}
        {screen === 'media-plan' && (
          <MediaPlanScreen onBack={() => setScreen('home')} />
        )}
      </div>

      {/* Screen switcher pills — prototype navigation helper */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900 rounded-full px-4 py-2 shadow-2xl border border-white/10 z-50">
        <span className="text-xs text-white/40 font-medium mr-1">Screens:</span>
        {[
          { key: 'home', label: market === 'Global' ? '2 · Global Plans' : '1 · Single Market' },
          { key: 'ckb', label: '3–4 · CKB' },
          { key: 'media-plan', label: '5 · Media Plan + Copilot' },
        ].map(s => (
          <button
            key={s.key}
            onClick={() => setScreen(s.key)}
            className={`text-xs px-3 py-1 rounded-full transition-colors font-medium
              ${screen === s.key
                ? 'bg-[#0057FF] text-white'
                : 'text-white/50 hover:text-white hover:bg-white/10'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
