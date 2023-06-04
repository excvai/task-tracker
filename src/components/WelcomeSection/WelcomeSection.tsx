import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { Button, Container, Link, Stack, Typography } from '@mui/material';

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
          <Stack direction='row' gap={6}>
            <Link
              color='text.secondary'
              href='mailto:vladyslav.katrych.main@gmail.com'
            >
              Contact Us
            </Link>
            <Link>Sign Up</Link>
            <Link>Sign In</Link>
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
          <Button variant='contained' size='large'>
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
