import { theme } from '@/app/theme';
import { addTask, deleteTask } from '@/store/tasks';
import { Task } from '@/store/tasks';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket | null = null;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (socket) return;

    const URL = 'http://localhost:8080';
    socket = io(URL);

    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket?.id);
    });

    socket.on('new-task', (task: Task) => {
      console.log('New task added:', task);
      addTask(task);
    });

    socket.on('delete-task', (taskId: number) => {
      console.log('Delete task:', taskId);
      deleteTask(taskId);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Goalify</title>
        <meta name='description' content='Task tracker app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default appWithTranslation(App);
