import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-3 fixed-bottom">
      <Navbar>
        <Container className="d-flex justify-content-between">
          <span>Made by Dursun Melih Omac</span>
          <a
            href="https://github.com/Melihomac"
            target="_blank" // Yeni sekmede açar
            rel="noopener noreferrer" // Güvenlik için (yeni sekmeye giderken)
            className="navbar-brand text-white">
            For Github Link Click Here
          </a>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
