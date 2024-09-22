import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Welcome to the Flight Case App</h1>
          <p className="text-center mb-4">
            Welcome to my Flight App project. This project was made upon
            request. Made by Melih Omac. Click signin or signup and create a
            profile then search for flights
          </p>
          <div className="d-flex">
            {!userInfo && (
              <LinkContainer to="/login">
                <Button variant="primary" className="me-3">
                  Sign In
                </Button>
              </LinkContainer>
            )}
            <LinkContainer to="/flights">
              <Button variant="primary" className="me-3">
                Search for Flights
              </Button>
            </LinkContainer>
            {!userInfo && (
              <LinkContainer to="/register">
                <Button variant="secondary">Sign Up</Button>
              </LinkContainer>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
