import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Modal,
  ModalProps,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const Notifications = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        color='light'
        fullWidth
      >
        <NotificationsActiveIcon />
        <Typography ml={1}>Notifications</Typography>
      </Button>

      <NotificationsModal open={open} onClose={handleClose} />
    </>
  );
};

interface NotificationsModalProps extends Omit<ModalProps, 'children'> {}
const NotificationsModal = ({ ...props }: NotificationsModalProps) => {
  return (
    <Modal {...props}>
      <Stack
        alignItems='flex-start'
        gap={2}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 600,
          minWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          pt: 2,
          ':focus-visible': {
            outline: 'none',
          },
        }}
      >
        <IconButton
          onClick={(e) => {
            if (props.onClose) {
              props.onClose(e, 'backdropClick');
            }
          }}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack direction='row' gap={1} pr={5} py={1}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            fontWeight={700}
            component='h2'
          >
            Configure Notifications
          </Typography>
        </Stack>

        <FormControlLabel
          control={<Switch />}
          label={
            <Box display='flex' alignItems='center' gap={1}>
              <TelegramIcon />
              <Typography fontWeight={500}>Telegram</Typography>
            </Box>
          }
        />
        <FormControlLabel
          control={<Switch />}
          label={
            <Box display='flex' alignItems='center' gap={1}>
              <EmailIcon />
              <Typography fontWeight={500}>E-mail</Typography>
              <Typography variant='caption' color='error'>(currently in development)</Typography>
            </Box>
          }
        />
      </Stack>
    </Modal>
  );
};
