import { useGameStore } from '../store/gameStore';

const WorldBoss = () => {
  const { worldBoss, attackBoss } = useGameStore();

  if (!worldBoss) return null;

  const healthPercent = (worldBoss.health / worldBoss.maxHealth) * 100;

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  return (
    <div className="wuxia-panel-gold p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-lg">👹</span> 世界Boss
        </h3>
        <span className="text-wuxia-crimson text-xs px-2 py-0.5 bg-wuxia-crimson/20 rounded animate-pulse">
          ⚔ 进行中
        </span>
      </div>

      <div className="relative h-28 rounded-lg overflow-hidden mb-3">
        <div className="absolute inset-0 bg-gradient-to-b from-wuxia-dark/90 to-wuxia-panel/80">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20golden%20arhat%20warrior%20statue%20epic%20boss%20fantasy%20game%20dark%20mysterious%20atmosphere&image_size=square" 
            alt="金刚罗汉" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="gold-gradient-text font-bold text-lg">Lv.{worldBoss.level} {worldBoss.name}</div>
            <div className="text-wuxia-text-muted text-xs mt-1">血量: {formatNumber(worldBoss.health)}/{formatNumber(worldBoss.maxHealth)}</div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-wuxia-text-muted">Boss血量</span>
          <span className="text-wuxia-crimson font-bold">{healthPercent.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-wuxia-dark rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-wuxia-crimson to-wuxia-crimson-light"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">参与人数</span>
          <span className="gold-text font-bold text-sm">{formatNumber(worldBoss.participants)}</span>
        </div>
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">我的伤害</span>
          <span className="text-wuxia-jade font-bold text-sm">{formatNumber(worldBoss.myDamage)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-wuxia-text-muted">我的排名</span>
        <span className="gold-text font-bold">第{worldBoss.rank}名</span>
      </div>

      <button
        onClick={attackBoss}
        className="w-full py-2 bg-gradient-to-r from-wuxia-crimson/30 to-wuxia-crimson-dark/20 border border-wuxia-crimson/50 rounded-lg text-wuxia-crimson font-wuxia font-bold hover:from-wuxia-crimson/40 hover:to-wuxia-crimson-dark/30 transition-all duration-300 hover:shadow-crimson"
      >
        ⚔ 前往挑战
      </button>
    </div>
  );
};

export default WorldBoss;
