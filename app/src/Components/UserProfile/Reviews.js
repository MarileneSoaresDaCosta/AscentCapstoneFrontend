import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import SingleReview from './SingleReview';
import ReviewSummary from './ReviewSummary';
import {orgReviews} from './DummyData';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingPercentage, setRatingPercentage] = useState([0,0,0,0,0]);
  const [ratingCount, setRatingCount] = useState([0,0,0,0,0]);

  useEffect(() => {
    setReviews(orgReviews);
    calculateAvgRating();
    calculateRatingPercent();
  },[reviews, avgRating])

  function calculateAvgRating() {
    if(reviews !== []) {
      let totalScore = 0;
      reviews.forEach(review => {
        totalScore += review.reviewScore;
      })
      setAvgRating(totalScore/reviews.length)
    }
  }

  function calculateRatingPercent() {
    if(reviews !== []) {
      let ratingPercentArray = [0,0,0,0,0];
      let ratingCountArray = [0,0,0,0,0];
      for(let i = 0; i < ratingPercentArray.length; i++) {
        let count = 0;
        reviews.forEach(review => {
          if (review.reviewScore === i + 1) {
            count ++;
          }
        })
        ratingCountArray[i] = count;
        ratingPercentArray[i] = Math.floor((count/reviews.length) * 100);
      }
      setRatingPercentage(ratingPercentArray);
      setRatingCount(ratingCountArray);
    }
  }
  return (
    <Container>
      <Row>
        <Col xs={4}>
          <ReviewSummary avgRating={avgRating} ratingPercentage={ratingPercentage} ratingCount={ratingCount}/>
        </Col>
        <Col xs={8}>
          <div className="overflow-auto" style={{height: 500}}>
            {
              reviews.map((review) => {
                return <SingleReview review={review} key={review.firstName}/>
              })
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews;