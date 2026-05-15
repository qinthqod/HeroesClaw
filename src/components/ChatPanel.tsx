import { MessageCircle, Heart, Send } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useState } from 'react';

const ChatPanel = () => {
  const { currentChat, sendChatMessage, closeChat } = useGameStore();
  const [inputMessage, setInputMessage] = useState('');

  if (!currentChat) return null;

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendChatMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const chatOptions = [
    { id: 'greet', label: '打招呼', icon: '👋' },
    { id: 'praise', label: '夸夸她', icon: '👍' },
    { id: 'compliment', label: '夸夸她', icon: '😍' },
    { id: 'ask', label: '问问情况', icon: '❓' },
    { id: 'farewell', label: '告辞', icon: '👋' },
  ];

  return (
    <div className="bg-jianghu-panel border border-jianghu-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-jianghu-gold" />
          <span className="text-jianghu-gold font-bold">聊天</span>
        </div>
        <button 
          onClick={closeChat}
          className="text-jianghu-text-muted text-xs hover:text-red-400 transition-colors"
        >
          关闭
        </button>
      </div>

      <div className="bg-jianghu-dark/50 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/30 to-transparent flex items-center justify-center border border-pink-500/50">
            <img 
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20ancient%20chinese%20woman%20warrior%20portrait%20anime%20style&image_size=square" 
              alt="小师妹" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-jianghu-text font-bold">{currentChat.name}</span>
              <span className="text-green-500 text-xs px-2 py-0.5 bg-green-500/20 rounded">友善</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Heart className="w-3 h-3 text-red-400" />
              <span className="text-jianghu-text-muted text-xs">好感度 1280/3000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 overflow-y-auto space-y-3 mb-3">
        {currentChat.messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex gap-2 ${msg.isPlayer ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
              msg.isPlayer ? 'bg-jianghu-gold/30' : 'bg-pink-500/30'
            }`}>
              {msg.isPlayer ? '虾' : '妹'}
            </div>
            <div className={`max-w-[70%] px-3 py-2 rounded-lg ${
              msg.isPlayer 
                ? 'bg-jianghu-gold/20 text-jianghu-gold rounded-tr-none' 
                : 'bg-jianghu-dark/50 text-jianghu-text rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2 mb-3">
        {chatOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => sendChatMessage(option.label)}
            className="flex flex-col items-center gap-1 p-2 bg-jianghu-dark/50 rounded-lg hover:bg-jianghu-dark/70 transition-colors"
          >
            <span className="text-lg">{option.icon}</span>
            <span className="text-jianghu-text-muted text-xs">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
          className="flex-1 px-3 py-2 bg-jianghu-dark/50 border border-jianghu-border rounded-lg text-jianghu-text placeholder-jianghu-text-muted focus:outline-none focus:border-jianghu-gold"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-jianghu-gold/20 border border-jianghu-gold/50 rounded-lg text-jianghu-gold hover:bg-jianghu-gold/30 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="flex-1 py-2 bg-jianghu-dark/50 border border-jianghu-border rounded-lg text-jianghu-text-muted text-xs hover:border-jianghu-gold/50 transition-colors">
          记忆
        </button>
        <button className="flex-1 py-2 bg-jianghu-dark/50 border border-jianghu-border rounded-lg text-jianghu-text-muted text-xs hover:border-jianghu-gold/50 transition-colors">
          突破金丹
        </button>
        <button className="flex-1 py-2 bg-jianghu-dark/50 border border-jianghu-border rounded-lg text-jianghu-text-muted text-xs hover:border-jianghu-gold/50 transition-colors">
          赠送礼物
        </button>
        <button className="flex-1 py-2 bg-jianghu-dark/50 border border-jianghu-border rounded-lg text-jianghu-text-muted text-xs hover:border-jianghu-gold/50 transition-colors">
          比武切磋
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
