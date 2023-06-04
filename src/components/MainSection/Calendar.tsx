import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';

const events = [{ title: 'Meeting', start: new Date() }];

export const Calendar = () => {
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

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>&nbsp;
      <i>{eventInfo.event.title}</i>
    </>
  );
}
