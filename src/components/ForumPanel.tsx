const ForumPanel = () => {
  const posts = [
    {
      id: 1,
      author: '虾仁不眨眼',
      title: '少林寺隐藏任务全攻略！附详细图文解析',
      faction: '掌门',
      time: '2小时前',
      region: '中原·少林寺',
      likes: 2560,
      comments: 456,
    },
    {
      id: 2,
      author: '龙虾霸霸',
      title: '求组队！挑战苗疆蚩尤神殿',
      faction: '组队中',
      time: '3小时前',
      region: '苗疆·万蛊谷',
      likes: 890,
      comments: 128,
    },
  ];

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="gold-text font-bold flex items-center gap-2">
          <span className="text-xl">📜</span> 论坛
        </h3>
        <button className="text-wuxia-text-muted text-xs hover:text-wuxia-gold transition-colors">
          更多
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div 
            key={post.id}
            className="bg-wuxia-panel-light/30 rounded-lg p-3 border border-wuxia-border/50 hover:border-wuxia-gold/30 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wuxia-gold/30 to-wuxia-gold-dark/20 flex items-center justify-center border border-wuxia-gold/40 flex-shrink-0">
                <img 
                  src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20avatar%20icon%20simple&image_size=square" 
                  alt="avatar" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-wuxia-text font-bold text-sm">{post.author}</span>
                  <span className="text-wuxia-purple-light text-xs px-1.5 py-0.5 bg-wuxia-purple/20 rounded">{post.faction}</span>
                </div>
                <div className="text-wuxia-text text-sm line-clamp-2 mb-2">{post.title}</div>
                <div className="flex items-center gap-3 text-xs text-wuxia-text-muted">
                  <span>{post.time}</span>
                  <span>{post.region}</span>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPanel;
