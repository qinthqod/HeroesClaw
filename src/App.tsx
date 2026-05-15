import Header from './components/Header';
import PlayerPanel from './components/PlayerPanel';
import MainHero from './components/MainHero';
import EquipmentPanel from './components/EquipmentPanel';
import BattleLog from './components/BattleLog';
import WorldBoss from './components/WorldBoss';
import ArenaPanel from './components/ArenaPanel';
import ChatPanel from './components/ChatPanel';
import Navigation from './components/Navigation';
import QuickButtons from './components/QuickButtons';
import DailyRewards from './components/DailyRewards';
import BreakthroughPanel from './components/BreakthroughPanel';
import ForumPanel from './components/ForumPanel';
import NPCArchive from './components/NPCArchive';

function App() {
  return (
    <div className="min-h-screen bg-wuxia-darker bg-ink-wash pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <PlayerPanel />
            <EquipmentPanel />
            <DailyRewards />
          </div>

          <div className="col-span-12 lg:col-span-6 space-y-4">
            <MainHero />
            <QuickButtons />
            
            <div className="grid grid-cols-2 gap-4">
              <BattleLog />
              <WorldBoss />
            </div>

            <ChatPanel />
          </div>

          <div className="col-span-12 lg:col-span-3 space-y-4">
            <ArenaPanel />
            <BreakthroughPanel />
            <ForumPanel />
            <NPCArchive />
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}

export default App;
