import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Turf Management System</h1>
      <Button className="m-2" onClick={() => navigate('/login')}>Login</Button>
      <Button className="m-2" onClick={() => navigate('/register')}>Register</Button>
    </Container>
  );
};

export default Welcome;
