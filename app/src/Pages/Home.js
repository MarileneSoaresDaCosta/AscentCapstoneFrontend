import React from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Footer from '../Components/Default/Footer'
import { Container , Row } from 'react-bootstrap';
import User from '../Components/UserProfile/User';
import Search from '../Components/Search/Search';


function Home() {
  return(
    <>
     <Container>
       < Header/>
     </Container>
    < Navigationbar/>
    <Container >
      <Row>
        {/* <h1>hello from home</h1> */}
        <Search/>
        {/* <User /> */}
      </Row>
      <Row >
        < Footer />
      </Row>
    </Container>
    </>
  )
}

export default Home;
