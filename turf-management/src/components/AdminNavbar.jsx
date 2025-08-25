import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="/admin-dashboard">Admin Dashboard</Navbar.Brand>
        <Nav>
          <Nav.Link href="/admin-dashboard">Home</Nav.Link>
          <Nav.Link href="/manage-turfs">Manage Turfs</Nav.Link>
          <Nav.Link href="/view-bookings">View Bookings</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
