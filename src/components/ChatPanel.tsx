import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

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
    { id: 'compliment', label: '赞美', icon: '😍' },
    { id: 'ask', label: '问问情况', icon: '❓' },
    { id: 'farewell', label: '告辞', icon: '👋' },
  ];

  return (
    <div className="wuxia-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-wuxia-gold text-xl">💬</span>
          <span className="gold-text font-bold">聊天</span>
        </div>
        <button 
          onClick={closeChat}
          className="text-wuxia-text-muted text-xs hover:text-red-400 transition-colors"
        >
          关闭
        </button>
      </div>

      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/10 rounded-lg p-3 mb-3 border border-pink-500/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/20 flex items-center justify-center border border-pink-500/50">
            <img 
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20ancient%20chinese%20woman%20warrior%20portrait%20anime%20style%20elegant&image_size=square" 
              alt="小师妹" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-wuxia-text font-bold">{currentChat.name}</span>
              <span className="text-green-500 text-xs px-2 py-0.5 bg-green-500/20 rounded-full">友善</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-400 text-sm">❤</span>
              <span className="text-wuxia-text-muted text-xs">好感度 1280/3000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-36 overflow-y-auto space-y-3 mb-3 pr-1">
        {currentChat.messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex gap-2 ${msg.isPlayer ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
              msg.isPlayer ? 'bg-wuxia-gold/30 text-wuxia-gold' : 'bg-pink-500/30 text-pink-400'
            }`}>
              {msg.isPlayer ? '虾' : '妹'}
            </div>
            <div className={`max-w-[75%] px-3 py-2 rounded-lg ${
              msg.isPlayer 
                ? 'bg-gradient-to-r from-wuxia-gold/30 to-wuxia-gold-dark/20 text-wuxia-gold rounded-tr-none border border-wuxia-gold/30' 
                : 'bg-wuxia-panel-light/50 text-wuxia-text rounded-tl-none border border-wuxia-border'
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
            className="flex flex-col items-center gap-1 p-2 bg-wuxia-panel-light/30 rounded-lg hover:bg-wuxia-panel-light/50 border border-wuxia-border/50 hover:border-wuxia-gold/30 transition-all duration-300"
          >
            <span className="text-lg">{option.icon}</span>
            <span className="text-wuxia-text-muted text-xs">{option.label}</span>
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
          className="flex-1 px-3 py-2 bg-wuxia-dark/60 border border-wuxia-border rounded-lg text-wuxia-text placeholder-wuxia-text-muted focus:outline-none focus:border-wuxia-gold/50 transition-colors"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-gradient-to-r from-wuxia-gold/30 to-wuxia-gold-dark/20 border border-wuxia-gold/50 rounded-lg text-wuxia-gold hover:from-wuxia-gold/40 hover:to-wuxia-gold-dark/30 transition-all"
        >
          发送
        </button>
      </div>

      <div className="flex gap-2 mt-3">
        <button className="flex-1 py-2 bg-wuxia-panel-light/30 border border-wuxia-border rounded-lg text-wuxia-text-muted text-xs hover:border-wuxia-gold/30 hover:text-wuxia-gold transition-all">
          记忆
        </button>
        <button className="flex-1 py-2 bg-wuxia-panel-light/30 border border-wuxia-border rounded-lg text-wuxia-text-muted text-xs hover:border-wuxia-gold/30 hover:text-wuxia-gold transition-all">
          突破金丹
        </button>
        <button className="flex-1 py-2 bg-wuxia-panel-light/30 border border-wuxia-border rounded-lg text-wuxia-text-muted text-xs hover:border-wuxia-gold/30 hover:text-wuxia-gold transition-all">
          赠送礼物
        </button>
        <button className="flex-1 py-2 bg-wuxia-panel-light/30 border border-wuxia-border rounded-lg text-wuxia-text-muted text-xs hover:border-wuxia-gold/30 hover:text-wuxia-gold transition-all">
          比武切磋
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
