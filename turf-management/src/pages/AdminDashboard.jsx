import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import TurfCard from '../components/TurfCard';
import { getTurfs, deleteTurf } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

const AdminDashboard = () => {
  const [turfs, setTurfs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTurf, setEditTurf] = useState(null);
  const navigate = useNavigate();

  const fetchTurfs = async () => {
    const res = await getTurfs();
    setTurfs(res.data);
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure to delete?')) {
      await deleteTurf(id);
      fetchTurfs();
    }
  };

  const handleEdit = (turf) => {
    navigate(`/edit-turf/${turf.id}`);
  };

  return (
    <>
      <AdminNavbar />
      <Container className="mt-4">
        <h2>Manage Turfs</h2>
        <Button className="mb-3" onClick={() => navigate('/add-turf')}>
          Add New Turf
        </Button>
        <Row>
          {turfs.map(turf => (
            <Col key={turf.id} md={4}>
              <TurfCard 
                turf={turf} 
                isAdmin={true} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
