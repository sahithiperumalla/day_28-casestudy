import React from 'react';
import UserNavbar from '../components/UserNavbar';
import { getCart, addBooking, deleteCartItem } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Checkout = () => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const cartRes = await getCart();
    const cartItems = cartRes.data;
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    for (const item of cartItems) {
      await addBooking({
        turfId: item.turf.id,
        quantity: item.quantity,
        userId: JSON.parse(localStorage.getItem('user')).id,
      });
      await deleteCartItem(item.id);
    }
    alert('Booking successful!');
    navigate('/user-dashboard');
  };

  return (
    <>
      <UserNavbar />
      <Container className="mt-4 text-center">
        <h2>Checkout</h2>
        <p>Click the button below to confirm your booking.</p>
        <Button onClick={handleCheckout}>Confirm Booking</Button>
      </Container>
    </>
  );
};

export default Checkout;
