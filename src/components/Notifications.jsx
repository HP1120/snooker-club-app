import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useApp } from '../context/AppContext';
import '../styles/Notifications.css';

const Notifications = () => {
  const { state, dispatch } = useApp();
  const { notifications } = state;

  const handleClose = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ top: `${(index * 80) + 24}px` }}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{
              width: '100%',
              backgroundColor: notification.type === 'success' ? 'var(--accent-success)' :
                             notification.type === 'error' ? 'var(--accent-danger)' :
                             notification.type === 'warning' ? 'var(--accent-warning)' :
                             'var(--accent-primary)',
              color: 'var(--text-primary)',
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default Notifications; 