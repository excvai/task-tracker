import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { default as NextLink } from 'next/link';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { GBIcon, UAIcon } from '@/icons/countries';

export const WelcomeSection = () => {
  return (
    <Stack component='main' minHeight='100vh'>
      {/* Header */}
      <Container>
        <Stack
          direction='row'
          justifyContent='space-between'
          height={72}
          alignItems='center'
        >
          <Stack
            component={NextLink}
            href='/'
            direction='row'
            gap={1}
            alignItems='center'
            sx={{
              cursor: 'pointer',
            }}
          >
            <FlagCircleIcon fontSize='large' />
            <Typography variant='h5'>Goalify</Typography>
          </Stack>
          <Stack direction='row' gap={6} alignItems='center'>
            <LanguageMenu />
            <Link
              color='text.secondary'
              href='mailto:vladyslav.katrych.main@gmail.com'
            >
              Contact Us
            </Link>
            <Link>Sign Up</Link>
            <Link component={NextLink} href='/signin'>
              Sign In
            </Link>
          </Stack>
        </Stack>
      </Container>

      <Stack
        flexGrow={1}
        // justifyContent='center'
        pt={15}
        pb={4}
        alignItems='center'
        textAlign='center'
        sx={{
          backgroundImage: 'url(/images/welcome-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          backgroundPosition: 'bottom',
        }}
      >
        <Stack component={Container} gap={4} alignItems='center'>
          <Typography variant='h2' maxWidth={530} fontWeight={700}>
            Build Your Habits, Reach your Goal!
          </Typography>
          <Typography maxWidth={658} variant='h5' color='text.secondary'>
            Focus on what truly matters with Goalify. Build the best version of
            yourself by achieving your goals.
          </Typography>
          <Button
            variant='contained'
            size='large'
            component={NextLink}
            href='/signin'
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const LanguageMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        <GBIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <GBIcon />
          </ListItemIcon>
          English
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <UAIcon />
          </ListItemIcon>
          Українська
        </MenuItem>
      </Menu>
    </>
  );
};
