import { Sparkles, ArrowRight } from 'lucide-react';

const BreakthroughPanel = () => {
  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-jianghu-gold font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            境界突破
          </h3>
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/30 to-transparent flex items-center justify-center border-2 border-yellow-500/50">
              <img 
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20meditating%20glowing%20aura%20kung%20fu%20master&image_size=square" 
                alt="突破" 
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500/80 text-white text-xs px-3 py-1 rounded-full font-bold">
              突破成功
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-center">
            <span className="text-jianghu-gold font-bold">金丹中期·五重</span>
          </div>
          <ArrowRight className="w-5 h-5 text-yellow-500" />
          <div className="text-center">
            <span className="text-yellow-400 font-bold">金丹后期·一重</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-jianghu-dark/50 rounded p-2 text-center">
            <span className="text-red-400 font-bold text-sm">+85630</span>
            <span className="text-jianghu-text-muted text-xs block">气血</span>
          </div>
          <div className="bg-jianghu-dark/50 rounded p-2 text-center">
            <span className="text-blue-400 font-bold text-sm">+6430</span>
            <span className="text-jianghu-text-muted text-xs block">防御</span>
          </div>
          <div className="bg-jianghu-dark/50 rounded p-2 text-center">
            <span className="text-orange-400 font-bold text-sm">+12870</span>
            <span className="text-jianghu-text-muted text-xs block">攻击</span>
          </div>
          <div className="bg-jianghu-dark/50 rounded p-2 text-center">
            <span className="text-jianghu-gold font-bold text-sm">+5000万</span>
            <span className="text-jianghu-text-muted text-xs block">修为上限</span>
          </div>
        </div>

        <div className="h-2 bg-jianghu-dark rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-yellow-500/50 to-yellow-500" style={{ width: '35%' }} />
        </div>
        <div className="text-center text-jianghu-text-muted text-xs">
          从126级突破至128级
        </div>
      </div>
    </div>
  );
};

export default BreakthroughPanel;
