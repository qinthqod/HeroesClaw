const QuickButtons = () => {
  const buttons = [
    { id: 'backpack', icon: '🎒', label: '背包', badge: 3 },
    { id: 'equipment', icon: '⚔', label: '装备' },
    { id: 'partner', icon: '👥', label: '伙伴' },
    { id: 'skill', icon: '📚', label: '功法' },
    { id: 'mount', icon: '🐴', label: '坐骑' },
    { id: 'pet', icon: '🐕', label: '灵宠' },
  ];

  return (
    <div className="wuxia-panel p-3">
      <div className="flex items-center justify-around">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-wuxia-panel-light/30 border border-wuxia-border/50 hover:border-wuxia-gold/50 hover:bg-wuxia-panel-light/50 transition-all duration-300 relative group"
          >
            {btn.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-wuxia-crimson rounded-full flex items-center justify-center text-xs font-bold text-white">
                {btn.badge}
              </span>
            )}
            <span className="text-xl group-hover:scale-110 transition-transform">{btn.icon}</span>
            <span className="text-wuxia-text-muted text-xs">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickButtons;
