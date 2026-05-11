import React from 'react';
import { Alert, Box } from '@mui/material';

interface Props {
  message: string;
}

export const ErrorAlert: React.FC<Props> = ({ message }) => (
  <Box sx={{ my: 2 }}>
    <Alert severity="error" variant="filled">
      {message}
    </Alert>
  </Box>
);
