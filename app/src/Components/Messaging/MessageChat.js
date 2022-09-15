import React from 'react';
import Container from 'react-bootstrap/Container';
import './css/MessageChat.css';

const MessageChat = ({ privateChats, currentContact, username }) => {
  // need to add conditional to check if message is from user or contact to change alignment of message
  //  <li className={`message ${message.senderName === username && "self"}`} key={index}>
  // {message.senderName !== username && <div className="avatar">{message.senderName}</div>}
  // <div className="message-data">{message.message}</div>
  // {message.senderName === username && <div className="avatar self">{message.senderName}</div>}
  // </li>
  const formatDate = (string) => {
    var options = { hour: 'numeric', minute: 'numeric' };
    return new Date(string).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    // return new Date(string).toLocaleDateString('en-US',options);
  };

  return (
    <Container>
      {currentContact === '' ? (
        <div>Click on contact to view messages.</div>
      ) : (
        <div className='chat-content'>
          <ul>
            {privateChats &&
              [...privateChats.get(currentContact)].map((message, index) => {
                return (
                  <li
                    className={`message ${
                      message.senderName === username && 'self'
                    }`}
                    key={index}
                  >
                    {message.senderName !== username && (
                      <div className='avatar'>
                        <img
                          className='rounded-circle'
                          src={message.senderPhoto}
                          alt=''
                        />
                        {/* // {message.senderPhoto} */}
                      </div>
                    )}
                    <div className='message-data'>{message.message}</div>
                    {message.senderName === username && (
                      <div className='avatar self'>
                        <img
                          className='rounded-circle'
                          src={message.senderPhoto}
                          alt=''
                        />
                        {/* {message.senderPhoto} */}
                      </div>
                    )}
                    <div className='message-time'>
                      {formatDate(message.timestamp)}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default MessageChat;
