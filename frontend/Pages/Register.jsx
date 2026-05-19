import { useState } from "react";

import { Container, Form, Button, Card } from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";

import API from "../Services/api.js";

function Register() {
  const navigate = useNavigate();

  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", formData);

      alert("Registered Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Card style={{ width: "500px" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Your Phone Number"
              name="phone"
              onChange={handleChange}
              required
            />
          </Form.Group>

            <Button type="submit" variant="dark" className="w-100">
              Register
            </Button>

            <p className="mt-3 text-center">
              Already have an account ? {""}
              <Link to="/login">Login</Link>
            </p>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
