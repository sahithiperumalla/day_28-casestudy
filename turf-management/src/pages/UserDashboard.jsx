import React, { useState, useEffect } from 'react';
import UserNavbar from '../components/UserNavbar';
import TurfCard from '../components/TurfCard';
import { getTurfs, addToCart } from '../services/ApiService';
import { Container, Row, Col } from 'react-bootstrap';

const UserDashboard = () => {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    const res = await getTurfs();
    setTurfs(res.data);
  };

  const handleAddToCart = async (turf) => {
    await addToCart({ turfId: turf.id, quantity: 1 }); 
    alert(`${turf.title} added to cart!`);
  };

  return (
    <>
      <UserNavbar />
      <Container className="mt-4">
        <h2>Browse Turfs</h2>
        <Row>
          {turfs.map(turf => (
            <Col key={turf.id} md={4}>
              <TurfCard 
                turf={turf} 
                isAdmin={false} 
                onAddToCart={handleAddToCart} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
