import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Button, Typography } from '@mui/material';

export const Notifications = () => {
  return (
    <>
      <Button
        variant='contained'
        color='inherit'
        sx={{ color: 'text.primary' }}
        fullWidth
      >
        <NotificationsActiveIcon />
        <Typography ml={1}>Notifications</Typography>
      </Button>
    </>
  );
};

const NotificationsMenu = () => {
  return <Box>menu</Box>;
};
