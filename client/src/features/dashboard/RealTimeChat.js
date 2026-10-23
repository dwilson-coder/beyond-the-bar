import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { ChatDots, Paperclip, Send, X } from 'react-bootstrap-icons';
import { upcomingEvent } from './mockData';
import './RealTimeChat.css';

const mockMessages = [
  { id: 1, from: 'staff', text: "Hi Harper! I'm Andre, your event lead for the 14th. Excited to be part of your day.", time: 'Oct 19, 10:02 AM' },
  { id: 2, from: 'client', text: 'Thank you! Loved the tasting. Can we swap the mezcal in the second signature drink for tequila blanco?', time: 'Oct 19, 10:15 AM' },
  { id: 3, from: 'staff', text: "Absolutely — I've updated the menu. I'll send the final shopping list once your headcount is locked on Nov 4.", time: 'Oct 19, 10:21 AM' },
];

const RealTimeChat = ({ compact = false }) => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const listRef = useRef(null);

  // Keep the newest message in view without scrolling the whole page
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !attachedFile) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: 'client',
        text: input.trim(),
        file: attachedFile?.name,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      },
    ]);
    setInput('');
    setAttachedFile(null);
  };

  return (
    <Card className={`dash-card chat-card ${compact ? 'is-compact' : ''}`}>
      <Card.Header>
        <div className="chat-header">
          <span className="avatar">AC</span>
          <div>
            <h2 className="dash-card-title">{upcomingEvent.eventLead}</h2>
            <span className="dash-card-sub"><span className="online-dot" /> Your event lead · usually replies within an hour</span>
          </div>
        </div>
        <ChatDots className="text-muted" />
      </Card.Header>
      <Card.Body className="p-0 d-flex flex-column">
        <div className="chat-messages" ref={listRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.from}`}>
              {msg.text && <p className="chat-text">{msg.text}</p>}
              {msg.file && (
                <span className="chat-file"><Paperclip size={12} /> {msg.file}</span>
              )}
              <span className="chat-time">{msg.time}</span>
            </div>
          ))}
        </div>
        <Form onSubmit={handleSend} className="chat-input-area">
          {attachedFile && (
            <div className="chat-attachment">
              <Paperclip size={12} /> {attachedFile.name}
              <button type="button" onClick={() => setAttachedFile(null)} aria-label="Remove attachment">
                <X size={14} />
              </button>
            </div>
          )}
          <div className="chat-compose">
            <label className="icon-btn chat-attach" aria-label="Attach a file">
              <Paperclip size={15} />
              <input type="file" hidden onChange={(e) => setAttachedFile(e.target.files[0])} />
            </label>
            <Form.Control
              placeholder="Write a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Message"
            />
            <Button variant="primary" type="submit" className="chat-send" aria-label="Send">
              <Send size={15} />
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RealTimeChat;
