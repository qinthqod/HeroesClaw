import { useGameStore } from '../store/gameStore';

const ArenaPanel = () => {
  const { arena, myArenaRank, myArenaPower } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  const rankColors: Record<number, string> = {
    1: 'bg-gradient-to-br from-yellow-500/40 to-yellow-600/20 border-yellow-500/60 text-yellow-400',
    2: 'bg-gradient-to-br from-gray-400/30 to-gray-500/20 border-gray-400/50 text-gray-300',
    3: 'bg-gradient-to-br from-orange-500/30 to-orange-600/20 border-orange-500/50 text-orange-400',
  };

  const rankBgColors: Record<number, string> = {
    1: 'bg-yellow-500/20',
    2: 'bg-gray-400/20',
    3: 'bg-orange-500/20',
  };

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">🏆</span> 竞技场
        </h3>
        <button className="text-wuxia-text-muted text-xs hover:text-wuxia-gold transition-colors flex items-center gap-1">
          更多 →
        </button>
      </div>

      <div className={`p-3 rounded-lg border ${rankColors[myArenaRank] || 'bg-wuxia-panel-light/50 border-wuxia-border'} mb-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankBgColors[myArenaRank] || 'bg-wuxia-dark'} border ${rankColors[myArenaRank] ? '' : 'border-wuxia-border'}`}>
              <img 
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20warrior%20avatar%20icon%20simple&image_size=square" 
                alt="我的头像" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div>
              <div className="text-wuxia-text font-bold text-sm">我的排名</div>
              <div className={`text-xl font-bold ${rankColors[myArenaRank] ? '' : 'text-wuxia-gold'}`}>
                第{myArenaRank}名
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-wuxia-text-muted text-xs">战力</div>
            <div className="gold-text font-bold">{formatNumber(myArenaPower)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {arena.map((player) => (
          <div 
            key={player.id} 
            className={`flex items-center gap-3 p-2 rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${player.rank <= 3 ? rankBgColors[player.rank] + ' border-transparent' : 'bg-wuxia-dark/30 border-wuxia-border/50 hover:border-wuxia-gold/30'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${rankColors[player.rank] || 'bg-wuxia-dark border-wuxia-border'}`}>
              {player.rank}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-wuxia-text font-bold text-sm">{player.name}</span>
                <span className="text-wuxia-text-muted text-xs">{player.title}</span>
              </div>
              <span className="text-wuxia-text-muted text-xs">{formatNumber(player.power)} 战力</span>
            </div>
            {player.rank === 1 && (
              <span className="text-yellow-400 text-lg animate-glow">👑</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArenaPanel;
