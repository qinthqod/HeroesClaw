import { useGameStore } from '../store/gameStore';

const Header = () => {
  const { player } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  };

  return (
    <header className="relative ancient-panel-gold border-t-0 border-l-0 border-r-0 ink-brush-top">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-gradient-to-b from-ancient-gold/30 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-16 h-16 rounded-full ancient-panel-gold border-2 border-ancient-gold flex items-center justify-center shadow-gold group-hover:shadow-gold transition-shadow">
                <img 
                  src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20samurai%20warrior%20wearing%20conical%20straw%20hat%20holding%20katana%20kung%20fu%20pose%20chibi%20anime%20detailed&image_size=square" 
                  alt="玩家头像" 
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-ancient-vermilion rounded-full border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-ancient">
                {player.level}
              </div>
              <div className="absolute -top-1 -left-1 w-6 h-6 gold-gradient-text text-xs font-bold flex items-center justify-center animate-sparkle">VIP</div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-title gold-gradient-text">英雄爪</h1>
                <div className="ancient-badge-vermilion">武林盟主</div>
              </div>
              <div className="text-ancient-ink-light text-base">{player.name}</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-ancient-ink-light">所属门派:</span>
                <span className="text-ancient-indigo font-bold">少林派</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 ancient-panel rounded-lg border-ancient-gold/50 hover:shadow-gold transition-shadow cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-ancient">
                <span className="text-sm font-bold text-ancient-ink-dark">金</span>
              </div>
              <div>
                <div className="text-xs text-ancient-ink-light">银两</div>
                <div className="gold-text text-lg">{formatNumber(player.gold)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-5 py-3 ancient-panel rounded-lg border-ancient-gold/50 hover:shadow-gold transition-shadow cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center shadow-ancient">
                <span className="text-sm font-bold text-ancient-ink-dark">锭</span>
              </div>
              <div>
                <div className="text-xs text-ancient-ink-light">元宝</div>
                <div className="gold-text text-lg">{player.gems}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-5 py-3 ancient-panel rounded-lg border-ancient-jade/50 hover:shadow-jade transition-shadow cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center shadow-ancient">
                <span className="text-sm font-bold text-ancient-ink-dark">精</span>
              </div>
              <div>
                <div className="text-xs text-ancient-ink-light">精元</div>
                <div className="text-ancient-jade font-bold text-lg">{formatNumber(player.spirit)}/分</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-dashed border-ancient-border">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-ancient-ink-light text-sm">修为进度:</span>
              <div className="w-64 stat-bar">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${(player.cultivation / player.cultivationToNext) * 100}%` }}
                />
              </div>
              <span className="text-ancient-ink-light text-sm">
                {formatNumber(player.cultivation)}/{formatNumber(player.cultivationToNext)}
              </span>
            </div>
            <div className="text-ancient-gold font-bold">
              当前修炼效率: +35679/分(+256%)
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex flex-col items-center gap-1 px-4 py-2 ancient-panel rounded-lg border-ancient-gold/30 hover:border-ancient-gold hover:shadow-gold transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200/50 to-yellow-400/30 flex items-center justify-center group-hover:from-yellow-300/60 group-hover:to-yellow-500/40 transition-all">
                <span className="text-xl font-title text-ancient-gold">月</span>
              </div>
              <span className="text-ancient-ink-light text-xs">月卡</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-4 py-2 ancient-panel rounded-lg border-ancient-indigo/30 hover:border-ancient-indigo hover:shadow-indigo transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-200/50 to-indigo-400/30 flex items-center justify-center group-hover:from-indigo-300/60 group-hover:to-indigo-500/40 transition-all">
                <span className="text-xl font-title text-ancient-indigo">特</span>
              </div>
              <span className="text-ancient-ink-light text-xs">特权</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-4 py-2 ancient-panel rounded-lg border-ancient-vermilion/30 hover:border-ancient-vermilion hover:shadow-vermilion transition-all duration-300 group relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-200/50 to-red-400/30 flex items-center justify-center group-hover:from-red-300/60 group-hover:to-red-500/40 transition-all">
                <span className="text-xl font-title text-ancient-vermilion">活</span>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-ancient-vermilion rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">3</span>
              <span className="text-ancient-ink-light text-xs">活动</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-4 py-2 ancient-panel rounded-lg border-ancient-jade/30 hover:border-ancient-jade hover:shadow-jade transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-200/50 to-emerald-400/30 flex items-center justify-center group-hover:from-emerald-300/60 group-hover:to-emerald-500/40 transition-all">
                <span className="text-xl font-title text-ancient-jade">福</span>
              </div>
              <span className="text-ancient-ink-light text-xs">福利</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 px-4 py-2 ancient-panel rounded-lg border-ancient-gold/30 hover:border-ancient-gold hover:shadow-gold transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200/50 to-yellow-400/30 flex items-center justify-center group-hover:from-yellow-300/60 group-hover:to-yellow-500/40 transition-all">
                <span className="text-xl font-title text-ancient-gold">商</span>
              </div>
              <span className="text-ancient-ink-light text-xs">商城</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
