import { Heart, Sword, Shield, Zap, Sparkles, Eye, Target, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const PlayerPanel = () => {
  const { player } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  const stats = [
    { icon: Heart, label: '气血', value: player.health, color: 'text-red-500' },
    { icon: Sword, label: '攻击', value: player.attack, color: 'text-orange-500' },
    { icon: Shield, label: '防御', value: player.defense, color: 'text-blue-500' },
    { icon: Zap, label: '速度', value: player.speed, color: 'text-yellow-500' },
    { icon: Sparkles, label: '暴击', value: player.luck, color: 'text-purple-500', isPercent: true },
    { icon: Eye, label: '闪避', value: 23.6, color: 'text-cyan-500', isPercent: true },
    { icon: Target, label: '命中', value: 35.2, color: 'text-green-500', isPercent: true },
    { icon: Star, label: '修为', value: player.cultivation, color: 'text-jianghu-gold' },
  ];

  const cultivationPercent = (player.cultivation / player.cultivationToNext) * 100;

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jianghu-gold/20 to-transparent flex items-center justify-center border border-jianghu-gold/30">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20warrior%20wearing%20conical%20hat%20holding%20sword%20kung%20fu%20style%20chibi%20anime&image_size=square" 
            alt="小龙虾" 
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold gradient-text font-wuxia">英雄爪</h2>
          <p className="text-jianghu-text-muted text-sm">{player.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-jianghu-gold font-bold text-lg">{formatNumber(player.attack + player.defense + player.speed + player.luck + player.health)}</span>
            <span className="text-jianghu-text-muted text-xs">战力</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between py-1.5 px-2 bg-jianghu-dark/50 rounded">
            <div className="flex items-center gap-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-jianghu-text-muted text-sm">{stat.label}</span>
            </div>
            <span className={`font-bold text-sm ${stat.color}`}>
              {stat.isPercent ? `${stat.value}%` : formatNumber(stat.value)}
              {stat.label === '气血' && (
                <span className="text-jianghu-text-muted ml-1">/ {formatNumber(player.maxHealth)}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-jianghu-border pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-jianghu-text-muted text-sm">境界</span>
          <span className="text-jianghu-gold font-bold">{player.realm}·{player.realmLevel}重</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-jianghu-text-muted text-xs">修为: {formatNumber(player.cultivation)}/{formatNumber(player.cultivationToNext)}</span>
        </div>
        <div className="h-2 bg-jianghu-dark rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-jianghu-gold/50 to-jianghu-gold transition-all duration-500"
            style={{ width: `${cultivationPercent}%` }}
          />
        </div>
        <button className="w-full mt-3 py-2 bg-gradient-to-r from-jianghu-gold/20 to-jianghu-gold/10 border border-jianghu-gold/30 rounded text-jianghu-gold text-sm font-bold hover:from-jianghu-gold/30 hover:to-jianghu-gold/20 transition-all">
          突破
        </button>
      </div>
    </div>
  );
};

export default PlayerPanel;
