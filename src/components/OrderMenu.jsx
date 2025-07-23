import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTableOrder, addWalkInOrder } from '../store/slices/orderSlice';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Button,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import '../styles/OrderMenu.css';

const OrderMenu = ({ tableId = null }) => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.order.menu);
  const [activeTab, setActiveTab] = useState('drinks');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (itemId, increment) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = increment 
          ? item.quantity + 1 
          : Math.max(0, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: cart,
      timestamp: new Date().toISOString()
    };

    if (tableId) {
      dispatch(addTableOrder({
        ...orderData,
        tableId
      }));
    } else {
      dispatch(addWalkInOrder(orderData));
    }

    setCart([]);
    setCartOpen(false);
  };

  const totalAmount = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              {tableId ? `Table ${tableId} - Order Menu` : 'Walk-in Order'}
            </Typography>
            <Badge badgeContent={cart.length} color="primary">
              <IconButton onClick={() => setCartOpen(true)}>
                <CartIcon />
              </IconButton>
            </Badge>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Drinks" value="drinks" />
            <Tab label="Cigarettes" value="cigarettes" />
          </Tabs>

          <Grid container spacing={2}>
            {menu[activeTab].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography color="primary">₹{item.price}</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      sx={{ mt: 1 }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Order Cart</DialogTitle>
        <DialogContent>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, false)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography component="span" sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, true)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, false)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" align="right" sx={{ mt: 2 }}>
            Total: ₹{totalAmount}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartOpen(false)}>Cancel</Button>
          <Button
            onClick={handlePlaceOrder}
            variant="contained"
            color="primary"
            disabled={cart.length === 0}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderMenu; 