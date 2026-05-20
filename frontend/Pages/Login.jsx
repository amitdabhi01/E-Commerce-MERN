import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaShoppingBag, FaSignInAlt } from "react-icons/fa";
import API from "../Services/api.js";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/user/login", formData);
      localStorage.setItem("token", res.data.token);
      alert("Login Successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
                Welcome <em>Back</em>
              </h2>
              <p className="auth-subheading">Login to continue shopping</p>
              <div className="auth-divider" />
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="auth-label-luxury">
                  Email Address
                </Form.Label>
                <div className="input-icon-wrap">
                  <FaEnvelope className="input-icon" />
                  <Form.Control
                    type="email"
                    placeholder="your@email.com"
                    name="email"
                    onChange={handleChange}
                    className="auth-input-luxury"
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="auth-label-luxury">Password</Form.Label>
                <div className="input-icon-wrap">
                  <FaLock className="input-icon" />
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    onChange={handleChange}
                    className="auth-input-luxury"
                    required
                  />
                </div>
              </Form.Group>

              <Button
                type="submit"
                className="auth-submit-btn w-100 mt-2"
                disabled={loading}
              >
                {loading ? (
                  "Signing in…"
                ) : (
                  <>
                    <FaSignInAlt size={13} /> Sign In
                  </>
                )}
              </Button>
            </Form>

            <p className="text-center mt-4 mb-0 auth-footer-text-luxury">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link-luxury">
                Register
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;
