import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Maximize2, Shield, Lock, Eye, Terminal } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ava';
  timestamp: Date;
}

const AgentIcon = () => (
  <div className="relative">
    <Shield className="w-6 h-6 text-white" />
    <Eye className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
  </div>
);

const AvaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('ava-welcomed');
    if (!hasSeenWelcome && !hasInteracted) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "AGENT AVA INITIALIZED. Clearance Level: Alpha. Ready to assist with development operations. How may I be of service?",
        sender: 'ava',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('ava-welcomed', 'true');
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasInteracted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    await simulateTyping();
    const avaMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "ANALYZING REQUEST... Standing by for further instructions.",
      sender: 'ava',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, avaMessage]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 group"
          aria-label="Open chat with AVA"
        >
          <div className="relative">
            <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700">
              <div className="text-white">
                <AgentIcon />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping"></span>
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-96 bg-slate-900 rounded-2xl shadow-2xl transition-all duration-300 border border-slate-700 ${
          isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl overflow-hidden flex items-center justify-center border border-slate-600">
              <AgentIcon />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-semibold text-slate-100">AGENT AVA</h3>
                <Lock className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                SECURE CHANNEL ACTIVE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
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
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[calc(100%-8rem)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ava' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden mr-2 flex-shrink-0 flex items-center justify-center border border-slate-600">
                      <div className="text-white scale-75">
                        <AgentIcon />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.sender === 'user'
                        ? 'bg-slate-700 text-slate-100'
                        : 'bg-slate-800 text-slate-100 border border-slate-700'
                    }`}
                  >
                    <p className="text-sm font-mono">{message.text}</p>
                    <span className="text-xs text-slate-400 mt-1 block font-mono">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden mr-2 flex items-center justify-center border border-slate-600">
                    <div className="text-white scale-75">
                      <AgentIcon />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-slate-700"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-500 text-slate-100 font-mono border border-slate-700"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
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

export default AvaChat;