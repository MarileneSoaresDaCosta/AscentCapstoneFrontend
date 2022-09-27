import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUser, getBearerToken } from "../UserProfile/psb-exports"
import axios from 'axios'
import { AiFillMessage } from 'react-icons/ai';
import { useLocation } from "react-router-dom";
import "./Navbar.css";

function Navigationbar() {
  const isLoggedIn = () => {
    if (getUser() === "" || getUser() === null) {
      return false;
    } else {
      return true;
    }
  };

  const username = getUser();
  const [notification, setNotification] = useState(false);
  const location = useLocation();

  if (username && location.pathname !== '/messages') {
    useEffect(() => {
      const id = setInterval(() =>
        axios
          .get(
            `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${username}`, {
              headers: { Authorization: getBearerToken() }
            })
          .then((response) => {
            setNotification(response.data.length ? true : false);
          })
          .catch((err) => {
            console.log(err);
          }), 5000);
      return () => clearInterval(id);
    }, []);
  }
  return (
    <Navbar  className="navBar" id="nav-bar">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav id="customNav" className="me-auto">
            {isLoggedIn() ? <Nav.Link href="/myprofile" style={{color: "white"}}>MyProfile</Nav.Link> : null}
            {isLoggedIn() ? <Nav.Link href={`/petlist/${getUser()}`} style={{color: "white"}}>My Pets</Nav.Link> : null}
            <Nav.Link href="/messages" style={{color: "white"}}>Messages</Nav.Link>
            {notification ? <AiFillMessage size={20} color={'FF9966'} /> : null}
            <Nav.Link href="/directory" style={{color: "white"}}>Directory</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
