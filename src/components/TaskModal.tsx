import { Task, categories } from '@/data/tasks';
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

interface TaskModalProps extends Omit<ModalProps, 'children'> {
  task: Task;
}

export const TaskModal = ({ task, ...props }: TaskModalProps) => {
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
        <Stack direction='row' gap={1} pr={5} py={1}>
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
              defaultValue={task.difficulty || undefined}
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
            color='error'
            fullWidth
            sx={{
              mt: 2,
              textTransform: 'none',
              gap: 1,
            }}
          >
            <DeleteOutlinedIcon />
            Delete this Task
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};
