import { useGameStore } from '../store/gameStore';

const PlayerPanel = () => {
  const { player } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(1) + '万';
    return num.toString();
  };

  const stats = [
    { label: '气血', value: player.health, maxValue: player.maxHealth, icon: '❤', color: 'text-ancient-cinnabar' },
    { label: '攻击', value: player.attack, icon: '⚔', color: 'text-ancient-cinnabar' },
    { label: '防御', value: player.defense, icon: '🛡', color: 'text-ancient-indigo' },
    { label: '速度', value: player.speed, icon: '⚡', color: 'text-ancient-jade' },
    { label: '暴击', value: player.luck, suffix: '%', icon: '💥', color: 'text-ancient-gold' },
    { label: '闪避', value: 23.6, suffix: '%', icon: '🌬', color: 'text-ancient-jade' },
    { label: '命中', value: 35.2, suffix: '%', icon: '🎯', color: 'text-ancient-gold' },
    { label: '修为', value: player.cultivation, icon: '✨', color: 'text-ancient-gold' },
  ];

  return (
    <div className="ancient-panel-gold p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="gold-text font-title text-xl flex items-center gap-2">
          <span className="text-2xl">📊</span> 人物属性
        </h3>
        <span className="text-ancient-ink-light text-sm">战力: <span className="gold-text font-bold">{formatNumber(player.attack + player.defense + player.speed)}</span></span>
      </div>

      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-dashed border-ancient-border/50 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-ancient-ink text-base">{stat.label}</span>
            </div>
            <div className={`text-base font-bold ${stat.color}`}>
              {stat.maxValue ? (
                <span>{formatNumber(stat.value)}/{formatNumber(stat.maxValue)}</span>
              ) : (
                <span>{formatNumber(stat.value)}{stat.suffix || ''}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t-2 border-dashed border-ancient-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-ancient-ink-light text-base">境界</span>
          <button className="ancient-btn-vermilion text-sm px-3 py-1">
            突破
          </button>
        </div>
        <div className="bg-gradient-to-r from-ancient-gold/20 to-ancient-gold-dark/10 rounded-lg p-4 border-2 border-ancient-gold/50 shadow-gold">
          <div className="text-center mb-3">
            <span className="gold-gradient-text text-2xl font-title">{player.realm}·五重</span>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-ancient-ink-light">修为进度</span>
              <span className="text-ancient-gold">{formatNumber(player.cultivation)}/{formatNumber(player.cultivationToNext)}</span>
            </div>
            <div className="stat-bar">
              <div 
                className="stat-bar-fill" 
                style={{ width: `${(player.cultivation / player.cultivationToNext) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`text-2xl ${star <= player.realmLevel ? 'text-ancient-gold animate-glow' : 'text-ancient-border'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="ancient-panel p-3 text-center">
          <span className="text-ancient-ink-light text-sm block">声望</span>
          <span className="gold-text font-bold text-lg">{formatNumber(player.reputation)}</span>
        </div>
        <div className="ancient-panel p-3 text-center">
          <span className="text-ancient-ink-light text-sm block">天枢</span>
          <span className="text-ancient-indigo font-bold text-lg">{player.tianshuCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
