import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

function NavbarComponent() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
}

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MERN Shop
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/admin">
                  Dashboard
                </Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
