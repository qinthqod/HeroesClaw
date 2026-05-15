import { Play, Pause, MapPin } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useState, useEffect } from 'react';

const MainHero = () => {
  const { player, regions, isAutoBattle, toggleAutoBattle, moveToRegion } = useGameStore();
  const [battleAnimation, setBattleAnimation] = useState(false);

  useEffect(() => {
    if (isAutoBattle) {
      const interval = setInterval(() => {
        setBattleAnimation(true);
        setTimeout(() => setBattleAnimation(false), 300);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAutoBattle]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [afkTime, setAfkTime] = useState(31542);
  useEffect(() => {
    const interval = setInterval(() => {
      setAfkTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isAutoBattle ? (
            <Play className="w-5 h-5 text-green-500 animate-pulse" />
          ) : (
            <Pause className="w-5 h-5 text-yellow-500" />
          )}
          <span className={`font-bold ${isAutoBattle ? 'text-green-500' : 'text-yellow-500'}`}>
            {isAutoBattle ? '自动战斗中...' : '已暂停'}
          </span>
        </div>
        <button
          onClick={toggleAutoBattle}
          className={`px-4 py-2 rounded font-bold text-sm transition-all ${
            isAutoBattle
              ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 hover:bg-yellow-500/30'
              : 'bg-green-500/20 text-green-500 border border-green-500/50 hover:bg-green-500/30'
          }`}
        >
          {isAutoBattle ? '暂停' : '继续'}
        </button>
      </div>

      <div className="relative h-64 mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-jianghu-dark/50 to-jianghu-panel rounded-lg">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20temple%20mountain%20landscape%20misty%20mountains%20traditional%20ink%20painting%20style&image_size=landscape_16_9" 
            alt="背景" 
            className="w-full h-full object-cover rounded-lg opacity-30"
          />
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${battleAnimation ? 'scale-105' : 'scale-100'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-jianghu-gold/20 rounded-full blur-xl animate-pulse" />
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-jianghu-gold/30 to-transparent flex items-center justify-center border-2 border-jianghu-gold/50">
              <img 
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20samurai%20warrior%20wearing%20conical%20straw%20hat%20holding%20katana%20kung%20fu%20pose%20chibi%20anime%20detailed%20background&image_size=square" 
                alt="小龙虾" 
                className="w-28 h-28 object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-jianghu-dark/80 backdrop-blur rounded-lg p-3 border border-jianghu-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-jianghu-gold" />
                <span className="text-jianghu-gold font-bold">中原·少林寺</span>
              </div>
              <span className="text-jianghu-text-muted text-sm">挂机时长: {formatTime(afkTime)}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-jianghu-text-muted text-sm">点击切换区域</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => moveToRegion(region.id)}
              className={`relative p-3 rounded-lg border transition-all ${
                player.region === region.name
                  ? 'border-jianghu-gold bg-jianghu-gold/10'
                  : 'border-jianghu-border bg-jianghu-dark/50 hover:border-jianghu-gold/50'
              }`}
            >
              <span className="text-jianghu-text font-bold text-sm block">{region.name}</span>
              <span className="text-jianghu-text-muted text-xs">探索度 {region.exploration}%</span>
              {player.region === region.name && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-jianghu-gold rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHero;
