import React from 'react';
import { Button, Card, Image, Col, Row } from 'react-bootstrap';

function SingleReview({ review }) {
  return (
    <Card className="mb-5">
      <Card.Header as="h5">
        <Row>
          <Col xs={9}>
            <Card.Title align="start" style={{"paddingTop": "15px"}}>{review.reviewTitle}</Card.Title>
          </Col>
          <Col>
          <Image src={review.userPhoto} roundedCircle width="40"/>
            <Card.Text style={{fontSize: '15px'}}>
              {review.firstName} {review.lastName}
            </Card.Text>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text align="start">
          {review.reviewDescription}
        </Card.Text>
        <Button variant="Light">☺</Button>
      </Card.Body>
    </Card>
  );
}

export default SingleReview;