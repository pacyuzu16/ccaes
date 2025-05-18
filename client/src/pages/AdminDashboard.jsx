import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [form, setForm] = useState({ status: '', response: '' });
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '' });

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/complaints', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateComplaint = async () => {
    try {
      await axios.put(`http://localhost:5000/api/complaints/${selectedComplaint._id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setShowModal(false);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      const updateData = {};
      if (userForm.name) updateData.name = userForm.name;
      if (userForm.email) updateData.email = userForm.email;
      if (userForm.password) updateData.password = userForm.password;
      await axios.put(`http://localhost:5000/api/users/${userId}`, updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
      setUserForm({ name: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchUsers();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Tabs defaultActiveKey="complaints" id="admin-tabs" className="mb-4">
        <Tab eventKey="complaints" title="Complaints">
          <Table striped bordered hover className="shadow-sm">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Status</th>
                <th>Agency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c._id}>
                  <td>{c.ticketId}</td>
                  <td>{c.userId.name}</td>
                  <td>{c.category}</td>
                  <td>{c.status}</td>
                  <td>{c.agency}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => {
                        setSelectedComplaint(c);
                        setForm({ status: c.status, response: c.response || '' });
                        setShowModal(true);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="users" title="Users">
          <Table striped bordered hover className="shadow-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder={u.name}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      placeholder={u.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    />
                  </td>
                  <td>{u.role}</td>
                  <td>
                    <Form className="d-flex align-items-center">
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        className="me-2"
                      />
                      <Button variant="primary" onClick={() => handleUpdateUser(u._id)}>Update</Button>
                      <Button variant="danger" className="ms-2" onClick={() => handleDeleteUser(u._id)}>Delete</Button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Submitted">Submitted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="response">
              <Form.Label>Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={form.response}
                onChange={(e) => setForm({ ...form, response: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateComplaint}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminDashboard;