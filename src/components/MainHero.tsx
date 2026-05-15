import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

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

  const regionImages: Record<string, string> = {
    zhongyuan: 'ancient%20chinese%20temple%20mountain%20landscape%20misty%20mountains%20traditional%20ink%20painting',
    jiangnan: 'chinese%20water%20town%20canal%20traditional%20architecture%20cherry%20blossoms',
    miaojiang: 'mysterious%20tropical%20forest%20ancient%20temple%20mist%20fantasy%20chinese%20style',
    xiyu: 'silk%20road%20desert%20oasis%20ancient%20caravan%20chinese%20western%20region',
    guanwai: 'snow%20mountains%20northeast%20china%20ancient%20fortress%20winter%20landscape',
    jingcheng: 'chinese%20imperial%20palace%20forbidden%20city%20golden%20roofs%20majestic',
  };

  return (
    <div className="wuxia-panel-gold p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isAutoBattle ? 'from-wuxia-jade/30 to-wuxia-jade-dark/20' : 'from-wuxia-crimson/30 to-wuxia-crimson-dark/20'} flex items-center justify-center border ${isAutoBattle ? 'border-wuxia-jade/50' : 'border-wuxia-crimson/50'}`}>
            <span className={`text-xl ${isAutoBattle ? 'text-wuxia-jade' : 'text-wuxia-crimson'}`}>
              {isAutoBattle ? '⚔' : '⏸'}
            </span>
          </div>
          <div>
            <div className={`font-bold ${isAutoBattle ? 'text-wuxia-jade' : 'text-wuxia-crimson'}`}>
              {isAutoBattle ? '自动战斗中...' : '已暂停'}
            </div>
            <div className="text-wuxia-text-muted text-xs">战力: <span className="gold-text">985.6万</span></div>
          </div>
        </div>
        <button
          onClick={toggleAutoBattle}
          className={`px-4 py-2 rounded-lg font-wuxia text-sm transition-all duration-300 ${
            isAutoBattle
              ? 'bg-wuxia-crimson/20 text-wuxia-crimson border border-wuxia-crimson/50 hover:bg-wuxia-crimson/30'
              : 'bg-wuxia-jade/20 text-wuxia-jade border border-wuxia-jade/50 hover:bg-wuxia-jade/30'
          }`}
        >
          {isAutoBattle ? '暂停' : '继续'}
        </button>
      </div>

      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wuxia-dark/80 to-wuxia-panel/90">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20mountain%20temple%20landscape%20misty%20peaks%20traditional%20ink%20painting%20style%20dramatic%20lighting&image_size=landscape_16_9" 
            alt="背景" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${battleAnimation ? 'scale-105' : 'scale-100'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-wuxia-gold/30 rounded-full blur-2xl animate-pulse" />
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-wuxia-gold/40 via-wuxia-gold/20 to-transparent flex items-center justify-center border-2 border-wuxia-gold/60 animate-float shadow-gold-lg">
              <img 
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20samurai%20warrior%20wearing%20conical%20straw%20hat%20holding%20katana%20kung%20fu%20pose%20chibi%20anime%20detailed%20epic%20fantasy&image_size=square" 
                alt="小龙虾" 
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            {battleAnimation && (
              <div className="absolute inset-0 rounded-full border-2 border-wuxia-crimson/50 animate-pulse-ring" />
            )}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-wuxia-dark/90 backdrop-blur rounded-lg p-3 border border-wuxia-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-wuxia-gold text-lg">📍</span>
                <span className="gold-text font-bold">中原·少林寺</span>
              </div>
              <span className="text-wuxia-text-muted text-sm">挂机时长: {formatTime(afkTime)}</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-wuxia-gold/20 backdrop-blur rounded-full border border-wuxia-gold/40">
            <span className="text-wuxia-gold">★★★★★</span>
            <span className="text-wuxia-text text-xs">VIP特权</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="gold-text font-bold flex items-center gap-2">
            <span>🗺️</span> 江湖地图
          </h4>
          <span className="text-wuxia-text-muted text-xs">点击切换区域</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => moveToRegion(region.id)}
              className={`relative p-2 rounded-lg border transition-all duration-300 ${
                player.region === region.name
                  ? 'border-wuxia-gold bg-wuxia-gold/15 shadow-gold'
                  : 'border-wuxia-border bg-wuxia-panel-light/30 hover:border-wuxia-gold/50 hover:bg-wuxia-panel-light/50'
              }`}
            >
              <div className="aspect-square rounded mb-1 overflow-hidden">
                <img 
                  src={`https://neeko-copilot.bytedance.net/api/text_to_image?prompt=${regionImages[region.id]}&image_size=square`} 
                  alt={region.name} 
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="text-center">
                <span className={`text-xs font-bold ${player.region === region.name ? 'text-wuxia-gold' : 'text-wuxia-text'}`}>
                  {region.name}
                </span>
                <div className="flex items-center justify-center gap-0.5 mt-0.5">
                  <span className="text-wuxia-text-muted text-xs">探索</span>
                  <span className={`text-xs font-bold ${region.exploration >= 80 ? 'text-wuxia-jade' : region.exploration >= 50 ? 'text-wuxia-gold' : 'text-wuxia-text-muted'}`}>
                    {region.exploration}%
                  </span>
                </div>
              </div>
              {player.region === region.name && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-wuxia-gold rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainHero;
