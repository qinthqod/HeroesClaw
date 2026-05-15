const DailyRewards = () => {
  const rewards = [
    { id: 1, icon: '💰', label: '银两', value: '12.8万', claimed: false },
    { id: 2, icon: '💎', label: '灵石', value: '8560', claimed: false },
    { id: 3, icon: '📚', label: '经验', value: '356.7万', claimed: false },
    { id: 4, icon: '✨', label: '修为', value: '23.6万', claimed: false },
  ];

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">🎁</span> 今日收益
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {rewards.map((reward) => (
          <div 
            key={reward.id}
            className={`p-2 rounded-lg border transition-all ${
              reward.claimed 
                ? 'bg-wuxia-panel-light/20 border-wuxia-border/50 opacity-50' 
                : 'bg-wuxia-panel-light/40 border-wuxia-border hover:border-wuxia-gold/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{reward.icon}</span>
              <div>
                <div className="text-wuxia-text-muted text-xs">{reward.label}</div>
                <div className="gold-text font-bold text-sm">{reward.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyRewards;
