import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { TaskModal } from '../TaskModal';
import { useStore } from 'effector-react';
import {
  $categories,
  $tasks,
  Category,
  Status,
  Task,
  updateTask,
} from '@/store/tasks';

export const Categories = () => {
  const categories = useStore($categories);
  const tasks = useStore($tasks);

  return (
    <Stack
      direction='row'
      gap={2}
      overflow='auto'
      px={4}
      mx={-4}
      mb={-4}
      flexGrow={1}
      alignItems='flex-start'
    >
      {categories.map((category) => {
        const relatedTasks = tasks.filter((t) =>
          Object.keys(t.categories)
            .map((id) => Number(id))
            .includes(category.id)
        );

        return (
          <Category
            key={category.id}
            category={category}
            tasks={relatedTasks}
          />
        );
      })}

      <AddNewCategory />
    </Stack>
  );
};

const AddNewCategory = () => {
  return (
    <Stack
      direction='row'
      gap={1}
      bgcolor={grey[600]}
      width={272}
      px={1}
      py='12px'
      borderRadius={4}
      sx={{
        cursor: 'pointer',
        ':hover': {
          bgcolor: grey[700],
        },
      }}
    >
      <AddIcon />
      <Typography>Add another category</Typography>
    </Stack>
  );
};

const Category = ({
  category,
  tasks,
}: {
  category: Category;
  tasks: Task[];
}) => {
  return (
    <Stack
      bgcolor='#f1f2f4'
      color='text.primary'
      px={1}
      borderRadius={4}
      width={272}
      flexShrink={0}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        height={48}
      >
        <Typography fontWeight={500} pl={1}>
          {category.name}
        </Typography>
        <IconButton size='small'>
          <MoreHorizIcon />
        </IconButton>
      </Stack>

      <Stack gap={1}>
        {tasks.map((task) => (
          <Card key={task.id} task={task} category={category} />
        ))}
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        color='text.secondary'
        my={1}
        px={1}
        py={0.5}
        borderRadius={2}
        sx={{
          cursor: 'pointer',
          ':hover': {
            bgcolor: '#091E4224',
          },
        }}
      >
        <AddIcon />
        <Typography>Add a task</Typography>
      </Stack>
    </Stack>
  );
};

const Card = ({ task, category }: { task: Task; category: Category }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const bgColorMap: { [k in Status]: string | null } = {
    none: null,
    failed: 'error',
    completed: 'success',
  };
  const bgColor = bgColorMap[task.categories[category.id]];

  const completeTask = () => {
    task.categories[category.id] = 'completed';
    updateTask(task);
    handleClose();
  };

  const cancelTask = () => {
    task.categories[category.id] = 'failed';
    updateTask(task);
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        gap={2}
        bgcolor='white'
        borderLeft={`5px solid`}
        borderColor={bgColor ? bgColor + '.main' : 'white'}
        borderRadius={1}
        p={1}
        sx={{
          boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F',
          cursor: 'pointer',
          ':hover': {
            bgcolor: grey[200],
          },
        }}
      >
        <Typography>{task.name}</Typography>
        <Box display='flex' alignItems='center' gap={0.5}>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              completeTask();
            }}
          >
            <DoneIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              cancelTask();
            }}
          >
            <RemoveCircleOutlineIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>

      <TaskModal
        open={open}
        onClose={handleClose}
        task={task}
        onComplete={completeTask}
        onCancel={cancelTask}
      />
    </>
  );
};
