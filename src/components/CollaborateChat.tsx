import React, { useState, useEffect, useRef } from 'react';
import { Users, X, Send, Minimize2, Maximize2, MessageSquare, UserPlus } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

const CollaborateChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isOpen && !wsRef.current) {
      // Use secure WebSocket for production
      const ws = new WebSocket('wss://echo.websocket.org');

      ws.onopen = () => {
        setIsConnected(true);
        console.log('Connected to chat server');
      };

      ws.onmessage = (event) => {
        try {
          // Ensure the message is valid JSON before parsing
          const message = JSON.parse(event.data);
          if (message && typeof message === 'object' && 'text' in message && 'sender' in message) {
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: message.text,
              sender: message.sender,
              timestamp: new Date()
            }]);
          } else {
            console.warn('Received invalid message format:', message);
          }
        } catch (error) {
          console.warn('Error parsing message:', error);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('Disconnected from chat server');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      wsRef.current = ws;
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOpen = () => {
    if (!username) {
      const name = prompt('Enter your name to join the chat:');
      if (name) {
        setUsername(name);
        setIsOpen(true);
        setIsMinimized(false);
      }
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !wsRef.current) return;

    const message = {
      text: input,
      sender: username,
      timestamp: new Date()
    };

    try {
      wsRef.current.send(JSON.stringify(message));
      setMessages(prev => [...prev, { ...message, id: Date.now().toString() }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-24 group"
          aria-label="Open collaboration chat"
        >
          <div className="relative">
            <div className="relative w-14 h-14 bg-gradient-to-br from-accent-600 to-accent-800 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-accent-500">
              <Users className="w-6 h-6 text-white" />
              {isConnected && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping"></span>
                </span>
              )}
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-24 w-96 bg-gradient-to-br from-accent-900 to-accent-950 rounded-2xl shadow-2xl transition-all duration-300 border border-accent-700 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-accent-700">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-accent-700 to-accent-800 rounded-xl overflow-hidden flex items-center justify-center border border-accent-600">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-semibold text-white">Team Chat</h3>
                <UserPlus className="w-4 h-4 text-accent-400" />
              </div>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                {isConnected ? 'Connected' : 'Connecting...'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="p-2 text-accent-300 hover:text-white transition-colors"
              aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
            >
              {isMinimized ? (
                <Maximize2 className="w-5 h-5" />
              ) : (
                <Minimize2 className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-accent-300 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[calc(100%-8rem)] scrollbar-thin scrollbar-thumb-accent-700 scrollbar-track-transparent">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === username ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.sender === username
                        ? 'bg-accent-600 text-white'
                        : 'bg-accent-800 text-white border border-accent-700'
                    }`}
                  >
                    {message.sender !== username && (
                      <p className="text-xs font-medium text-accent-300 mb-1">
                        {message.sender}
                      </p>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs text-accent-300 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-accent-700"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-accent-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 placeholder-accent-400 text-white border border-accent-700"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default CollaborateChat;