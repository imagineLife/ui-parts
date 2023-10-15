import React from 'react';
import {
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import './../../styles/card.scss';

function imageClassFromString(str) {
  if (str === 'refresh') return 'fa-redo';
  if (str === 'calendar') return 'fa-calendar-alt';
  if (str === 'pokeball') return 'nc-chart';
  if (str === 'flashlight') return 'nc-light-3';
  if (str == 'vector') return 'nc-vector';
  if (str === 'heart') return 'nc-favourite-28';
}

function CardSmall({ title, value, image, imageColor, footerText, footerImage, ...otherProps }) {
  const bigImageClass = !image ? null : imageClassFromString(image);
  const footerImageClass = !footerImage ? null : imageClassFromString(footerImage);
  return (
    <Col lg="3" sm="6" {...otherProps}>
      <Card className="card-stats">
        <Card.Body>
          <Row>
            <Col xs="5">
              <div className="icon-big text-center">
                {bigImageClass && <i className={`nc-icon ${bigImageClass} text-${imageColor}`}></i>}
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">{title}</p>
                <Card.Title as="h4">{value}</Card.Title>
              </div>
            </Col>
          </Row>
        </Card.Body>
        {footerText && (
          <Card.Footer>
            <hr></hr>
            <div className="stats">
              {footerImageClass && <i className={`fas ${footerImageClass} mr-1`}></i>}
              {footerText}
            </div>
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
}

export default CardSmall