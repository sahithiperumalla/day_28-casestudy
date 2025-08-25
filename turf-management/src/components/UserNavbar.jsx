import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="/user-dashboard">User Dashboard</Navbar.Brand>
        <Nav>
          <Nav.Link href="/browse-turfs">Browse Turfs</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
          <Nav.Link href="/checkout">Checkout</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
