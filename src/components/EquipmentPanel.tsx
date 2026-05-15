import { Sword, Shield, Footprints, Sparkles, Crown, Layers } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const EquipmentPanel = () => {
  const { player } = useGameStore();

  const typeIcons: Record<string, typeof Sword> = {
    weapon: Sword,
    armor: Shield,
    boots: Footprints,
    accessory: Sparkles,
    helmet: Crown,
    pants: Layers,
  };

  const rarityColors: Record<string, string> = {
    common: 'border-gray-500',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-yellow-500',
  };

  const rarityBg: Record<string, string> = {
    common: 'bg-gray-500/10',
    rare: 'bg-blue-500/10',
    epic: 'bg-purple-500/10',
    legendary: 'bg-yellow-500/10',
  };

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <h3 className="text-jianghu-gold font-bold mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        装备
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {player.equipment.map((item) => {
          const Icon = typeIcons[item.type] || Sword;
          return (
            <div
              key={item.id}
              className={`relative p-2 rounded-lg border ${rarityColors[item.rarity]} ${rarityBg[item.rarity]} hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-jianghu-gold" />
                <span className="text-xs text-jianghu-text-muted">+{item.level}</span>
              </div>
              <span className="text-jianghu-text text-sm font-bold block truncate">{item.name}</span>
              {item.rarity === 'legendary' && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentPanel;
