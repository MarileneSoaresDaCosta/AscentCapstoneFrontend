import React from 'react';
import Contact from './Contact';
import './css/ContactsList.css';

const ContactsList = ({
  privateChats,
  currentContact,
  setCurrentContact,
  notificationList,
  username,
  setNotificationList,
}) => {
  let contactsSortedByRecentMessage = [...privateChats]
    .sort(([k, v], [k2, v2]) => {
      if (
        new Date(v[v.length - 1].timestamp) >
        new Date(v2[v2.length - 1].timestamp)
      ) {
        return -1;
      }
      if (
        new Date(v[v.length - 1].timestamp) <
        new Date(v2[v2.length - 1].timestamp)
      ) {
        return 1;
      }
      return 0;
    })
    .map((name) => {
      return name[0];
    });

  let currentList = contactsSortedByRecentMessage.map((contact) => {
    if (
      contact &&
      privateChats.get(contact)[privateChats.get(contact).length - 1]
    ) {
      let recentChat =
        privateChats.get(contact)[privateChats.get(contact).length - 1];
      let photo =
        username === recentChat['senderName']
          ? recentChat['receiverPhoto']
          : recentChat['senderPhoto'];
      return (
        <Contact
          key={contact}
          photo={photo}
          contact={contact}
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
          notificationList={notificationList}
          setNotificationList={setNotificationList}
          username={username}
        />
      );
    }
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {privateChats.keys().length === 0 ? (
        <div>Message someone to add contacts.</div>
      ) : (
        <div className='contact-list'>
          <div className='list-title'>Contact List</div>
          <ul className='list'>{currentList}</ul>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
