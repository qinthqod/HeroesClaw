import { TrendingUp, Star, Coins, Gem } from 'lucide-react';

const DailyRewards = () => {
  const rewards = [
    { icon: TrendingUp, label: '经验', value: '+356.7万', color: 'text-blue-400' },
    { icon: Star, label: '修为', value: '+23.6万', color: 'text-yellow-400' },
    { icon: Coins, label: '银两', value: '+12.8万', color: 'text-green-400' },
    { icon: Gem, label: '灵石', value: '+8560', color: 'text-purple-400' },
  ];

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <h3 className="text-jianghu-gold font-bold mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        今日收益
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {rewards.map((reward, index) => (
          <div key={index} className="bg-jianghu-dark/50 rounded-lg p-3 text-center">
            <reward.icon className={`w-5 h-5 mx-auto ${reward.color} mb-1`} />
            <span className="text-jianghu-text-muted text-xs block">{reward.label}</span>
            <span className={`font-bold text-sm ${reward.color}`}>{reward.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyRewards;
