import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import MessagingApp from '../Components/Messaging/MessagingApp';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Messages() {
  return (
    <>
    <Container>
      <Header/>
    </Container>
    <Navigationbar/>
    <Container>
      <Row className="justify-content-md-center" style={{"padding-top": "50px"}}>
        <MessagingApp/>
      </Row>
    </Container>
  </>
  )
}

export default Messages;