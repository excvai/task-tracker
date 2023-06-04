import { Box, IconButton, Stack, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
import { Category, Task, categories, tasks } from '@/data/tasks';

export const Categories = () => {
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
          t.categories.includes(category.id)
        );

        return (
          <Category
            key={category.id}
            category={category}
            tasks={relatedTasks}
          />
        );
      })}
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
          <Card key={task.id} task={task} />
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

const Card = ({ task }: { task: Task }) => {
  return (
    <Box
      bgcolor='white'
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
      {task.name}
    </Box>
  );
};
