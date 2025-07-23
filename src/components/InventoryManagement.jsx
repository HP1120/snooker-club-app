import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateStock,
  addReorderEntry,
  updateReorderStatus,
  dismissAlert,
  addSupplier,
  updateSupplier
} from '../store/slices/inventorySlice';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import '../styles/InventoryManagement.css';

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const inventory = useSelector(state => state.inventory);
  const [activeTab, setActiveTab] = useState('drinks');
  const [reorderDialog, setReorderDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reorderQuantity, setReorderQuantity] = useState('');

  const handleStockUpdate = (item, increment) => {
    dispatch(updateStock({
      category: item.category,
      itemId: item.id,
      quantity: 1,
      type: increment ? 'add' : 'remove'
    }));
  };

  const handleReorder = (item) => {
    setSelectedItem(item);
    setReorderQuantity(item.reorderQuantity.toString());
    setReorderDialog(true);
  };

  const submitReorder = () => {
    if (selectedItem && reorderQuantity) {
      dispatch(addReorderEntry({
        category: selectedItem.category,
        itemId: selectedItem.id,
        quantity: parseInt(reorderQuantity),
        supplier: selectedItem.supplier
      }));
      setReorderDialog(false);
    }
  };

  const getStockStatus = (item) => {
    if (item.stock <= item.minStock) {
      return { label: 'Low Stock', color: 'error' };
    } else if (item.stock <= item.minStock * 1.5) {
      return { label: 'Medium', color: 'warning' };
    }
    return { label: 'In Stock', color: 'success' };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      {/* Alerts Section */}
      {inventory.alerts.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {inventory.alerts.map(alert => (
            <Alert
              key={alert.id}
              severity="warning"
              action={
                <IconButton
                  size="small"
                  onClick={() => dispatch(dismissAlert({ alertId: alert.id }))}
                >
                  <CloseIcon />
                </IconButton>
              }
              sx={{ mb: 1 }}
            >
              {alert.message}
            </Alert>
          ))}
        </Box>
      )}

      {/* Inventory Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Drinks" value="drinks" />
        <Tab label="Cigarettes" value="cigarettes" />
      </Tabs>

      {/* Inventory Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Restocked</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.items[activeTab].map(item => {
              const status = getStockStatus(item);
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ₹{item.price} per {item.unit}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleStockUpdate(item, false)}
                        disabled={item.stock === 0}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.stock}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleStockUpdate(item, true)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={status.label}
                      color={status.color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(item.lastRestocked).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<RefreshIcon />}
                      variant="outlined"
                      size="small"
                      onClick={() => handleReorder(item)}
                    >
                      Reorder
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reorder Dialog */}
      <Dialog open={reorderDialog} onClose={() => setReorderDialog(false)}>
        <DialogTitle>Reorder {selectedItem?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={reorderQuantity}
              onChange={(e) => setReorderQuantity(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="textSecondary">
              Supplier: {selectedItem?.supplier}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReorderDialog(false)}>Cancel</Button>
          <Button
            onClick={submitReorder}
            variant="contained"
            color="primary"
            disabled={!reorderQuantity || parseInt(reorderQuantity) <= 0}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement; 