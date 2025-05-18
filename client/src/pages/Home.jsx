import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container fluid className="my-5 text-center bg-primary text-white py-5">
      <h1 className="display-4 fw-bold">Welcome to CCAES</h1>
      <p className="lead">Submit and track complaints about public services with ease.</p>
      <Link to="/signup">
        <Button variant="light" size="lg" className="mt-3">Get Started</Button>
      </Link>
    </Container>
  );
}

export default Home;