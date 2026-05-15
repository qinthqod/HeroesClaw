import { User, Heart, Star } from 'lucide-react';

const NPCArchive = () => {
  const npc = {
    name: '扫地僧',
    title: '少林无名',
    region: '中原',
    personality: ['沉稳', '睿智', '慈祥'],
    relationship: '莫逆之交(15200)',
    memories: [
      '你曾帮我寻找丢失的佛珠',
      '你对佛法很有悟性',
      '你已连续7天来请教佛法',
    ],
  };

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-jianghu-gold font-bold flex items-center gap-2">
          <User className="w-4 h-4" />
          NPC档案
        </h3>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-500/30 to-transparent flex items-center justify-center border border-gray-500/50">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=old%20buddhist%20monk%20sweeping%20temple%20wise%20elder%20anime%20style&image_size=square" 
            alt="扫地僧" 
            className="w-18 h-18 rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-jianghu-text font-bold text-lg">{npc.name}</span>
            <span className="text-jianghu-text-muted text-sm">{npc.title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-jianghu-text-muted text-xs">{npc.region}</span>
            <span className="text-green-500 text-xs px-2 py-0.5 bg-green-500/20 rounded">{npc.relationship}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {npc.personality.map((trait) => (
              <span key={trait} className="text-jianghu-gold text-xs px-2 py-0.5 bg-jianghu-gold/10 rounded">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        <Heart className="w-5 h-5 text-red-400 fill-red-400" />
        <Heart className="w-5 h-5 text-red-400 fill-red-400" />
        <Heart className="w-5 h-5 text-red-400 fill-red-400" />
        <Heart className="w-5 h-5 text-red-400" />
        <Heart className="w-5 h-5 text-red-400" />
      </div>

      <div className="bg-jianghu-dark/50 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-jianghu-text-muted text-sm">记忆</span>
        </div>
        <ul className="space-y-1">
          {npc.memories.map((memory, index) => (
            <li key={index} className="text-jianghu-text-muted text-xs flex items-start gap-2">
              <span className="text-jianghu-gold">•</span>
              {memory}
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full py-2 bg-jianghu-dark/50 border border-jianghu-border rounded-lg text-jianghu-text-muted text-sm hover:border-jianghu-gold/50 hover:text-jianghu-gold transition-colors">
        查看完整档案
      </button>
    </div>
  );
};

export default NPCArchive;
