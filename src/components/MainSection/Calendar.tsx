import { $tasks, Status, Task, addTask, updateTask } from '@/store/tasks';
import { DateSelectArg, EventContentArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Box, Button } from '@mui/material';
import { useStore } from 'effector-react';
import { useMemo, useState } from 'react';
import { TaskModal } from '../TaskModal';

export const Calendar = () => {
  const tasks = useStore($tasks);

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
          start: new Date(`${date}${info.time ? 'T' + info.time : ''}`),
          backgroundColor: bgColor[info.status],
          allDay: !Boolean(info.time),
        });
      });
    });
    return out;
  }, [tasks]);

  const getNextTaskId = () => {
    let id = 1;
    tasks.forEach((t) => {
      if (t.id >= id) {
        id = t.id + 1;
      }
    });
    return id;
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a name and time for your task');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (!title) return;

    let [name, time] = title.split('(');
    name = name.trim();
    time = time?.slice(0, -1);

    const getDays = (start: Date, end: Date) => {
      for (
        var arr = [], dt = new Date(start);
        dt <= new Date(end);
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    };

    const daysRange = getDays(selectInfo.start, selectInfo.end)
      .slice(1)
      .map((date) => date.toISOString().split('T')[0]);

    let newDays: Task['days'] = {};
    // Check if task already exist
    let task = tasks.find((t) => t.name === name);

    // If it exists then just update array of days
    if (task) {
      daysRange.forEach((day) => {
        if (task!.days[day]) return;
        const newDay: { status: Status; time: string | null } = {
          status: 'none',
          time: time || null,
        };
        task!.days[day] = newDay;
        newDays[day] = newDay;
      });
      updateTask(task);
    }
    // Else add new task
    else {
      const days: Task['days'] = {};
      daysRange.forEach((day) => {
        days[day] = {
          status: 'none',
          time: time || null,
        };
      });
      newDays = days;

      const newTask = {
        id: getNextTaskId(),
        name: name,
        description: '',
        difficulty: null,
        days,
        categories: {},
      };
      addTask(newTask);
      task = newTask;
    }
  };

  return (
    <Box
      flexGrow={1}
      p={2}
      borderRadius={2}
      sx={{
        backgroundImage:
          'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgba(0, 0, 0, 50%) 99.4%);',
        '.fc-event': {
          bgcolor: 'transparent',
          border: 'none',
          padding: 0,
        },
        '.fc-event-main': {
          display: 'flex',
        },
        '.fc-daygrid-event-harness': {
          pt: 1,
        },
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        fixedWeekCount={false}
        eventContent={renderEventContent}
        selectable={true}
        selectMirror={true}
        select={handleDateSelect}
        height={'100%'}
      />
    </Box>
  );
};

const renderEventContent = (eventInfo: EventContentArg) => (
  <MyComponent eventInfo={eventInfo} />
);

const MyComponent = ({ eventInfo }: { eventInfo: EventContentArg }) => {
  const tasks = useStore($tasks);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const task = tasks.find((t) => t.name === eventInfo.event.title)!;
  const day = eventInfo.event.startStr.split('T')[0];

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
        <Box
          component='i'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {eventInfo.event.title}
        </Box>
      </Button>

      {task && (
        <TaskModal
          open={open}
          onClose={handleClose}
          task={task}
          day={day}
          onComplete={() => {
            task.days[day].status =
              task.days[day].status === 'completed' ? 'none' : 'completed';
            updateTask(task);
          }}
          onCancel={() => {
            task.days[day].status =
              task.days[day].status === 'failed' ? 'none' : 'failed';
            updateTask(task);
          }}
        />
      )}
    </>
  );
};
