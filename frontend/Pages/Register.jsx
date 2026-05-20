import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaShoppingBag,
  FaUserPlus,
} from "react-icons/fa";
import API from "../Services/api.js";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/user/register", formData);
      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      placeholder: "Your full name",
      icon: FaUser,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "your@email.com",
      icon: FaEnvelope,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "••••••••",
      icon: FaLock,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "text",
      placeholder: "+91 00000 00000",
      icon: FaPhone,
    },
  ];

  return (
    <>
      <div className="auth-page-luxury">
        <div className="auth-grid-bg" />

        <Card className="auth-card-luxury border-0">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center">
              <div className="auth-logo-wrap">
                <FaShoppingBag />
              </div>
              <h2 className="auth-heading">
                Create <em>Account</em>
              </h2>
              <p className="auth-subheading">
                Register and start shopping today
              </p>
              <div className="auth-divider" />
            </div>

            <Form onSubmit={handleSubmit}>
              {fields.map(({ label, name, type, placeholder, icon: Icon }) => (
                <Form.Group className="mb-4" key={name}>
                  <Form.Label className="auth-label-luxury">{label}</Form.Label>
                  <div className="input-icon-wrap">
                    <Icon className="input-icon" />
                    <Form.Control
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      onChange={handleChange}
                      value={formData[name]}
                      className="auth-input-luxury"
                      required
                    />
                  </div>
                </Form.Group>
              ))}

              <Button
                type="submit"
                className="auth-submit-btn w-100 mt-2"
                disabled={loading}
              >
                {loading ? (
                  "Creating account…"
                ) : (
                  <>
                    <FaUserPlus size={13} /> Create Account
                  </>
                )}
              </Button>
            </Form>

            <p className="text-center mt-4 mb-0 auth-footer-text-luxury">
              Already have an account?{" "}
              <Link to="/login" className="auth-link-luxury">
                Sign In
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Register;
