import React from 'react'
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';

import Navbar from 'react-bootstrap/Navbar';
function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </>


        
    
  )
}

export default Navigation