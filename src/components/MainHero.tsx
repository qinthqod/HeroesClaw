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
    <div className="ancient-panel-gold p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ancient-panel border-2 ${isAutoBattle ? 'border-ancient-jade shadow-jade' : 'border-ancient-vermilion shadow-vermilion'} flex items-center justify-center`}>
            <span className={`text-2xl ${isAutoBattle ? 'text-ancient-jade' : 'text-ancient-vermilion'}`}>
              {isAutoBattle ? '⚔' : '⏸'}
            </span>
          </div>
          <div>
            <div className={`font-title text-xl ${isAutoBattle ? 'text-ancient-jade' : 'text-ancient-vermilion'}`}>
              {isAutoBattle ? '自动战斗中...' : '已暂停'}
            </div>
            <div className="text-ancient-ink-light text-sm">战力: <span className="gold-text">985.6万</span></div>
          </div>
        </div>
        <button
          onClick={toggleAutoBattle}
          className={`ancient-btn ${isAutoBattle ? 'border-ancient-vermilion text-ancient-vermilion' : 'border-ancient-jade text-ancient-jade'}`}
        >
          {isAutoBattle ? '暂停' : '继续'}
        </button>
      </div>

      <div className="relative h-72 mb-4 rounded-lg overflow-hidden ancient-panel border-ancient-gold/30">
        <div className="absolute inset-0 bg-gradient-to-b from-ancient-paper/80 to-ancient-panel/90">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20mountain%20temple%20landscape%20misty%20peaks%20traditional%20ink%20painting%20style%20dramatic%20lighting&image_size=landscape_16_9" 
            alt="背景" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${battleAnimation ? 'scale-105' : 'scale-100'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-ancient-gold/30 rounded-full blur-2xl animate-pulse" />
            <div className="w-40 h-40 rounded-full ancient-panel-gold border-2 border-ancient-gold flex items-center justify-center shadow-gold animate-float">
              <img 
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20samurai%20warrior%20wearing%20conical%20straw%20hat%20holding%20katana%20kung%20fu%20pose%20chibi%20anime%20detailed%20epic%20fantasy&image_size=square" 
                alt="小龙虾" 
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            {battleAnimation && (
              <div className="absolute inset-0 rounded-full border-2 border-ancient-vermilion/50 animate-pulse-ring" />
            )}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="ancient-panel p-3 border-ancient-gold/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-ancient-gold text-xl">📍</span>
                <span className="gold-text font-title text-lg">中原·少林寺</span>
              </div>
              <span className="text-ancient-ink-light text-sm">挂机时长: {formatTime(afkTime)}</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-ancient-gold/20 backdrop-blur rounded-full border border-ancient-gold/40">
            <span className="text-ancient-gold text-sm">VIP</span>
            <span className="text-ancient-gold">★★★★★</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="gold-text font-title text-lg flex items-center gap-2">
            <span className="text-xl">🗺️</span> 江湖地图
          </h4>
          <span className="text-ancient-ink-light text-sm">点击切换区域</span>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => moveToRegion(region.id)}
              className={`relative p-2 rounded-lg border-2 transition-all duration-300 ${
                player.region === region.name
                  ? 'border-ancient-gold shadow-gold bg-ancient-gold/20'
                  : 'border-ancient-border hover:border-ancient-gold/50 hover:bg-ancient-paper/50'
              }`}
            >
              <div className="aspect-square rounded mb-2 overflow-hidden">
                <img 
                  src={`https://neeko-copilot.bytedance.net/api/text_to_image?prompt=${regionImages[region.id]}&image_size=square`} 
                  alt={region.name} 
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="text-center">
                <span className={`text-sm font-bold ${player.region === region.name ? 'text-ancient-gold' : 'text-ancient-ink'}`}>
                  {region.name}
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className="text-ancient-ink-light text-xs">探索</span>
                  <span className={`text-xs font-bold ${region.exploration >= 80 ? 'text-ancient-jade' : region.exploration >= 50 ? 'text-ancient-gold' : 'text-ancient-ink-light'}`}>
                    {region.exploration}%
                  </span>
                </div>
              </div>
              {player.region === region.name && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-ancient-gold rounded-full flex items-center justify-center shadow-gold">
                  <span className="text-xs text-white">✓</span>
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
