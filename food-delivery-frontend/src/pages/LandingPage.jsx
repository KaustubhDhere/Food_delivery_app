import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import backgroundImage from "../images/main-background-image.avif";
import mobileImage from "../images/mobile-image.avif";
import orderOnline from "../images/ordering.avif";
import dining from "../images/dining.avif";
import liveEvents from "../images/event.jpeg";

function LandingPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        marginTop: "3%",
      }}
    >
      {/* Dark Overlay for Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundColor: "rgba(0,0,0,0.6)",
        }}
      ></div>

      {/* Header & Search Section */}
      <Container className="text-center position-relative" style={{ paddingTop: "125px", zIndex: 1 }}>
        <h1 className="fw-bold text-white">Discover the Best Food & Drinks</h1>
        <p className="text-white">Find amazing restaurants, order food online, and enjoy exclusive deals.</p>    
      </Container>

      {/* Features Section */}
      <Container className="text-center py-5 position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={3} className="mb-4">
            <div className="hover-effect">
              <img src={orderOnline} alt="Order Online" className="img-fluid rounded feature-image"  />
            </div>
            <h5 className="mt-3 text-white">Order Online</h5>
            <p className="text-white">Get food delivered to your doorstep.</p>
          </Col>
          <Col md={3} className="mb-4">
            <div className="hover-effect">
              <img src={dining} alt="Dining" className="img-fluid rounded feature-image"  />
            </div>
            <h5 className="mt-3 text-white">Dining</h5>
            <p className="text-white">Experience fine dining at the best restaurants.</p>
          </Col>
          <Col md={3} className="mb-4">
            <div className="hover-effect">
              <img src={liveEvents} alt="Live Events" className="img-fluid rounded feature-image"  />
            </div>
            <h5 className="mt-3 text-white">Live Events</h5>
            <p className="text-white">Discover amazing food festivals and concerts.</p>
          </Col>
        </Row>
      </Container>

      {/* App Download Section */}
      <div className="app-download-section py-5 text-dark" style={{ backgroundColor: "#fff", zIndex: 2 }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <img
                src={mobileImage}
                alt="App Preview"
                className="img-fluid"
              />
            </Col>
            <Col md={6}>
              <h2>Get Our Food Delivery App</h2>
              <p>We will send you a link, open it on your phone to download the app.</p>

              <Form>
                <Form.Check inline label="Email" name="contactMethod" type="radio" defaultChecked />
                <Form.Check inline label="Phone" name="contactMethod" type="radio" />
                <div className="d-flex mt-3">
                  <Form.Control type="text" placeholder="Enter email or phone" />
                  <Button variant="danger" className="ms-2">Send Link</Button>
                </div>
              </Form>

              <h5 className="mt-4">Download app from</h5>
              <div className="d-flex">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width="150" className="me-2" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;
