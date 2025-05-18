import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

function UserDashboard() {
  const [form, setForm] = useState({ category: '', description: '' });
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/complaints', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTicketId(res.data.ticketId);
      setForm({ category: '', description: '' });
      fetchComplaints();
    } catch (err) {
      setError(err.response?.data.message || 'Submission failed');
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/complaints/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setComplaints(res.data);
    } catch (err) {
      setError(err.response?.data.message || 'Failed to fetch complaints');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">User Dashboard</h2>
      <Card className="p-4 shadow mb-5">
        <h4>Submit Complaint</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="Health">Health</option>
              <option value="Transport">Transport</option>
              <option value="Education">Education</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        {ticketId && <Alert variant="success" className="mt-3">Complaint submitted! Ticket ID: {ticketId}</Alert>}
      </Card>
      <h4 className="mt-5">Your Complaints</h4>
      <Table striped bordered hover className="shadow-sm">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Category</th>
            <th>Status</th>
            <th>Agency</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => (
            <tr key={c._id}>
              <td>{c.ticketId}</td>
              <td>{c.category}</td>
              <td>{c.status}</td>
              <td>{c.agency}</td>
              <td>{c.response || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UserDashboard;