import { updateUser, users } from '@/store/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Divider, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link
        component={NextLink}
        color='inherit'
        href='/'
        sx={{ cursor: 'pointer' }}
      >
        Goalify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();

  const [error, setError] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const user = users.find((u) => u.email === email);
    if (user) {
      if (user.password === password) {
        updateUser(user);
        router.push('/');
      } else {
        setError('Wrong password');
      }
    } else {
      setError('User not found');
    }
    console.log({
      email,
      password,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack component='main' minHeight='100vh' justifyContent='center'>
        <Container
          maxWidth='xs'
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            mt: '12%',
            mb: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#172B4D' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {error && (
              <Alert
                severity='error'
                sx={{
                  mt: 2,
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </Container>
        <Divider />
        <Copyright sx={{ py: 2 }} />
      </Stack>
    </ThemeProvider>
  );
}
