import React, { useState, useEffect, useRef } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import MessageChat from './MessageChat';
import ContactsList from './ContactsList';
import InputBar from './InputBar';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import audio from './static/bark.wav';
import './css/MessagingApp.css';
import {
  getUser,
  PSB_API_URL,
  getBearerToken,
} from '../UserProfile/psb-exports';
import { GrStatusPlaceholder } from 'react-icons/gr';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AntSwitch from './mui/AntSwitch';

var stompClient = null;
const MessagingApp = () => {
  const { state } = useLocation();

  const privateChatsRef = useRef(new Map());
  const senderPhotoRef = useRef(
    'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png'
  );
  const receiverPhotoRef = useRef(
    'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png'
  );
  const newConversationReceiverName = useRef(state ? state.receiverName : '');
  const emailRef = useRef('');
  const messageIdRef = useRef('');

  const [userData, setUserData] = useState({
    username: getUser(),
    receiverName: state ? state.receiverName : '',
    connected: false,
    message: '',
    senderPhoto: senderPhotoRef.current,
    receiverPhoto: receiverPhotoRef.current,
  });
  const [privateChats, setPrivateChats] = useState(privateChatsRef.current);
  const [currentContact, setCurrentContact] = useState(
    state ? state.receiverName : ''
  );
  const [notificationList, setNotificationList] = useState([]);

  const [messageSound, setMessageSound] = useState(
    localStorage.getItem('notificationSound') || 'true'
  );
  if (localStorage.getItem('notificationSound') === null) {
    localStorage.setItem('notificationSound', 'true');
  }
  const [receiveEmails, setReceiveEmails] = useState(false);

  useEffect(() => {
    if (!privateChats.get(userData.receiverName)) {
      privateChatsRef.current.set(userData.receiverName, []);
    }
  }, [state]);

  useEffect(() => {
    if (userData.username) {
      getAllChats(userData.username);
      getAllNotifications(userData.username);
      axios
        .get(`${PSB_API_URL}/api/public/user/${userData.username}`)
        .then((response) => {
          if (response.data.userPhoto !== null) {
            senderPhotoRef.current = response.data.userPhoto;
            setUserData({ ...userData, senderPhoto: senderPhotoRef.current });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getEmailNotificationsStatus(userData.username);
    }
  }, [userData.username]);

  useEffect(() => {
    if (currentContact) {
      axios
        .get(`${PSB_API_URL}/api/public/user/${currentContact}`)
        .then((response) => {
          if (response.data.userPhoto !== null) {
            receiverPhotoRef.current = response.data.userPhoto;
            setUserData({
              ...userData,
              receiverPhoto: receiverPhotoRef.current,
            });
          } else {
            receiverPhotoRef.current =
              'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png';
            setUserData({
              ...userData,
              receiverPhoto: receiverPhotoRef.current,
            });
          }
          emailRef.current = response.data.email;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentContact]);

  useEffect(() => {
    if (newConversationReceiverName.current) {
      axios
        .get(
          `${PSB_API_URL}/api/public/user/${newConversationReceiverName.current}`
        )
        .then((response) => {
          if (response.data.userPhoto !== null) {
            receiverPhotoRef.current = response.data.userPhoto;
            setUserData({
              ...userData,
              receiverPhoto: receiverPhotoRef.current,
            });
          }
          emailRef.current = response.data.email;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (userData.username) {
      let Sock = new SockJS(
        'http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/ws'
        // 'http://localhost:8080/ws'
      );
      stompClient = over(Sock);
      stompClient.debug = () => {};
      stompClient.connect({}, onConnected, onError);
    }
  }, []);

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessageReceived
    );
  };

  const getAllChats = (username) => {
    axios
      .get(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/${username}`,
        {
          // `http://localhost:8080/messages/${username}`, {
          headers: { Authorization: getBearerToken() },
        }
      )
      .then((response) => {
        setPrivateChats(new Map(Object.entries(response.data)));
        privateChatsRef.current = new Map(Object.entries(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllNotifications = (username) => {
    axios
      .get(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${username}`,
        {
          // `http://localhost:8080/messages/notifications/${username}`, {
          headers: { Authorization: getBearerToken() },
        }
      )
      .then((response) => {
        setNotificationList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmailNotificationsStatus = (username) => {
    axios
      .get(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/emailnotifications/${username}`,
        {
          // `http://localhost:8080/messages/emailnotifications/${userData.username}`, {
          headers: { Authorization: getBearerToken() },
        }
      )
      .then((response) => {
        setReceiveEmails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleName = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleMessage = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setUserData({ ...userData, message: value });
  };

  const handleSend = (event) => {
    event.preventDefault();
    sendPrivateMessage();
  };

  const onPrivateMessageReceived = (payload) => {
    getAllNotifications(userData.username);
    let payloadData = JSON.parse(payload.body);
    if (messageIdRef.current !== payloadData.id) {
      if (privateChatsRef.current.get(payloadData.senderName)) {
        privateChatsRef.current.get(payloadData.senderName).push(payloadData);
        setPrivateChats(new Map(privateChatsRef.current));
      } else {
        let list = [];
        list.push(payloadData);
        privateChatsRef.current.set(payloadData.senderName, list);
        setPrivateChats(new Map(privateChatsRef.current));
      }
      playAudio();
      messageIdRef.current = payloadData.id;
    }
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: currentContact ? currentContact : userData.receiverName,
        message: userData.message,
        timestamp: Date().toString(),
        senderPhoto: senderPhotoRef.current,
        receiverPhoto: receiverPhotoRef.current,
        email: emailRef.current,
      };
      if (!privateChatsRef.current.get(chatMessage.receiverName)) {
        privateChatsRef.current.set(chatMessage.receiverName, []);
      }
      privateChatsRef.current.get(chatMessage.receiverName).push(chatMessage);
      setPrivateChats(new Map(privateChatsRef.current));
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const playAudio = () => {
    if (localStorage.getItem('notificationSound') === 'true') {
      new Audio(audio).play();
    }
  };

  const updateMessageSound = () => {
    if (messageSound === 'true') {
      setMessageSound('false');
    } else {
      setMessageSound('true');
    }

    if (localStorage.getItem('notificationSound') === 'true') {
      localStorage.setItem('notificationSound', 'false');
    } else {
      localStorage.setItem('notificationSound', 'true');
    }
  };

  const updateReceiveEmails = () => {
    axios
      .patch(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/emailnotifications/${
          userData.username
        }/${!receiveEmails}`,
        {},
        {
          // `http://localhost:8080/messages/emailnotifications/${userData.username}/${!receiveEmails}`, {}, {
          headers: { Authorization: getBearerToken() },
        }
      )
      .then((response) => {
        if (receiveEmails) {
          setReceiveEmails(false);
        } else {
          setReceiveEmails(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className='messagingApp'>
      <Container>
        <Row>
          <Col sm={4}>
            <ContactsList
              username={userData.username}
              privateChats={privateChats}
              setCurrentContact={setCurrentContact}
              setUserData={setUserData}
              notificationList={notificationList}
              setNotificationList={setNotificationList}
              currentContact={currentContact}
            />
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='center'
            >
              <div>Unmute</div>
              <AntSwitch
                checked={messageSound === 'true' ? false : true}
                inputProps={{ 'aria-label': 'ant design' }}
                onClick={() => updateMessageSound()}
              />
              <div>Mute&nbsp;&nbsp;&nbsp;</div>
            </Stack>

            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='center'
            >
              <div>Stop Emails</div>
              <AntSwitch
                checked={receiveEmails}
                inputProps={{ 'aria-label': 'ant design' }}
                onClick={() => updateReceiveEmails()}
              />
              <div>Get Emails</div>
            </Stack>
          </Col>
          {currentContact === '' ? (
            <Col sm={8}>
              <Container className='initialChatBox'>
                <div>
                  Click an existing contact to the left
                  <br /> or <br />
                  Message a new contact through the Pets page
                </div>
              </Container>
            </Col>
          ) : (
            <Col sm={8}>
              <Container className='chatBox'>
                <MessageChat
                  privateChats={privateChats}
                  currentContact={currentContact}
                  username={userData.username}
                  receiverName={
                    currentContact === ''
                      ? userData.receiverName
                      : currentContact
                  }
                />
                {currentContact ? (
                  <InputBar
                    setUserData={setUserData}
                    userData={userData}
                    handleSend={handleSend}
                    handleMessage={handleMessage}
                    currentContact={currentContact}
                  />
                ) : (
                  userData.receiverName && (
                    <InputBar
                      setUserData={setUserData}
                      userData={userData}
                      handleSend={handleSend}
                      handleMessage={handleMessage}
                      currentContact={currentContact}
                    />
                  )
                )}
              </Container>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MessagingApp;
