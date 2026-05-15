import { Skull, Swords, Users, Trophy } from 'lucide-react';
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
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-jianghu-gold font-bold flex items-center gap-2">
          <Skull className="w-4 h-4" />
          世界Boss
        </h3>
        <span className="text-yellow-500 text-sm">Lv.{worldBoss.level}</span>
      </div>

      <div className="relative h-32 mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent rounded-lg flex items-center justify-center">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20arhat%20warrior%20statue%20buddhist%20monk%20powerful%20boss%20character%20game%20art&image_size=square" 
            alt="金刚罗汉" 
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
        <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">
          {worldBoss.name}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-jianghu-text-muted text-sm">血量</span>
          <span className="text-red-500 font-bold">{formatNumber(worldBoss.health)}/{formatNumber(worldBoss.maxHealth)}</span>
        </div>
        <div className="h-3 bg-jianghu-dark rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="text-jianghu-text-muted">伤害: {formatNumber(worldBoss.damage)}</span>
          <span className="text-jianghu-gold">{healthPercent.toFixed(1)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-jianghu-dark/50 rounded p-2">
          <Users className="w-4 h-4 mx-auto text-blue-400 mb-1" />
          <span className="text-jianghu-text-muted text-xs block">参与人数</span>
          <span className="text-jianghu-text font-bold text-sm">{formatNumber(worldBoss.participants)}</span>
        </div>
        <div className="bg-jianghu-dark/50 rounded p-2">
          <Swords className="w-4 h-4 mx-auto text-red-400 mb-1" />
          <span className="text-jianghu-text-muted text-xs block">我的伤害</span>
          <span className="text-red-400 font-bold text-sm">{formatNumber(worldBoss.myDamage)}</span>
        </div>
        <div className="bg-jianghu-dark/50 rounded p-2">
          <Trophy className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
          <span className="text-jianghu-text-muted text-xs block">排名</span>
          <span className="text-yellow-400 font-bold text-sm">第{worldBoss.rank}名</span>
        </div>
      </div>

      <button
        onClick={attackBoss}
        className="w-full py-3 bg-gradient-to-r from-red-600/20 to-red-500/10 border border-red-500/50 rounded text-red-400 font-bold hover:from-red-600/30 hover:to-red-500/20 transition-all flex items-center justify-center gap-2"
      >
        <Swords className="w-4 h-4" />
        前往挑战
      </button>
    </div>
  );
};

export default WorldBoss;
