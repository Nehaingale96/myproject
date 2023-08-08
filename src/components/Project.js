import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const Project = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    } else {
      setProductImage(null);
      console.log('Invalid file size');
    }
  };

  const handleAddProduct = (e) => {
    if (productName.trim() && productPrice.trim() && productImage) {
      const newProduct = {
        name: productName,
        productPrice: productPrice,
        image: productImage,
        quantity: quantity,
        price: (parseFloat(productPrice) * quantity).toFixed(2),
      };
      setProductList([...productList, newProduct]);
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setQuantity(1);
      handleDialogClose();
    } else {
      console.log('Form validation failed');
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    setProductList((prevProducts) =>
      prevProducts.map((product, i) => {
        if (i === index) {
          const updatedProduct = { ...product, quantity: newQuantity };
          updatedProduct.price = (parseFloat(product.productPrice) * newQuantity).toFixed(2);
          return updatedProduct;
        }
        return product;
      })
    );
  };

  return (
    <div>
      <nav style={{marginBottom:'40px',backgroundColor:'lightblue',width:'100%',display:'flex',justifyContent:'end',height:'50px'}}>
         <Button variant="contained" className='bg-primary' onClick={handleDialogOpen} style={{margin:'5px 9px',color:'white'}}>
           Add Product
         </Button>
       </nav>

      <Modal show={openDialog} onHide={handleDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} className="text-center">
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={handleProductNameChange}
                  required
                />
              </Col>
              <Col xs={12} className="text-center">
                <Form.Control
                  type="text"
                  placeholder="Product Price"
                  value={productPrice}
                  className='mt-3'
                  onChange={handleProductPriceChange}
                  required
                />
              </Col>
              <Col xs={12} >
                <input type="file" accept="image/*" onChange={handleProductImageChange} className="p-2 mt-3" required />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <Container>
          <Row>
            {productList.map((product, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className='mt-4'>
                  <Card.Img variant="top" src={URL.createObjectURL(product.image)} alt={product.name} width={'500px'} height={'300px'} />
                  <Card.Body className='text-center'>
                    <Card.Title >Product Name: {product.name}</Card.Title>
                    <Card.Text>Product Price: {product.productPrice}</Card.Text>
                  </Card.Body>
                  <Card.Footer className='text-center'>
                    <Button variant="primary" onClick={() => handleQuantityChange(index, product.quantity - 1)}>
                      -
                    </Button>
                    <span className="mx-2">Quantity: {product.quantity}</span>
                    <Button variant="primary" onClick={() => handleQuantityChange(index, product.quantity + 1)}>
                      +
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col>
            <Table striped bordered hover className=' table table-bordered mt-5'>
              <thead className='thead-light'>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Project;
