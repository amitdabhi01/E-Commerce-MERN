import { useEffect, useState } from "react";

import { Button, Container, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import API from "../Services/api.js";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get("/product/getAll");

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/product/delete/${id}`);

      fetchProduct();

      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>

        <Button variant="dark" onClick={() => navigate("/add")}>
          Add Product
        </Button>
      </div>

      <Table className="text-center" hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.imageURL}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover" }}
                />
              </td>

              <td>{product.title}</td>

              <td>{product.price}</td>

              <td>{product.stock}</td>

              <td>{product.status}</td>

              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate(`/update/${product._id}`)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default AdminDashboard;
