import { useGameStore } from '../store/gameStore';

const BattleLog = () => {
  const { logs } = useGameStore();

  const typeColors: Record<string, string> = {
    info: 'text-wuxia-text-muted',
    success: 'text-wuxia-jade',
    warning: 'text-wuxia-gold',
    danger: 'text-wuxia-crimson',
  };

  const typeIcons: Record<string, string> = {
    info: '📄',
    success: '✓',
    warning: '⚠',
    danger: '⚔',
  };

  return (
    <div className="wuxia-panel p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-lg">📜</span> 实时战斗日志
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-wuxia-text-muted text-xs">自动</span>
          <div className="w-9 h-4 bg-wuxia-jade/30 rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-wuxia-jade rounded-full" />
          </div>
        </div>
      </div>

      <div className="h-40 overflow-y-auto space-y-1.5 pr-1">
        {logs.map((log) => (
          <div 
            key={log.id}
            className={`flex items-start gap-2 text-xs py-1 border-b border-wuxia-border/20 last:border-0 ${typeColors[log.type]}`}
          >
            <span className="text-wuxia-text-dark flex-shrink-0">{log.time}</span>
            <span className="flex-shrink-0">{typeIcons[log.type]}</span>
            <span className="break-all">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleLog;
