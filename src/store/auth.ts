import { createEvent, createStore } from 'effector';
import { $tasks, Task, updateTask } from './tasks';

interface Achievement {
  id: number;
  name: string;
  description: string;
}

export const calculateLvl = () => {
  const exp = $user.getState()!.experience;
  const lvl = Math.floor(exp / 100) + 1;
  return lvl;
};

const calculateExp = (tasks: Task[]) => {
  let exp = 0;
  tasks.forEach((t) => {
    // Sum all completed daily tasks
    Object.values(t.days).forEach((info) => {
      if (info.status !== 'completed') return;
      exp += 8 * (t.difficulty || 0.5);
    });

    // Sum all completed category tasks
    Object.values(t.categories).forEach((status) => {
      if (status !== 'completed') return;
      exp += 12 * (t.difficulty || 0.5);
    });
  });
  console.log(exp);
  return exp;
};

export const calculateExpPercentage = () => {
  const exp = $user.getState()!.experience;
  const lvl = calculateLvl();
  return exp - 100 * (lvl - 1);
};

export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  achievements: Achievement[];
  experience: number;
}

export const users: User[] = [
  {
    id: 1,
    email: 'test@gmail.com',
    password: 'test',
    nickname: 'Deal',
    achievements: [],
    experience: calculateExp($tasks.getState()),
  },
];

export const updateUser = createEvent<User | null>();

export const $user = createStore<User | null>(users[0]).on(
  updateUser,
  (_, newUser) => newUser
);

// Recalculate user experience after task update
$user.on(updateTask, (user) => {
  return {
    ...user!,
    experience: calculateExp($tasks.getState()),
  };
});
