import React, { useState, useEffect } from 'react';
import UserNavbar from '../components/UserNavbar';
import { getCart, updateCartItem, deleteCartItem } from '../services/ApiService';
import { Container, Table, Button, Form } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await getCart();
    setCartItems(res.data);
  };

  const handleQuantityChange = async (item, qty) => {
    if (qty < 1) return;
    await updateCartItem(item.id, { ...item, quantity: qty });
    fetchCart();
  };

  const handleRemove = async (id) => {
    await deleteCartItem(id);
    fetchCart();
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.turf.price, 0);

  return (
    <>
      <UserNavbar />
      <Container className="mt-4">
        <h2>Your Cart</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Turf</th>
              <th>Location</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.turf.title}</td>
                <td>{item.turf.location}</td>
                <td>₹{item.turf.price}</td>
                <td>
                  <Form.Control 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item, Number(e.target.value))} 
                    style={{width: '70px'}} 
                  />
                </td>
                <td>₹{item.quantity * item.turf.price}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
                </td>
              </tr>
            ))}
            {cartItems.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">Cart is empty</td>
              </tr>
            )}
          </tbody>
          {cartItems.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end"><strong>Total</strong></td>
                <td colSpan="2"><strong>₹{total}</strong></td>
              </tr>
            </tfoot>
          )}
        </Table>
      </Container>
    </>
  );
};

export default Cart;
