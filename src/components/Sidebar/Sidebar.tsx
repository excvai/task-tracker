import {
  $user,
  calculateExpPercentage,
  calculateLvl,
  updateUser,
} from '@/store/auth';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import HistoryIcon from '@mui/icons-material/History';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import { useStore } from 'effector-react';
import Image from 'next/image';
import { default as NextLink } from 'next/link';
import { Notifications } from './Notifications';
import CompletedTaskAchievement from '/public/images/achievement-completedTask2x.png';
import CreatedTaskAchievement from '/public/images/achievement-createdTask2x.png';
import PerfectAchievement from '/public/images/achievement-perfect2x.png';
import UnearnedAchievement from '/public/images/achievement-unearned2x.png';
import DefaultAvatar from '/public/images/avatar.jpg';
import { StarIcon } from '@/icons/common';
import { hashCode } from '@/utils';
import { History } from './HistoryModal';

export const Sidebar = () => {
  const user = useStore($user)!;

  const lvl = calculateLvl();

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
      <Stack alignItems='center'>
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
        <Typography fontWeight={600} variant='h6' pt={0.5}>
          {user.nickname}
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          gap={0.5}
        >
          <StarIcon fontSize='small' />
          <Typography variant='body2' fontStyle='italic' fontWeight={400}>
            {lvl} lvl
          </Typography>
        </Box>
        <Box mt={0.5}>
          <Typography variant='body2' fontStyle='italic' fontWeight={300}>
            {calculateExpPercentage()}%
          </Typography>
          <Box
            position='relative'
            width={100}
            height={5}
            borderRadius={2}
            overflow='hidden'
          >
            <Box
              bgcolor={green[400]}
              width={1}
              position='absolute'
              top={0}
              bottom={0}
              left={0}
            />
            <Box
              bgcolor={green[800]}
              width={calculateExpPercentage() + '%'}
              position='absolute'
              top={0}
              bottom={0}
              left={0}
            />
          </Box>
        </Box>
      </Stack>

      <Stack
        gap={1}
        alignSelf='flex-start'
        width={1}
        sx={{
          '> button, a': {
            justifyContent: 'flex-start',
            textTransform: 'none',
          },
        }}
      >
        <History />
        <Button
          component={NextLink}
          href={`https://t.me/GoalifyBot?start=${hashCode(user.email)}`}
          target='_blank'
          variant='contained'
          color='light'
          fullWidth
        >
          <TelegramIcon />
          <Typography ml={1}>Connect Telegram</Typography>
        </Button>
        <Notifications />
        <Button
          component={NextLink}
          href='mailto:vladyslav.katrych.main@gmail.com'
          variant='contained'
          color='light'
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
          <Tooltip
            title={
              <Box textAlign='center' py={2} px={1}>
                <Typography variant='h6' fontWeight={600}>
                  Consistent
                </Typography>
                <Typography>Completed the task 25 times in a row</Typography>
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
              <Image src={UnearnedAchievement} alt='Unearned' />
              <Typography>Consistent</Typography>
            </Grid>
          </Tooltip>
          <Tooltip
            title={
              <Box textAlign='center' py={2} px={1}>
                <Typography variant='h6' fontWeight={600}>
                  Perfect Day
                </Typography>
                <Typography>Completed all Dailies in one day.</Typography>
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
          <Tooltip
            title={
              <Box textAlign='center' py={2} px={1}>
                <Typography variant='h6' fontWeight={600}>
                  Create Task
                </Typography>
                <Typography>Created your first task.</Typography>
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
              <Image src={CreatedTaskAchievement} alt='Unearned' />
              <Typography>Create Task</Typography>
            </Grid>
          </Tooltip>
          <Tooltip
            title={
              <Box textAlign='center' py={2} px={1}>
                <Typography variant='h6' fontWeight={600}>
                  Complete task
                </Typography>
                <Typography>Completed your first task.</Typography>
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
              <Image src={CompletedTaskAchievement} alt='Unearned' />
              <Typography>Complete Task</Typography>
            </Grid>
          </Tooltip>
          <Tooltip
            title={
              <Box textAlign='center' py={2} px={1}>
                <Typography variant='h6' fontWeight={600}>
                  Contributor
                </Typography>
                <Typography>
                  Has contributed to Goalify, whether via code, art, writing, or
                  other methods.
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
              <Image src={UnearnedAchievement} alt='Unearned' />
              <Typography>Contributor</Typography>
            </Grid>
          </Tooltip>
        </Grid>
      </Box>

      <Box mt='auto' borderTop='2px solid rgba(204, 204, 204, 0.596)'>
        <Button
          color='inherit'
          onClick={() => {
            updateUser(null);
          }}
        >
          Logout
        </Button>
      </Box>
    </Stack>
  );
};
