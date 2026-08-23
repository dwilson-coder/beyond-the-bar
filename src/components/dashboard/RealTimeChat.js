import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { ChatDots, Paperclip, Send } from 'react-bootstrap-icons';
import './RealTimeChat.css';

const mockMessages = [
  { id: 1, from: 'staff', name: 'Event Staff', text: 'Welcome to Beyond The Bar! How can we help?', time: '10:02 AM' },
  { id: 2, from: 'client', name: 'You', text: 'Hi! I have a question about the VIP lounge.', time: '10:05 AM' },
  { id: 3, from: 'staff', name: 'Event Staff', text: 'Of course! The VIP lounge includes bottle service and a dedicated host. Would you like to book?', time: '10:06 AM' },
];

const RealTimeChat = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !attachedFile) return;
    const newMsg = {
      id: Date.now(),
      from: 'client',
      name: 'You',
      text: attachedFile ? `📎 ${attachedFile.name}` : input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file: attachedFile
    };
    setMessages([...messages, newMsg]);
    setInput('');
    setAttachedFile(null);
  };

  return (
    <Card className="dash-card chat-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span><ChatDots className="me-2" /> Event Staff Chat</span>
        <span className="online-dot" title="Online"></span>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble ${msg.from}`}>
              <div className="chat-meta">
                <strong>{msg.name}</strong>
                <small>{msg.time}</small>
              </div>
              <p className="chat-text mb-0">{msg.text}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <Form onSubmit={handleSend} className="chat-input-area">
          {attachedFile && (
            <div className="chat-attachment mb-2">
              <Paperclip size={12} className="me-1" /> {attachedFile.name}
              <button type="button" className="btn btn-sm btn-link p-0 ms-2" onClick={() => setAttachedFile(null)}>×</button>
            </div>
          )}
          <div className="d-flex gap-2">
            <label className="btn btn-outline-secondary btn-sm p-2">
              <Paperclip size={14} />
              <input type="file" hidden onChange={e => setAttachedFile(e.target.files[0])} />
            </label>
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-grow-1"
            />
            <Button variant="primary" type="submit" className="p-2">
              <Send size={14} />
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RealTimeChat;   