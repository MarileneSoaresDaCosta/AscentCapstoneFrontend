import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

const Contact = ({ contact, setCurrentContact, notificationList, setNotificationList, username, currentContact }) => {
  const markAsRead = (username) => {
    axios.patch(`http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${contact}/${username}`)
      // axios.patch(`http://localhost:8080/messages/notifications/${contact}/${username}`)
      .then((response) => {

        setNotificationList(notificationList.filter((value) => { return value !== contact }));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let listItem;
  currentContact === contact ?
  listItem =
  <ListGroup.Item active
    style={{
      color: notificationList && notificationList.includes(contact) ? 'red' : 'black',
    }}
    onClick={() => { setCurrentContact(contact); markAsRead(username); }}>
    {contact}
  </ListGroup.Item> :
  listItem =
  <ListGroup.Item
    style={{
      color: notificationList && notificationList.includes(contact) ? 'red' : 'black',
    }}
    onClick={() => { setCurrentContact(contact); markAsRead(username); }}>
    {contact}
  </ListGroup.Item>

  return (
    listItem
  )
}

export default Contact;