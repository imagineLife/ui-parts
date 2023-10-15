import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './card-calc-size.scss';

function CardCalcSize(props) {
  return (
    // <div {...props} className="card">
    //   {props.content}
    // </div>
    // <div {...props} style={{border: '1px solid green'}}>
    <Card className="card-stats card" {...props}>
      {/* {...props} */}
      <Card.Body>
        <Row>
          <Col xs="5">
            <div className="icon-big text-center">
              {props.bigImageClass && (
                <i className={`nc-icon ${props.bigImageClass} text-${props.imageColor}`}></i>
              )}
            </div>
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">{props.title}</p>
              <Card.Title as="h4">{props.value}</Card.Title>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    // </div>
  );
}

export default CardCalcSize