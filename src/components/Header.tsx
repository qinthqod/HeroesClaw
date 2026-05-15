import { useGameStore } from '../store/gameStore';

const Header = () => {
  const { player } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  return (
    <header className="relative bg-wuxia-darker/90 backdrop-blur-md border-b border-wuxia-border">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-wuxia-gold/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-wuxia-gold/30 to-wuxia-gold-dark/20 border-2 border-wuxia-gold/60 flex items-center justify-center shadow-gold">
                <img 
                  src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20samurai%20warrior%20wearing%20conical%20straw%20hat%20holding%20katana%20kung%20fu%20pose%20chibi%20anime%20detailed&image_size=square" 
                  alt="玩家头像" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-wuxia-crimson rounded-full border-2 border-wuxia-darker flex items-center justify-center text-xs font-bold text-white">
                {player.level}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-title gold-gradient-text">英雄爪</h1>
                <span className="px-2 py-0.5 bg-wuxia-gold/20 border border-wuxia-gold/40 rounded text-wuxia-gold text-sm">VIP</span>
              </div>
              <div className="text-wuxia-text-muted text-sm">{player.name}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-wuxia-panel/80 rounded-lg border border-wuxia-border">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <span className="text-xs">金</span>
              </div>
              <span className="gold-text font-bold">{formatNumber(player.gold)}</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-wuxia-panel/80 rounded-lg border border-wuxia-border">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-xs">锭</span>
              </div>
              <span className="gold-text font-bold">{player.gems}</span>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-wuxia-panel/80 rounded-lg border border-wuxia-border">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-xs">精</span>
              </div>
              <span className="text-wuxia-jade font-bold">{formatNumber(player.spirit)}/分</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-wuxia-border/50">
          <div className="flex items-center gap-2">
            <span className="text-wuxia-text-muted text-sm">修为:</span>
            <div className="w-48 stat-bar">
              <div 
                className="stat-bar-fill" 
                style={{ width: `${(player.cultivation / player.cultivationToNext) * 100}%` }}
              />
            </div>
            <span className="text-wuxia-text-muted text-sm">
              {formatNumber(player.cultivation)}/{formatNumber(player.cultivationToNext)}
            </span>
            <span className="text-wuxia-gold text-sm ml-2">当前修炼效率: +35679/分(+256%)</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-wuxia-panel/50 hover:bg-wuxia-panel-light/50 rounded-lg transition-all group">
              <div className="w-8 h-8 rounded-full bg-wuxia-gold/20 flex items-center justify-center group-hover:bg-wuxia-gold/30 transition-colors">
                <span className="text-wuxia-gold text-lg">月</span>
              </div>
              <span className="text-wuxia-text-muted text-xs">月卡</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-wuxia-panel/50 hover:bg-wuxia-panel-light/50 rounded-lg transition-all group">
              <div className="w-8 h-8 rounded-full bg-wuxia-purple/20 flex items-center justify-center group-hover:bg-wuxia-purple/30 transition-colors">
                <span className="text-wuxia-purple-light text-lg">特</span>
              </div>
              <span className="text-wuxia-text-muted text-xs">特权</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-wuxia-panel/50 hover:bg-wuxia-panel-light/50 rounded-lg transition-all group">
              <div className="w-8 h-8 rounded-full bg-wuxia-crimson/20 flex items-center justify-center group-hover:bg-wuxia-crimson/30 transition-colors relative">
                <span className="text-wuxia-crimson-light text-lg">活</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-wuxia-crimson rounded-full animate-pulse" />
              </div>
              <span className="text-wuxia-text-muted text-xs">活动</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-wuxia-panel/50 hover:bg-wuxia-panel-light/50 rounded-lg transition-all group">
              <div className="w-8 h-8 rounded-full bg-wuxia-jade/20 flex items-center justify-center group-hover:bg-wuxia-jade/30 transition-colors">
                <span className="text-wuxia-jade-light text-lg">福</span>
              </div>
              <span className="text-wuxia-text-muted text-xs">福利</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-3 py-2 bg-wuxia-panel/50 hover:bg-wuxia-panel-light/50 rounded-lg transition-all group">
              <div className="w-8 h-8 rounded-full bg-wuxia-azure/20 flex items-center justify-center group-hover:bg-wuxia-azure/30 transition-colors">
                <span className="text-wuxia-azure-light text-lg">商</span>
              </div>
              <span className="text-wuxia-text-muted text-xs">商城</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
