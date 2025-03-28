import React, { useState, useEffect } from 'react';
import '../styles/conversation.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Intro from './Intro';

function Conversation({ selectedUser }) {
  const [message, setSendMessage] = useState('');
  const [viewMessage, setViewMessage] = useState([]);
  const [getMessage, setGetMessage] = useState([]);

  // Fetching messages for the selected user
  useEffect(() => {
    const handleGetMessage = async () => {
      const receiver = selectedUser._id;
      try {
        const response = await axios.get(`https://chat-app-kw4y.onrender.com/api/message/${receiver}`,{withCredentials:true});
        setGetMessage(response.data);
      } catch (error) {
        console.error("Error getting message:", error);
        toast.error("Failed to fetch messages");
      }
    };
    handleGetMessage();
  }, [selectedUser]);

  // Sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const receiver = selectedUser._id;

    try {
      const response = await axios.post(`https://chat-app-kw4y.onrender.com/api/message/send/${receiver}`,
      { message },
      { withCredentials: true });
      setViewMessage((prevMessages) => [...prevMessages, response.data]);
      setSendMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  // Clear sender's messages when user changes
  useEffect(() => {
    setViewMessage([]);
  }, [selectedUser]);

  return (
    <div>
      {selectedUser ? (
        <section className="conversation-container">
          <header>
            <p>To: {selectedUser.fullName}</p>
          </header>

          <div className="chat-container">
            {/* Messages */}
            {[...getMessage, ...viewMessage].map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.senderId === selectedUser._id ? 'receiver' : 'sender'
                }`}
              >
                {msg.senderId === selectedUser._id && (
                  <img
                    src={selectedUser.profilePic}
                    alt="Receiver"
                    className="profile-pic"
                  />
                )}
                <div className="message-content">
                  <p className="message-text">{msg.message}</p>
                  <span className="timestamp">{new Date(msg.createdAt).toLocaleString('en-US',{
                    year:'numeric',
                    month:'long',
                    day:'numeric',
                    hour:'2-digit',
                    minute:'2-digit',
                    hour12:'true',
                  }) || 'Now'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input box */}
          <div className="message-input-container">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setSendMessage(e.target.value)}
                className="message-input"
                placeholder="Type your message..."
                required
              />
              <button className="send-button">Send</button>
            </form>
          </div>
        </section>
      ) : (
        <Intro />
      )}
    </div>
  );
}

export default Conversation;
