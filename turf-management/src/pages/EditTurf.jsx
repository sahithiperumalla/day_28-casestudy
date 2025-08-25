import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import { getTurfs, updateTurf } from '../services/ApiService';
import { Container, Form, Button } from 'react-bootstrap';

const EditTurf = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turf, setTurf] = useState({
    title: '',
    location: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurf = async () => {
      const res = await getTurfs();
      const turfToEdit = res.data.find(t => t.id === parseInt(id));
      if (turfToEdit) {
        setTurf(turfToEdit);
      }
      setLoading(false);
    };
    fetchTurf();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurf(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTurf(id, {
      ...turf,
      price: Number(turf.price)
    });
    alert('Turf updated successfully');
    navigate('/manage-turfs');
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <Container className="mt-5">Loading...</Container>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <Container className="mt-4" style={{ maxWidth: '600px' }}>
        <h2>Edit Turf</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={turf.title} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" value={turf.location} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={turf.price} onChange={handleChange} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={turf.description} onChange={handleChange} required/>
          </Form.Group>
          <Button type="submit">Update Turf</Button>
        </Form>
      </Container>
    </>
  );
};

export default EditTurf;
