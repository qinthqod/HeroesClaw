const Navigation = () => {
  const navItems = [
    { id: 'home', icon: '🏠', label: '首页', active: true },
    { id: 'forum', icon: '📜', label: '论坛', badge: 2 },
    { id: 'faction', icon: '🏯', label: '门派' },
    { id: 'guestbook', icon: '📝', label: '留言板' },
    { id: 'profile', icon: '👤', label: '个人' },
    { id: 'tasks', icon: '📋', label: '每日任务' },
    { id: 'book', icon: '📚', label: '天书' },
    { id: 'boss', icon: '👹', label: 'Boss挑战' },
    { id: 'album', icon: '📷', label: '相册' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-wuxia-darker/95 backdrop-blur-md border-t border-wuxia-border">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 relative ${
                item.active 
                  ? 'bg-wuxia-gold/20 text-wuxia-gold' 
                  : 'text-wuxia-text-muted hover:text-wuxia-text hover:bg-wuxia-panel-light/30'
              }`}
            >
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-wuxia-crimson rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {item.badge}
                </span>
              )}
              <span className={`text-xl ${item.active ? 'animate-glow' : ''}`}>{item.icon}</span>
              <span className="text-xs font-wuxia">{item.label}</span>
              {item.active && (
                <div className="absolute -bottom-1 w-1 h-1 bg-wuxia-gold rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
