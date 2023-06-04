import { MainSection } from '@/components/MainSection';
import { Sidebar } from '@/components/Sidebar';
import { WelcomeSection } from '@/components/WelcomeSection';
import { $user } from '@/store/auth';
import { Box } from '@mui/material';
import { useStore } from 'effector-react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const user = useStore($user);

  return user ? (
    <Box component='main' display='flex' minHeight='100vh'>
      <Sidebar />
      {/* Divider */}
      <Box width='2px' bgcolor='rgba(204, 204, 204, 0.596)' flexShrink={0} />
      <MainSection />
    </Box>
  ) : (
    <WelcomeSection />
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
