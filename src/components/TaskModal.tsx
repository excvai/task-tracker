import { $categories, Task, updateTask } from '@/store/tasks';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Modal,
  ModalProps,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useStore } from 'effector-react';
import { useState } from 'react';

interface TaskModalProps extends Omit<ModalProps, 'children'> {
  task: Task;
  day: string;
  onComplete: () => void;
  onCancel: () => void;
}

export const TaskModal = ({
  task,
  day,
  onComplete,
  onCancel,
  ...props
}: TaskModalProps) => {
  const categories = useStore($categories);

  const [time, setTime] = useState<dayjs.Dayjs | null>(
    dayjs(day + 'T' + task.days[day].time)
  );

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
          minWidth: 500,
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

        {/* Name */}
        <Stack
          direction='row'
          gap={1}
          pr={5}
          py={1}
          alignItems='center'
          width={1}
        >
          {/* <AssignmentIcon sx={{ mt: '4px' }} /> */}
          <Typography
            id='modal-modal-title'
            variant='h5'
            fontWeight={700}
            component='h2'
          >
            {task.name}
          </Typography>
        </Stack>

        {/* Description */}
        <Stack direction='row' gap={1}>
          <SubjectRoundedIcon sx={{ mt: 0.4 }} />
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography fontWeight={600} mr={1}>
                Description
              </Typography>
              <Button
                color='neutral'
                variant='contained'
                size='small'
                sx={{ textTransform: 'none' }}
              >
                Edit
              </Button>
            </Box>
            <Typography id='modal-modal-description' mt={1}>
              {task.description}
            </Typography>
          </Box>
        </Stack>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label='Time'
            slotProps={{ textField: { size: 'small' } }}
            value={time}
            onChange={(value) => setTime(value)}
            onAccept={(value) => {
              const zeroPad = (num: number, places: number) =>
                String(num).padStart(places, '0');
              const time =
                zeroPad(value?.hour()!, 2) + ':' + zeroPad(value?.minute()!, 2);
              task.days[day].time = time;
              updateTask(task);
            }}
          />
        </LocalizationProvider>

        {/* Complexity */}
        <Stack direction='row' gap={1}>
          <StarsOutlinedIcon />
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography fontWeight={600} mr={1}>
                Difficulty
              </Typography>
              <Tooltip title='Difficulty describes how challenging a Task is for you to complete. A higher difficulty results in greater rewards when a Task is completed.'>
                <InfoOutlinedIcon fontSize='small' sx={{ opacity: 0.5 }} />
              </Tooltip>
            </Box>
            <Rating
              name='difficulty'
              value={task.difficulty}
              onChange={(_, newValue) => {
                task.difficulty = newValue;
                updateTask(task);
              }}
              precision={0.5}
              sx={{ mt: 1 }}
            />
          </Box>
        </Stack>

        {/* Categories */}
        <Stack direction='row' gap={1}>
          <GridViewIcon sx={{ mt: 0.4 }} />
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography fontWeight={600} mr={1}>
                Categories
              </Typography>
              <Button
                color='neutral'
                variant='contained'
                size='small'
                sx={{ textTransform: 'none' }}
              >
                Edit
              </Button>
            </Box>
            <Grid container mt={1} spacing={1}>
              {Object.keys(task.categories).map((cIdStr) => {
                const categoryId = Number(cIdStr);
                const category = categories.find((c) => c.id === categoryId)!;

                return (
                  <Grid item key={categoryId}>
                    <Chip
                      variant='outlined'
                      label={category.name}
                      onDelete={() => {}}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>

        <Box display='flex' gap={2} width={1}>
          <Button
            onClick={onComplete}
            color='success'
            fullWidth
            sx={{
              mt: 2,
              textTransform: 'none',
              gap: 1,
            }}
          >
            <DoneAllOutlinedIcon />
            Mark as completed
          </Button>
          <Button
            onClick={onCancel}
            color='error'
            fullWidth
            sx={{
              mt: 2,
              textTransform: 'none',
              gap: 1,
            }}
          >
            <DeleteOutlinedIcon />
            Mark as failed
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};
