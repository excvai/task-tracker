import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import HistoryIcon from '@mui/icons-material/History';
import TelegramIcon from '@mui/icons-material/Telegram';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import DefaultAvatar from '/public/images/avatar.jpg';
import UnearnedAchievement from '/public/images/achievement-unearned2x.png';
import PerfectAchievement from '/public/images/achievement-perfect2x.png';
import CreatedTaskAchievement from '/public/images/achievement-createdTask2x.png';
import CompletedTaskAchievement from '/public/images/achievement-completedTask2x.png';
import { green } from '@mui/material/colors';

export const Sidebar = () => {
  return (
    <Stack
      textAlign='center'
      alignItems='center'
      gap={4}
      maxWidth={288}
      width={1}
      p={2}
      color='white'
      sx={{
        backgroundImage: 'linear-gradient(315deg, #7a7676 0%, #576574 74%)',
      }}
    >
      <Stack alignItems='center' gap={0.5}>
        <Box
          component={Image}
          src={DefaultAvatar}
          alt='Avatar'
          width={112}
          height={96}
          bgcolor='white'
          border='1px solid #ccc'
          borderRadius={4}
        />
        <Typography fontWeight={600} variant='h6'>
          Nickname
        </Typography>
        <Typography variant='body2' fontStyle='italic' fontWeight={300}>
          1 lvl
        </Typography>
        <Box>
          <Typography variant='body2' fontStyle='italic' fontWeight={300}>
            0.00%
          </Typography>
          <Box height={2} bgcolor={green[400]} width={100} />
        </Box>
      </Stack>

      <Stack
        gap={1}
        alignSelf='flex-start'
        width={1}
        sx={{
          button: {
            justifyContent: 'flex-start',
            textTransform: 'none'
          },
        }}
      >
        <Button
          variant='contained'
          color='inherit'
          sx={{ color: 'text.primary' }}
          fullWidth
        >
          <HistoryIcon /> <Typography ml={1}>Check history</Typography>
        </Button>
        <Button
          variant='contained'
          color='inherit'
          sx={{ color: 'text.primary' }}
          fullWidth
        >
          <TelegramIcon />
          <Typography ml={1}>Connect Telegram</Typography>
        </Button>
        <Button
          variant='contained'
          color='inherit'
          sx={{ color: 'text.primary' }}
          fullWidth
        >
          <NotificationsActiveIcon />
          <Typography ml={1}>Notifications</Typography>
        </Button>
        <Button
          variant='contained'
          color='inherit'
          sx={{ color: 'text.primary' }}
          fullWidth
        >
          <SupportAgentIcon />
          <Typography ml={1}>Support</Typography>
        </Button>
      </Stack>

      <Box width={1}>
        <Box
          display='inline-flex'
          gap={0.5}
          justifyContent='center'
          alignItems='center'
          borderTop='2px solid rgba(204, 204, 204, 0.596)'
          px={1}
          pt={1}
          mb={1}
        >
          <EmojiEventsTwoToneIcon />
          <Typography variant='h6'>Achievements</Typography>
        </Box>
        <Grid container rowSpacing={2}>
          <Grid
            item
            xs={6}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image src={UnearnedAchievement} alt='Unearned' />
            <Typography>0 Streak</Typography>
          </Grid>
          <Tooltip
            title={
              <Box textAlign='center' py={2} px={1}>
                <Typography variant='h6' fontWeight={600}>
                  Perfect Day
                </Typography>
                <Typography>
                  Completed all active Dailies in one day. With this achievement
                  you get a +level/2 buff to all Stats for the next day. Levels
                  greater than 100 don&apos;t have any additional effects on
                  buffs.
                </Typography>
              </Box>
            }
          >
            <Grid
              item
              xs={6}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Image src={PerfectAchievement} alt='Unearned' />
              <Typography>Perfect Day</Typography>
            </Grid>
          </Tooltip>
          <Grid
            item
            xs={6}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image src={CreatedTaskAchievement} alt='Unearned' />
            <Typography>Create Task</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image src={CompletedTaskAchievement} alt='Unearned' />
            <Typography>Complete Task</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image src={UnearnedAchievement} alt='Unearned' />
            <Typography>Contributor</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mt='auto' borderTop='2px solid rgba(204, 204, 204, 0.596)'>
        <Button color='inherit'>Logout</Button>
      </Box>
    </Stack>
  );
};
