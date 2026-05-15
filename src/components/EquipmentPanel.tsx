import { useGameStore } from '../store/gameStore';

const EquipmentPanel = () => {
  const { player } = useGameStore();

  const rarityColors: Record<string, string> = {
    common: 'border-gray-400 bg-gray-400/20',
    rare: 'border-blue-400 bg-blue-400/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    epic: 'border-purple-400 bg-purple-400/20 shadow-[0_0_10px_rgba(147,51,234,0.3)]',
    legendary: 'border-yellow-400 bg-yellow-400/20 shadow-[0_0_15px_rgba(250,204,21,0.4)]',
  };

  const rarityTextColors: Record<string, string> = {
    common: 'text-gray-300',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
  };

  const typeIcons: Record<string, string> = {
    weapon: '⚔',
    armor: '🛡',
    boots: '👢',
    accessory: '💍',
    helmet: '⛑',
    pants: '👖',
  };

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">🎒</span> 装备
        </h3>
        <button className="text-wuxia-text-muted text-xs hover:text-wuxia-gold transition-colors">
          强化
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {player.equipment.map((item) => (
          <div 
            key={item.id}
            className={`relative p-2 rounded-lg border ${rarityColors[item.rarity]} transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{typeIcons[item.type]}</span>
              <span className={`text-xs font-bold ${rarityTextColors[item.rarity]}`}>+{item.level}</span>
            </div>
            <div className="text-wuxia-text text-xs font-bold truncate">{item.name}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {item.stats.attack && (
                <span className="text-xs px-1 py-0.5 bg-wuxia-crimson/30 rounded text-wuxia-crimson">
                  攻+{item.stats.attack}
                </span>
              )}
              {item.stats.defense && (
                <span className="text-xs px-1 py-0.5 bg-wuxia-azure/30 rounded text-wuxia-azure">
                  防+{item.stats.defense}
                </span>
              )}
              {item.stats.health && (
                <span className="text-xs px-1 py-0.5 bg-wuxia-jade/30 rounded text-wuxia-jade">
                  血+{item.stats.health}
                </span>
              )}
              {item.stats.speed && (
                <span className="text-xs px-1 py-0.5 bg-wuxia-gold/30 rounded text-wuxia-gold">
                  速+{item.stats.speed}
                </span>
              )}
              {item.stats.luck && (
                <span className="text-xs px-1 py-0.5 bg-wuxia-purple/30 rounded text-wuxia-purple-light">
                  暴+{item.stats.luck}
                </span>
              )}
            </div>
            {item.rarity === 'legendary' && (
              <div className="absolute top-1 right-1 text-xs animate-sparkle">⭐</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-wuxia-border/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-wuxia-text-muted">套装属性</span>
          <span className="text-wuxia-gold">2/6 已激活</span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-wuxia-text-muted">江湖豪杰</span>
            <span className="text-wuxia-jade">攻击+5%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-wuxia-text-muted">武林至尊</span>
            <span className="text-wuxia-text-dark">攻击+10% (4/6)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentPanel;
