import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import ProductCard from "../Components/ProductCard.jsx";

import API from "../Services/api.js";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/getAll");

      console.log(res.data);

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
