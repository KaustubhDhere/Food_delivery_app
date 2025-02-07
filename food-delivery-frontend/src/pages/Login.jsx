import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import signIn from "../images/signIn.jpg";
import signupImage from "../images/signup.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSignup(false);

    try {
      await login(credentials);
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      setError(err);
      setShowSignup(true); // Show Signup option if login fails
    }
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <img
            src={signIn}
            className="img-fluid"
            alt="Login"
          />
        </Col>

        <Col md={6}>
          <div className="text-center mb-4">
            <p className="lead fw-normal">Sign in with</p>
            <Button variant="outline-primary" className="me-2">
              <FaFacebookF />
            </Button>
            <Button variant="outline-info" className="me-2">
              <FaTwitter />
            </Button>
            <Button variant="outline-primary">
              <FaLinkedinIn />
            </Button>
          </div>

          <div className="divider d-flex align-items-center my-3">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email address" value={credentials.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" name="password" value={credentials.password} onChange={handleChange} required />
            </Form.Group>


            <div className="d-flex justify-content-center mb-3">
              <Button variant="primary" size="md" className="w-80" style={{ width: "400px", height: "40px" }} type="submit">
                Login
              </Button>
            </div>
            <div className="d-flex justify-content-evenly mb-3 align-items-center">
              <Alert variant="info" className="d-flex align-items-center">
                <img src={signupImage} alt="Signup" className="me-5" style={{ width: "40px", height: "20px" }} />
                <strong>New user?</strong> You can{" "}
                <Button variant="link" onClick={() => navigate("/signup")}>
                  Signup here
                </Button>
              </Alert>
            </div>


          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
