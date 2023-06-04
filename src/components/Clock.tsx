import { Typography, TypographyProps } from '@mui/material';
import { useEffect, useState } from 'react';

export const Clock = ({ ...props }: TypographyProps) => {
  const [ctime, setCtime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCtime(new Date().toLocaleTimeString());
    };

    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography variant='h4' textAlign='center' {...props}>
      {ctime}&nbsp;
    </Typography>
  );
};
