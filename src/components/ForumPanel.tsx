import { MessageSquare, Clock, Users, ThumbsUp, MessageCircle } from 'lucide-react';

const ForumPanel = () => {
  const posts = [
    {
      id: '1',
      avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20red%20crawfish%20avatar%20icon&image_size=square',
      author: '虾仁不眨眼',
      title: '少林寺隐藏任务全攻略！',
      content: '今天终于把少林寺的隐藏任务都做完啦！总结了一下经验，分享给大家~',
      time: '2小时前',
      location: '中原·少林寺',
      likes: 128,
      comments: 42,
      isSticky: true,
    },
    {
      id: '2',
      avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20blue%20crawfish%20avatar%20icon&image_size=square',
      author: '龙虾霸霸',
      title: '求组队！挑战苗疆蛊龙神殿',
      content: '有没有大佬带带我？刚到苗疆，想打蛊龙神殿...',
      time: '3小时前',
      location: '苗疆·万蛊谷',
      likes: 23,
      comments: 15,
      isSticky: false,
    },
  ];

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-jianghu-gold font-bold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          论坛 / 帖子卡片
        </h3>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-jianghu-dark/50 rounded-lg p-3 hover:bg-jianghu-dark/70 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <img 
                src={post.avatar} 
                alt={post.author} 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-jianghu-text font-bold">{post.author}</span>
                  {post.isSticky && (
                    <span className="text-red-500 text-xs px-1.5 py-0.5 bg-red-500/20 rounded">置顶</span>
                  )}
                </div>
                <h4 className="text-jianghu-text font-bold mb-1">{post.title}</h4>
                <p className="text-jianghu-text-muted text-sm mb-2 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-jianghu-text-muted">
                    <Clock className="w-3 h-3" />
                    {post.time}
                  </div>
                  <div className="flex items-center gap-1 text-jianghu-text-muted">
                    <Users className="w-3 h-3" />
                    {post.location}
                  </div>
                  <div className="flex items-center gap-1 text-jianghu-text-muted">
                    <ThumbsUp className="w-3 h-3" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1 text-jianghu-text-muted">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </div>
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
