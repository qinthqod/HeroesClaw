const NPCArchive = () => {
  const npc = {
    id: 'npc1',
    name: '扫地僧',
    title: '少林无名',
    faction: '少林',
    region: '中原',
    description: '深藏不露的武林高手，隐居少林寺藏经阁多年',
    personality: ['沉稳', '睿智', '慈祥'],
    relationship: '莫逆之交',
    relationshipLevel: 15200,
    memories: [
      '你曾帮我寻找丢失的佛珠',
      '你对佛法很有悟性',
      '你已连续7天来请教佛法',
    ],
  };

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">👴</span> NPC档案
        </h3>
        <button className="text-wuxia-text-muted text-xs hover:text-wuxia-gold transition-colors">
          查看完整档案
        </button>
      </div>

      <div className="flex gap-3 mb-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-wuxia-gold/30 shadow-gold">
          <img 
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20elderly%20monk%20wise%20peaceful%20portrait%20anime%20style&image_size=square" 
            alt="扫地僧" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-wuxia-text font-bold">{npc.name}</span>
            <span className="text-wuxia-text-muted text-xs">{npc.title}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-wuxia-text-muted mb-2">
            <span>🏯 {npc.faction}</span>
            <span>📍 {npc.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-wuxia-purple-light text-xs">关系:</span>
            <span className="text-wuxia-gold text-xs font-bold">{npc.relationship}({npc.relationshipLevel})</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {npc.personality.map((trait) => (
          <span 
            key={trait}
            className="text-xs px-2 py-1 bg-wuxia-panel-light/50 rounded-full text-wuxia-text-muted"
          >
            {trait}
          </span>
        ))}
      </div>

      <div className="mb-3">
        <div className="text-wuxia-text-muted text-xs mb-1">记忆</div>
        <div className="space-y-1">
          {npc.memories.map((memory, index) => (
            <div key={index} className="text-xs text-wuxia-text bg-wuxia-dark/30 rounded-lg p-2">
              {memory}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= 4 ? 'text-wuxia-gold' : 'text-wuxia-border'}`}
          >
            ❤
          </span>
        ))}
      </div>
    </div>
  );
};

export default NPCArchive;
