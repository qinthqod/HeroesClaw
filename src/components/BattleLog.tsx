import { ScrollText } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const BattleLog = () => {
  const { logs } = useGameStore();

  const typeColors: Record<string, string> = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
  };

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-jianghu-gold font-bold flex items-center gap-2">
          <ScrollText className="w-4 h-4" />
          实时战斗日志
        </h3>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-jianghu-text-muted text-xs">自动</span>
        </div>
      </div>
      <div className="h-48 overflow-y-auto space-y-1">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 py-1 border-b border-jianghu-border/30 last:border-0">
            <span className="text-jianghu-text-muted text-xs whitespace-nowrap">{log.time}</span>
            <span className={`text-sm ${typeColors[log.type]}`}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleLog;
