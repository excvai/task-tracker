import { GBIcon, UAIcon } from '@/icons/countries';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import {
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
import { useTranslation } from 'next-i18next';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const WelcomeSection = () => {
  const { t } = useTranslation();

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
            <Link
              color='text.secondary'
              href='mailto:vladyslav.katrych.main@gmail.com'
            >
              {t('contactUs')}
            </Link>
            <Link>{t('signup')}</Link>
            <Link component={NextLink} href='/signin'>
              {t('signin')}
            </Link>
            <LanguageMenu />
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
          <Typography
            variant='h2'
            fontWeight={700}
            sx={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {t('title')}
          </Typography>
          <Typography maxWidth={658} variant='h5' color='text.secondary'>
            {t('subtitle')}
          </Typography>
          <Button
            variant='contained'
            size='large'
            component={NextLink}
            href='/signin'
          >
            {t('button')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const LanguageMenu = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

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
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
      >
        {i18n.language === 'en' ? <GBIcon /> : <UAIcon />}
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
        <MenuItem
          component={NextLink}
          href={{
            pathname: router.pathname,
            query: router.query,
          }}
          locale='en'
          onClick={handleClose}
        >
          <ListItemIcon>
            <GBIcon />
          </ListItemIcon>
          English
        </MenuItem>
        <Divider />
        <MenuItem
          component={NextLink}
          href={{
            pathname: router.pathname,
            query: router.query,
          }}
          locale='ua'
          onClick={handleClose}
        >
          <ListItemIcon>
            <UAIcon />
          </ListItemIcon>
          Українська
        </MenuItem>
      </Menu>
    </>
  );
};
