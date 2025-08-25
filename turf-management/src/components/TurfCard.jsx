import React from 'react';
import { Card, Button } from 'react-bootstrap';

const TurfCard = ({ turf, onEdit, onDelete, onAddToCart, isAdmin }) => {
  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{turf.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{turf.location}</Card.Subtitle>
        <Card.Text>{turf.description}</Card.Text>
        <Card.Text><strong>Price:</strong> ₹{turf.price}</Card.Text>
        {isAdmin ? (
          <>
            <Button variant="primary" className="m-1" onClick={() => onEdit(turf)}>Edit</Button>
            <Button variant="danger" className="m-1" onClick={() => onDelete(turf.id)}>Delete</Button>
          </>
        ) : (
          <Button variant="success" onClick={() => onAddToCart(turf)}>Add to Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default TurfCard;
