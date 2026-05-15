import { Coins, Gem, Flame } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
const Header = () => {
 const { player } = useGameStore();
 const formatNumber = (num: number) => {
 if (num >= 100000000) {
 return (num / 100000000).toFixed(1) + '亿';
 }
 if (num >= 10000) {
 return (num / 10000).toFixed(0) + '万';
 }
 return num.toString();
 };
 return (<header className="bg-jianghu-panel border-b border-jianghu-border px-4 py-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-8">
 <div className="flex items-center gap-2">
 <Coins className="w-5 h-5 text-yellow-500"/>
 <span className="text-jianghu-gold font-bold">{formatNumber(player.gold)}</span>
 </div>
 <div className="flex items-center gap-2">
 <Gem className="w-5 h-5 text-purple-500"/>
 <span className="text-purple-400 font-bold">{player.gems}</span>
 </div>
 <div className="flex items-center gap-2">
 <Flame className="w-5 h-5 text-green-500"/>
 <span className="text-green-400 font-bold">{formatNumber(player.spirit)}/分</span>
 </div>
 </div>

 <div className="flex items-center gap-4">
 <button className="flex items-center gap-2 px-3 py-1.5 bg-jianghu-panel border border-jianghu-border rounded hover:border-jianghu-gold transition-colors">
 <span className="text-jianghu-text text-sm">月卡</span>
 </button>
 <button className="flex items-center gap-2 px-3 py-1.5 bg-jianghu-panel border border-jianghu-border rounded hover:border-jianghu-gold transition-colors">
 <span className="text-jianghu-text text-sm">特权</span>
 </button>
 <button className="flex items-center gap-2 px-3 py-1.5 bg-jianghu-panel border border-jianghu-border rounded hover:border-jianghu-gold transition-colors">
 <span className="text-jianghu-text text-sm">活动</span>
 </button>
 <button className="flex items-center gap-2 px-3 py-1.5 bg-jianghu-panel border border-jianghu-border rounded hover:border-jianghu-gold transition-colors">
 <span className="text-jianghu-text text-sm">福利</span>
 </button>
 <button className="flex items-center gap-2 px-3 py-1.5 bg-jianghu-panel border border-jianghu-border rounded hover:border-jianghu-gold transition-colors">
 <span className="text-jianghu-text text-sm">商城</span>
 </button>
 </div>
 </div>
 </header>);
};
export default Header;
