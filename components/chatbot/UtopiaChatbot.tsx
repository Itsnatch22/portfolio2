'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import knowledgeBase from '@/utopia/knowledge.json'

interface Message {
  id: string
  text: string
  sender: 'user' | 'utopia'
  timestamp: Date
}

export default function UtopiaChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBestAnswer = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    let bestMatch = knowledgeBase[0] // fallback to first item
    let highestScore = 0

    knowledgeBase.forEach((item) => {
      let score = 0
      item.keywords.forEach((keyword) => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1
        }
      })
      
      if (score > highestScore) {
        highestScore = score
        bestMatch = item
      }
    })

    return highestScore > 0 ? bestMatch.answer : "Hmm, I'm not sure about that one. Try asking about Mark's work, his tech stack, EaziWage, or how to get in touch with him!"
  }

  const simulateTyping = (text: string, callback: (text: string) => void) => {
    setIsTyping(true)
    let currentIndex = 0
    const typingSpeed = 30

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        callback(text.substring(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, typingSpeed)
      } else {
        setIsTyping(false)
      }
    }

    typeNextChar()
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate AI thinking and typing
    setTimeout(() => {
      const aiResponse = findBestAnswer(inputValue)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        sender: 'utopia',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      simulateTyping(aiResponse, (typedText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id ? { ...msg, text: typedText } : msg
          )
        )
      })
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const startConversation = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: '',
      sender: 'utopia',
      timestamp: new Date()
    }

    setMessages([welcomeMessage])
    simulateTyping(
      "Hey, I'm Utopia, Mark's personal AI assistant here to answer any question that you have about him. What would you like to know?",
      (typedText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === welcomeMessage.id ? { ...msg, text: typedText } : msg
          )
        )
      }
    )
    setIsOpen(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={startConversation}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-inter flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Chat with Utopia
        </button>
      ) : (
        <div className="w-96 h-[500px] bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--primary)] text-[var(--primary-foreground)] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold font-inter">Utopia</h3>
                <p className="text-xs opacity-90">Mark's AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--background)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  message.sender === 'user' ? 'ml-auto flex-row-reverse' : 'flex-row'
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",
                  message.sender === 'user' 
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
                    : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'
                )}>
                  {message.sender === 'user' ? '👤' : '🤖'}
                </div>
                <div className={cn(
                  "rounded-2xl px-4 py-2 text-sm font-inter",
                  message.sender === 'user'
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'
                )}>
                  {message.text}
                  {message.sender === 'utopia' && message.text === '' && (
                    <span className="inline-block w-2 h-4 bg-[var(--secondary-foreground)] animate-pulse ml-1"></span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[var(--border)] bg-[var(--card)]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Mark..."
                className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-full px-4 py-2 text-sm font-inter placeholder:[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                  inputValue.trim() && !isTyping
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                    : "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed"
                )}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
