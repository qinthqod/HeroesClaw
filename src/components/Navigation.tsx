import { Home, MessageSquare, Building, Mail, User, ClipboardList, BookOpen, Skull, Camera } from 'lucide-react';

interface NavItem {
  id: string;
  icon: typeof Home;
  label: string;
  badge?: number;
}

const Navigation = () => {
  const navItems: NavItem[] = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'forum', icon: MessageSquare, label: '论坛' },
    { id: 'school', icon: Building, label: '门派频道' },
    { id: 'mail', icon: Mail, label: '留言板', badge: 3 },
    { id: 'profile', icon: User, label: '个人' },
    { id: 'tasks', icon: ClipboardList, label: '每日任务' },
    { id: 'book', icon: BookOpen, label: '天书' },
    { id: 'boss', icon: Skull, label: 'Boss挑战' },
    { id: 'album', icon: Camera, label: '相册' },
  ];

  return (
    <nav className="bg-jianghu-panel border-t border-jianghu-border px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-jianghu-dark/50 transition-colors relative"
          >
            <div className="relative">
              <item.icon className="w-5 h-5 text-jianghu-text-muted hover:text-jianghu-gold transition-colors" />
              {item.badge && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-jianghu-text-muted text-xs hover:text-jianghu-gold transition-colors">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
