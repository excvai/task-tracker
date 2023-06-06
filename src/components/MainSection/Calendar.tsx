import { Status, tasks } from '@/data/tasks';
import { EventContentArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { TaskModal } from '../TaskModal';

export const Calendar = () => {
  const events = useMemo(() => {
    const out: EventInput[] = [];
    tasks.forEach((task) => {
      Object.entries(task.days).forEach(([date, status]) => {
        const bgColor: { [k in Status]: string } = {
          none: 'white',
          failed: 'red',
          completed: 'green',
        };

        out.push({
          title: task.name,
          start: new Date(date),
          backgroundColor: bgColor[status],
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
      <Box onClick={handleOpen} width={1} sx={{ cursor: 'pointer' }}>
        <b>{eventInfo.timeText}</b>&nbsp;
        <i>{eventInfo.event.title}</i>
      </Box>

      <TaskModal open={open} onClose={handleClose} task={task} />
    </>
  );
};
