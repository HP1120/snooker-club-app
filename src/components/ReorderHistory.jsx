import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateReorderStatus,
  addSupplier,
  updateSupplier
} from '../store/slices/inventorySlice';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';
import '../styles/ReorderHistory.css';

const ReorderHistory = () => {
  const dispatch = useDispatch();
  const { reorderHistory, suppliers } = useSelector(state => state.inventory);
  const [supplierDialog, setSupplierDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    contact: '',
    email: ''
  });

  const handleStatusUpdate = (orderId, status) => {
    dispatch(updateReorderStatus({
      orderId,
      status,
      deliveryDate: status === 'delivered' ? new Date().toISOString() : null
    }));
  };

  const handleSupplierEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierForm({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email
    });
    setSupplierDialog(true);
  };

  const handleSupplierSubmit = () => {
    if (selectedSupplier) {
      dispatch(updateSupplier({
        id: selectedSupplier.id,
        ...supplierForm
      }));
    } else {
      dispatch(addSupplier(supplierForm));
    }
    setSupplierDialog(false);
    setSelectedSupplier(null);
    setSupplierForm({ name: '', contact: '', email: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Suppliers Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">Suppliers</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => setSupplierDialog(true)}
          >
            Add Supplier
          </Button>
        </Box>

        <Grid container spacing={2}>
          {suppliers.map(supplier => (
            <Grid item xs={12} sm={6} md={4} key={supplier.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{supplier.name}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleSupplierEdit(supplier)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <Typography color="textSecondary">{supplier.contact}</Typography>
                  <Typography color="textSecondary">{supplier.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Reorder History Section */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reorder History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reorderHistory.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.itemName}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {order.status === 'pending' && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleStatusUpdate(order.id, 'delivered')}
                      >
                        Mark Delivered
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Supplier Dialog */}
      <Dialog open={supplierDialog} onClose={() => setSupplierDialog(false)}>
        <DialogTitle>
          {selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={supplierForm.name}
              onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Contact"
              value={supplierForm.contact}
              onChange={(e) => setSupplierForm({ ...supplierForm, contact: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={supplierForm.email}
              onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSupplierDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSupplierSubmit}
            variant="contained"
            color="primary"
            disabled={!supplierForm.name || !supplierForm.contact || !supplierForm.email}
          >
            {selectedSupplier ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReorderHistory; 