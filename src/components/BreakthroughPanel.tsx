import { useGameStore } from '../store/gameStore';

const BreakthroughPanel = () => {
  const { player } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  return (
    <div className="wuxia-panel-gold p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">⚡</span> 境界突破
        </h3>
      </div>

      <div className="relative h-32 rounded-lg overflow-hidden mb-3">
        <div className="absolute inset-0 bg-gradient-to-b from-wuxia-gold/30 to-wuxia-dark/80">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20samurai%20warrior%20breaking%20through%20golden%20light%20power%20aura%20chibi%20anime&image_size=square" 
            alt="突破" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="gold-gradient-text text-2xl font-bold animate-glow">突破成功</span>
          <span className="text-wuxia-text-muted text-sm mt-1">金丹中期·五重 → 金丹后期·一重</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="text-4xl animate-sparkle">✨</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">气血</span>
          <span className="text-wuxia-crimson font-bold">+85630</span>
        </div>
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">防御</span>
          <span className="text-wuxia-azure font-bold">+6430</span>
        </div>
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">攻击</span>
          <span className="text-wuxia-crimson font-bold">+12870</span>
        </div>
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">修为上限</span>
          <span className="text-wuxia-gold font-bold">+5000万</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-wuxia-text-muted">当前修为</span>
          <span className="gold-text">{formatNumber(player.cultivation)}/{formatNumber(player.cultivationToNext)}</span>
        </div>
        <div className="stat-bar">
          <div 
            className="stat-bar-fill" 
            style={{ width: `${(player.cultivation / player.cultivationToNext) * 100}%` }}
          />
        </div>
      </div>

      <button className="w-full py-2 bg-gradient-to-r from-wuxia-gold/30 to-wuxia-gold-dark/20 border border-wuxia-gold/50 rounded-lg text-wuxia-gold font-wuxia font-bold hover:from-wuxia-gold/40 hover:to-wuxia-gold-dark/30 transition-all">
        继续突破
      </button>
    </div>
  );
};

export default BreakthroughPanel;
