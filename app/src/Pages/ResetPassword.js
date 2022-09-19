import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "../Components/UserProfile/User";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";
import emailjs from '@emailjs/browser';
import { EMAIL_ID } from "../config.js";
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [resetUrl, setResetUrl] = useState("");

  const secretKey = "psb123"

  const testUser = "test2"

  let encodedString = btoa(EMAIL_ID.SECRET_KEY + " " + testUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    doGetUser();
  };

  const resetUserNotExistAlert = () => {
    Swal.fire({
      title: 'ERROR',
      text: 'User does not exist.',
    })
  }

  const doGetUser = () => {
    axios.get(`${PSB_API_URL}/api/public/user/${username}`).then((res) => {
        //build the reset URL route
        if (res.status === 200) {
          sendEmail(`http://localhost:3000/user/reset/${btoa(username + " " + EMAIL_ID.SECRET_KEY)}`, res.data.email);
        } else if (res.status === 204) {
          resetUserNotExistAlert();
        }
    }).catch((error) => console.log(error))
  };

  const sendEmail = (resetUrl, email) => {
    const templateParams = {
      resetUrl: resetUrl,
      email: email,
    };
    emailjs
      .send(
        EMAIL_ID.SERVICE_ID,
        EMAIL_ID.TEMPLATE_ID,
        templateParams,
        EMAIL_ID.USER_ID
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  };

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Row>
          <h1 style={{paddingBottom: 50, paddingTop: 50}}>Trouble Logging In?</h1>
          <div className="Auth-form-container">
          <Form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
            <div className="text-center">Enter your username and we'll send you a link to get back into your account.</div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g psb"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button variant="outline-dark" type="submit">
                  Submit
                </Button>
              </div>
              <div className="text-center mt-3">
                Back to <Link to="/login">Login</Link>
              </div>
            </div>
          </Form>
          </div>
        </Row>
        <Row></Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
