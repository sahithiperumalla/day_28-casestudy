import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Password required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await getUserByEmailAndPassword(values.email, values.password);
        const users = res.data;
        if (users.length === 1) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          if (users.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        } else {
          setFieldError('email', 'Invalid credentials');
          setFieldError('password', 'Invalid credentials');
        }
      } catch (err) {
        setFieldError('email', 'Login failed');
      }
      setSubmitting(false);
    },
  });

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            {...formik.getFieldProps('email')}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...formik.getFieldProps('password')}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" disabled={formik.isSubmitting}>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
