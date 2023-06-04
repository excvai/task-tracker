import { MainSection } from '@/components/MainSection';
import { Sidebar } from '@/components/Sidebar';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box component='main' display='flex' minHeight='100vh'>
      <Sidebar />
      {/* Divider */}
      <Box width='2px' bgcolor='rgba(204, 204, 204, 0.596)' flexShrink={0} />
      <MainSection />
    </Box>
  );
}
