import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import food_delivery_image from "../images/food_delivery_image.jpg"

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await signup(user);
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data || "Signup failed! Please try again."); //  Extract message properly
    }
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row className="align-items-center justify-content-between">
        <Col md={4} className="text-center">
          <img
            src={food_delivery_image}
            className="img-fluid"
            alt="Signup"
          />
        </Col>

        <Col md={6}>
          <h3 className="text-center mb-4">Create an Account</h3>

          {error && <Alert variant="danger">{typeof error === "string" ? error : "Something went wrong!"}</Alert>} {/*  Fix here */}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email address" name="email" value={user.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" name="password" value={user.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="success" size="lg" className="w-100" type="submit">
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
