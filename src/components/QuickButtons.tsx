import { Backpack, Shield, Users, BookOpen, Zap, Cat } from 'lucide-react';

interface QuickButton {
  id: string;
  icon: typeof Backpack;
  label: string;
  badge?: number;
}

const QuickButtons = () => {
  const buttons: QuickButton[] = [
    { id: 'backpack', icon: Backpack, label: '背包' },
    { id: 'equipment', icon: Shield, label: '装备' },
    { id: 'companions', icon: Users, label: '伙伴' },
    { id: 'skills', icon: BookOpen, label: '功法' },
    { id: 'mount', icon: Zap, label: '坐骑' },
    { id: 'pet', icon: Cat, label: '灵宠', badge: 1 },
  ];

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-3">
      <div className="flex items-center justify-around">
        {buttons.map((button) => (
          <button
            key={button.id}
            className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-jianghu-dark/50 transition-colors relative"
          >
            <div className="relative">
              <button.icon className="w-7 h-7 text-jianghu-text-muted hover:text-jianghu-gold transition-colors" />
              {button.badge && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {button.badge}
                </span>
              )}
            </div>
            <span className="text-jianghu-text-muted text-xs hover:text-jianghu-gold transition-colors">{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickButtons;
