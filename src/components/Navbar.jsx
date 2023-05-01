import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track whether user is logged in

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {/* Render "Add Event" link only if user is logged in */}
            {isLoggedIn && (
              <Nav.Link href="/add-event">Add Event</Nav.Link>
            )}
            {/* Render login/register or logout button based on whether user is logged in */}
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign up</Nav.Link>
                <Nav.Link href="/regForm">Event Reg Form</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
