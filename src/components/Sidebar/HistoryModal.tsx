import { $tasks, Task } from '@/store/tasks';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  ModalProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import { useStore } from 'effector-react';
import { useState } from 'react';
import Calendar from 'react-github-contribution-calendar';

export const History = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant='contained' color='light' fullWidth>
        <HistoryIcon />
        <Typography ml={1}>Check history</Typography>
      </Button>

      <HistoryModal open={open} onClose={handleClose} />
    </>
  );
};

interface HistoryModalProps extends Omit<ModalProps, 'children'> {}
const HistoryModal = ({ ...props }: HistoryModalProps) => {
  const [task, setTask] = useState<Task | null>(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const rects = document.querySelectorAll('rect');
  //     rects.forEach(rec => {
  //       console.log(rec)
  //       rec.onmouseover = () => {
  //         console.log('test')
  //       }
  //     })
  //   }, 1000);
  // }, []);

  // -5 0 5 --> 1 6 11
  const offset = 6;
  const values: Record<string, number> = {
    // '2023-01-01': 1,
    // '2023-01-02': 2,
    // '2023-01-03': 3,
    // '2023-01-04': 4,
    // '2023-01-05': 5,
    //
    // '2023-01-06': 6,
    //
    // '2023-01-07': 7,
    // '2023-01-08': 8,
    // '2023-01-09': 9,
    // '2023-01-10': 10,
    // '2023-01-11': 11,
  };
  const tasks = useStore($tasks);
  const processTaskDays = (task: Task) => {
    Object.entries(task.days).forEach(([day, info]) => {
      if (info.status === 'completed') {
        values[day] = (values[day] || offset) + 1;
      } else if (info.status === 'failed') {
        values[day] = (values[day] || offset) - 1;
      }
    });
  };
  if (task) {
    processTaskDays(task);
  } else {
    tasks.forEach((t) => {
      processTaskDays(t);
    });
  }
  const until = '2023-12-31';
  const panelColors = [
    '#EEEEEE',
    red[900],
    red[800],
    red[600],
    red[400],
    red[200],
    orange[100], // 0 (or 6 considering offset)
    green[200],
    green[400],
    green[600],
    green[800],
    green[900],
  ];

  let currentStreak: number | null = null;
  let totalCompleted: number | null = null;
  let totalFailed: number | null = null;
  if (task) {
    currentStreak = totalCompleted = totalFailed = 0;

    // Calculate streak
    const orderedDays = Object.keys(task.days)
      .sort()
      .reduce<Task['days']>((obj, key) => {
        obj[key] = task.days[key];
        return obj;
      }, {});

    const values = Object.values(orderedDays);
    for (let i = values.length - 1; i >= 0; i--) {
      const info = values[i];
      if (info.status === 'completed') {
        currentStreak += 1;
      } else if (info.status === 'failed') {
        break;
      }
    }

    // Calculate total completed and failed
    values.forEach((info) => {
      if (info.status === 'completed') {
        totalCompleted! += 1;
      } else if (info.status === 'failed') {
        totalFailed! += 1;
      }
    });
  }

  const emotions = ['😢', '😐', '😀', '☺️', '😍'];

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
          width: 'min(95%, 800px)',
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

        <Stack direction='row' gap={1} pr={5} py={1} width={1}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            fontWeight={700}
            component='h2'
          >
            History
          </Typography>

          {currentStreak !== null && (
            <Box display='flex' alignItems='center' mx='auto' gap={1}>
              <Typography>
                {emotions[currentStreak] || emotions[emotions.length - 1]}
              </Typography>
              <Typography>Current Streak: {currentStreak}</Typography>
            </Box>
          )}
        </Stack>

        {/* @ts-ignoreg */}
        <Calendar values={values} until={until} panelColors={panelColors} />

        <Box display='flex' gap={2} alignItems='flex-end'>
          <Autocomplete
            disablePortal
            value={task}
            onChange={(_, value) => setTask(value)}
            options={tasks}
            getOptionLabel={(option) => option.name}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Choose task'
                size='small'
                variant='standard'
              />
            )}
          />
          {totalCompleted !== null && totalFailed !== null && (
            <Box>
              <Box display='flex' alignItems='center' gap={1}>
                <ThumbUpIcon fontSize='small' color='success' />
                <Typography variant='body2'>
                  Total completed: {totalCompleted}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' gap={1} mt={0.5}>
                <ThumbDownIcon fontSize='small' color='error' />
                <Typography variant='body2'>
                  Total failed: {totalFailed}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Stack>
    </Modal>
  );
};
