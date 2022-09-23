import React from 'react';
import { Container , Row } from 'react-bootstrap';
import './Slides.css';

function Slides() {

    return(
      <>
      <div className="container slides">
        {/* carousel */}
        <div id="petcarousel" className="carousel slide" data-bs-ride="carousel">

          <div className="carousel-inner">

            <div className="carousel-item active">
              <img className="d-block w-100 petSlide" src="/Pics/slide2.jpg"  alt="slide"/>
            </div>

            <div className="carousel-item">
              <img className="d-block w-100 petSlide" src="/Pics/slide3.jpg" alt="slide"/>
            </div>

            <div className="carousel-item">
              <img className="d-block w-100 petSlide" src="/Pics/slide4.jpg" alt="slide"/>
            </div>

            <div className="carousel-item">
              <img className="d-block w-100 petSlide" src="/Pics/slide6.jpg" alt="slide"/>
            </div>

            <div className="carousel-item">
              <img className="d-block w-100 petSlide" src="/Pics/slide7.jpg" alt="slide"/>
            </div>


            <div className="carousel-item">
              <img className="d-block w-100 petSlide" src="/Pics/slide9.jpg" alt="slide"/>
            </div>

          </div>
        </div>
      </div>
      </>
  )
}

export default Slides;
