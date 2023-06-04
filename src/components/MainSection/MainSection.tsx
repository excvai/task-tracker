import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GridViewIcon from '@mui/icons-material/GridView';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Clock } from '../Clock';
import { Calendar } from './Calendar';
import { Categories } from './Categories';

export const MainSection = () => {
  type DisplayOptions = 'calendar' | 'grid';
  const [displayVariant, setDisplayVariant] =
    useState<DisplayOptions>('calendar');
  const toggleDisplayVariant = () => {
    setDisplayVariant((prev) => (prev === 'calendar' ? 'grid' : 'calendar'));
  };

  return (
    <Stack
      py={4}
      px={4}
      flexGrow={1}
      color='white'
      overflow='hidden'
      sx={{
        backgroundImage: 'linear-gradient(#3f474d, #2f2d38)',
      }}
    >
      <Stack direction='row' alignItems='center' mb={4}>
        <Clock width={1} />
        <Tooltip title='Change display variant'>
          <IconButton
            onClick={toggleDisplayVariant}
            color='inherit'
            size='large'
          >
            {displayVariant === 'calendar' ? (
              <CalendarTodayIcon fontSize='large' />
            ) : (
              <GridViewIcon fontSize='large' />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
      {displayVariant === 'calendar' ? <Calendar /> : <Categories />}
    </Stack>
  );
};
