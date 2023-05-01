import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import LogoutBtn from "./LogoutBtn";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../auth/AuthContext";

function Navigation() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {isLoggedIn ? (
              <Nav.Link>
                <LogoutBtn></LogoutBtn>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
