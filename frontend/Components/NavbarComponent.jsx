import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" fixed="top" className="premium-navbar">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="brand-logo d-flex align-items-center gap-2"
          >
            <div className="logo-icon-wrap">
              <FaShoppingBag />
            </div>
            <span>
              MERN <span className="brand-highlight">Shop</span>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggle" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-1 mt-2 mt-lg-0">
              <Nav.Link
                as={Link}
                to="/"
                className={`nav-link-custom ${location.pathname === "/" ? "active-nav" : ""}`}
              >
                <FaHome className="nav-icon" />
                Home
              </Nav.Link>

              {!token ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className={`nav-link-custom ${location.pathname === "/login" ? "active-nav" : ""}`}
                  >
                    <FaSignInAlt className="nav-icon" />
                    Login
                  </Nav.Link>

                  <Link to="/register" className="btn-register ms-lg-2">
                    <FaUserPlus size={13} />
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    className={`nav-link-custom ${location.pathname === "/admin" ? "active-nav" : ""}`}
                  >
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </Nav.Link>

                  <button
                    className="btn-logout ms-lg-2"
                    onClick={logoutHandler}
                  >
                    <FaSignOutAlt size={13} />
                    Logout
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
