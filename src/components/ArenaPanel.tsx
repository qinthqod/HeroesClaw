import { Trophy, ChevronRight, Medal } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const ArenaPanel = () => {
  const { arena, myArenaRank, myArenaPower } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  const rankColors: Record<number, string> = {
    1: 'text-yellow-400',
    2: 'text-gray-300',
    3: 'text-orange-400',
  };

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-jianghu-gold font-bold flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          竞技场
        </h3>
        <button className="text-jianghu-text-muted text-xs flex items-center gap-1 hover:text-jianghu-gold transition-colors">
          更多 <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="bg-jianghu-dark/50 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-jianghu-gold/30 to-transparent flex items-center justify-center border border-jianghu-gold/50">
              <img 
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20warrior%20avatar%20icon&image_size=square" 
                alt="我的头像" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Medal className={`w-4 h-4 ${rankColors[myArenaRank] || 'text-jianghu-text-muted'}`} />
                <span className="text-jianghu-text font-bold">我的排名</span>
              </div>
              <span className={`text-xl font-bold ${rankColors[myArenaRank] || 'text-jianghu-gold'}`}>第{myArenaRank}名</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-jianghu-text-muted text-xs block">战力</span>
            <span className="text-jianghu-gold font-bold">{formatNumber(myArenaPower)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {arena.map((player) => (
          <div 
            key={player.id} 
            className="flex items-center gap-3 p-2 bg-jianghu-dark/30 rounded-lg hover:bg-jianghu-dark/50 transition-colors cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              player.rank <= 3 ? 'bg-gradient-to-br from-yellow-500/30 to-transparent border border-yellow-500/50' : 'bg-jianghu-dark'
            }`}>
              <span className={rankColors[player.rank] || 'text-jianghu-text-muted'}>{player.rank}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-jianghu-text font-bold text-sm">{player.name}</span>
                <span className="text-jianghu-text-muted text-xs">{player.title}</span>
              </div>
              <span className="text-jianghu-text-muted text-xs">{formatNumber(player.power)} 战力</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArenaPanel;
