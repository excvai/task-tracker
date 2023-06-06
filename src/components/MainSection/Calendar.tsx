import { Status, tasks } from '@/data/tasks';
import { EventContentArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { TaskModal } from '../TaskModal';

export const Calendar = () => {
  const events = useMemo(() => {
    const out: EventInput[] = [];
    tasks.forEach((task) => {
      Object.entries(task.days).forEach(([date, info]) => {
        const bgColor: { [k in Status]: string } = {
          none: 'light',
          failed: 'error',
          completed: 'success',
        };

        out.push({
          title: task.name,
          start: new Date(date + '/' + info.time),
          backgroundColor: bgColor[info.status],
        });
      });
    });
    return out;
  }, []);

  return (
    <Box
      flexGrow={1}
      p={2}
      borderRadius={2}
      sx={{
        backgroundImage:
          'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgba(0, 0, 0, 50%) 99.4%);',
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
        fixedWeekCount={false}
        eventContent={renderEventContent}
        height={'100%'}
      />
    </Box>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => (
  <MyComponent eventInfo={eventInfo} />
);

const MyComponent = ({ eventInfo }: { eventInfo: EventContentArg }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const task = tasks.find((t) => t.name === eventInfo.event.title)!;

  return (
    <>
      <Button
        onClick={handleOpen}
        fullWidth
        variant='contained'
        // TODO: replace any
        color={(eventInfo.backgroundColor as any) || 'primary'}
        size='small'
        sx={{
          textTransform: 'none',
          justifyContent: 'flex-start',
          mx: 1,
          px: 2,
          py: 0.5,
          borderRadius: 4,
        }}
      >
        <b>{eventInfo.timeText}</b>&nbsp;
        <i>{eventInfo.event.title}</i>
      </Button>

      <TaskModal open={open} onClose={handleClose} task={task} />
    </>
  );
};
