import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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

  const handleAddProduct = () => {
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
      <nav style={{marginBottom:'40px',backgroundColor:'lightblue',width:'100%',display:'flex',justifyContent:'end'}}>
        <Button variant="contained" color="primary" onClick={handleDialogOpen} sx={{margin:'5px 10px 5px 5px'}}>
          Buy Now
        </Button>
      </nav>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{textAlign:'center'}}>Add Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{textAlign:'center'}}>
              <TextField label="Product Name" value={productName} onChange={handleProductNameChange} required />
            </Grid>
            <Grid item xs={12} sx={{textAlign:'center'}}>
              <TextField label="Product Price" value={productPrice} onChange={handleProductPriceChange} required />
            </Grid>
            <Grid item xs={12} sx={{textAlign:'center',marginLeft:'50px',width:'900px'}}>
              <input type="file" accept="image/*" onChange={handleProductImageChange} style={{padding:'5px 5px'}} required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{marginRight:'190px'}}>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </DialogActions>
      </Dialog>

      <div>
        <Grid container spacing={2}>
          {productList.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <img src={URL.createObjectURL(product.image)} alt={product.name} />
                  <h3>Product Name :{product.name}</h3>
                  <p>Product Price :{product.productPrice}</p>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleQuantityChange(index, product.quantity - 1)}>-</Button>
                  <span>Quantity :{product.quantity}</span>
                  <Button onClick={() => handleQuantityChange(index, product.quantity + 1)}>+</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><h2>Product Name</h2></TableCell>
              <TableCell><h2>Product Price</h2></TableCell>
              <TableCell><h2>Quantity</h2></TableCell>
              <TableCell><h2>Total</h2></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.productPrice}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Project;
