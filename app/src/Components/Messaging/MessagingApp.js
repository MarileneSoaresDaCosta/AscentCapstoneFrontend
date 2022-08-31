import React, {useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import MessageChat from './MessageChat';
import ContactsList from './ContactsList';

// triggers everything on click on message button
// send initial get request to server to retreive contacts
// at connection, change your status to active
// subscribe to your own channel to accept
// at close, change your status to inactive

// message contains sender name, receiver name, id, message, status

const MessagingApp = () => {
  var stompClient = null;

  const [userData, setUserData] = useState({
    username: "Test",
    connected: false,
  })

  const onLanding = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    // get request for all contacts for this user
    // pass down to contacts list
  }

  const onConnected = () => {
    setUserData({...userData, "connected": true});
    stompClient.subscribe('/user/' + userData.username + '/private', MessageChat.onPrivateMessageReceived);
  }

  const onError = (err) => {
    console.log(err);
  }

  return(
    <>
      <div>Hello World</div>
      <button onClick={onLanding}></button>
      <ContactsList />
      <MessageChat />
    </>
  )
}

export default MessagingApp;