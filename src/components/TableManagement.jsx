import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider
} from '@mui/material';
import SessionStartPopup from './SessionStartPopup';
import ScoreTracker from './ScoreTracker';
import OrderMenu from './OrderMenu';
import '../styles/TableManagement.css';

const TableManagement = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [sessionPopupOpen, setSessionPopupOpen] = useState(false);
  const activeSessions = useSelector(state => state.session.activeSessions);
  const tableOrders = useSelector(state => state.order.tableOrders);

  // Mock table data - in real app, this would come from backend
  const tables = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Table ${i + 1}`
  }));

  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
  };

  const handleStartSession = (tableId) => {
    setSelectedTable(tableId);
    setSessionPopupOpen(true);
  };

  const getTableStatus = (tableId) => {
    if (activeSessions[tableId]) {
      return 'active';
    }
    return 'available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'error';
      case 'available':
        return 'success';
      default:
        return 'default';
    }
  };

  const getTableOrders = (tableId) => {
    return tableOrders[tableId] || [];
  };

  const calculateTableTotal = (tableId) => {
    const orders = getTableOrders(tableId);
    return orders.reduce((total, order) => total + order.total, 0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Table Management
      </Typography>

      <Grid container spacing={3}>
        {/* Table Grid */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {tables.map((table) => (
              <Grid item xs={12} sm={6} key={table.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    bgcolor: selectedTable === table.id ? 'action.selected' : 'background.paper'
                  }}
                  onClick={() => handleTableClick(table.id)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">{table.name}</Typography>
                      <Chip
                        label={getTableStatus(table.id)}
                        color={getStatusColor(getTableStatus(table.id))}
                        size="small"
                      />
                    </Box>

                    {activeSessions[table.id] ? (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Players: {activeSessions[table.id].players.length}
                        </Typography>
                        <Typography variant="body2">
                          Orders: {getTableOrders(table.id).length}
                        </Typography>
                        <Typography variant="body2">
                          Total: ₹{calculateTableTotal(table.id)}
                        </Typography>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSession(table.id);
                        }}
                      >
                        Start Session
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Active Table Details */}
        <Grid item xs={12} md={4}>
          {selectedTable && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Table {selectedTable} Details
              </Typography>

              {activeSessions[selectedTable] ? (
                <>
                  <ScoreTracker tableId={selectedTable} />
                  <Divider sx={{ my: 2 }} />
                  <OrderMenu tableId={selectedTable} />
                </>
              ) : (
                <Card>
                  <CardContent>
                    <Typography>
                      No active session. Start a session to manage this table.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleStartSession(selectedTable)}
                    >
                      Start Session
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Session Start Popup */}
      <SessionStartPopup
        open={sessionPopupOpen}
        onClose={() => setSessionPopupOpen(false)}
        tableId={selectedTable}
      />
    </Box>
  );
};

export default TableManagement; 