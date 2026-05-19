import { useState } from "react";

import { Container, Form, Button, Card } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import API from "../Services/api.js";

function Login() {
  const navigate = useNavigate();

  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/login", fromData);

      localStorage.setItem("token", res.data.token);

      alert("Login Successfully");

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow " style={{ width: "450px" }}>
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Login
          </Button>
        </Form>
        <p className="mt-3 text-center">
          No account ? <Link to="/register">Register</Link>
        </p>
      </Card>
    </Container>
  );
}

export default Login;
