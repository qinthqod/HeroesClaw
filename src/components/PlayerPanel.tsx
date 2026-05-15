import { useGameStore } from '../store/gameStore';

const PlayerPanel = () => {
  const { player } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(1) + '万';
    return num.toString();
  };

  const stats = [
    { label: '气血', value: player.health, maxValue: player.maxHealth, icon: '❤', color: 'text-wuxia-crimson' },
    { label: '攻击', value: player.attack, icon: '⚔', color: 'text-wuxia-crimson' },
    { label: '防御', value: player.defense, icon: '🛡', color: 'text-wuxia-azure' },
    { label: '速度', value: player.speed, icon: '⚡', color: 'text-wuxia-jade' },
    { label: '暴击', value: player.luck, suffix: '%', icon: '💥', color: 'text-wuxia-purple' },
    { label: '闪避', value: 23.6, suffix: '%', icon: '🌬', color: 'text-wuxia-jade' },
    { label: '命中', value: 35.2, suffix: '%', icon: '🎯', color: 'text-wuxia-gold' },
    { label: '修为', value: player.cultivation, icon: '✨', color: 'text-wuxia-gold' },
  ];

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">📊</span> 属性
        </h3>
        <span className="text-wuxia-text-muted text-xs">战力: <span className="gold-text font-bold">{formatNumber(player.attack + player.defense + player.speed)}</span></span>
      </div>

      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between py-1.5 border-b border-wuxia-border/30 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-wuxia-text text-sm">{stat.label}</span>
            </div>
            <div className={`text-sm font-bold ${stat.color}`}>
              {stat.maxValue ? (
                <span>{formatNumber(stat.value)}/{formatNumber(stat.maxValue)}</span>
              ) : (
                <span>{formatNumber(stat.value)}{stat.suffix || ''}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-wuxia-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-wuxia-text-muted text-sm">境界</span>
          <button className="text-wuxia-gold text-xs border border-wuxia-gold/50 px-2 py-1 rounded hover:bg-wuxia-gold/20 transition-colors">
            突破
          </button>
        </div>
        <div className="bg-gradient-to-r from-wuxia-gold/20 to-wuxia-gold-dark/10 rounded-lg p-3 border border-wuxia-gold/30">
          <div className="text-center">
            <span className="gold-gradient-text text-xl font-bold">{player.realm}·五重</span>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-wuxia-text-muted">修为进度</span>
              <span className="text-wuxia-gold">{formatNumber(player.cultivation)}/{formatNumber(player.cultivationToNext)}</span>
            </div>
            <div className="stat-bar">
              <div 
                className="stat-bar-fill" 
                style={{ width: `${(player.cultivation / player.cultivationToNext) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`text-lg ${star <= player.realmLevel ? 'text-wuxia-gold animate-glow' : 'text-wuxia-border'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">声望</span>
          <span className="text-wuxia-gold font-bold">{formatNumber(player.reputation)}</span>
        </div>
        <div className="bg-wuxia-panel-light/50 rounded-lg p-2 text-center">
          <span className="text-wuxia-text-muted text-xs block">天枢</span>
          <span className="text-wuxia-purple-light font-bold">{player.tianshuCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
