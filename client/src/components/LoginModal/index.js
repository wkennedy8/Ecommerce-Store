import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const LoginModal = (props) => {
  const { setCurrentUser } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email: e.target.email.value,
        password: e.target.password.value
      });
      setCurrentUser(data.user);
      sessionStorage.setItem('token', data.token);
      props.onHide();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Login</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
