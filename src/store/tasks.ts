import { createEvent, createStore } from 'effector';

export type Status = 'none' | 'completed' | 'failed';

export interface Category {
  id: number;
  name: string;
}

export const $categories = createStore<Category[]>([
  {
    id: 1,
    name: 'University',
  },
  {
    id: 2,
    name: 'Work',
  },
]);

export interface Task {
  id: number;
  name: string;
  description: string;
  difficulty: null | number;
  categories: {
    [cId: number]: Status;
  };
  days: {
    [day: string]: {
      status: Status;
      time: string | null;
    };
  };
}

export const $tasks = createStore<Task[]>([
  {
    id: 1,
    name: 'Task 1',
    description: 'Very important first task',
    difficulty: 3.5,
    categories: {
      1: 'completed',
      2: 'failed',
    },
    days: {
      '2023-04-11': {
        status: 'failed',
        time: null,
      },
      '2023-06-05': {
        status: 'completed',
        time: '18:30',
      },
      '2023-06-08': {
        status: 'failed',
        time: '14:25',
      },
    },
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Super ultra important second task!!!',
    difficulty: 1,
    categories: {
      2: 'completed',
    },
    days: {
      '2023-04-11': {
        status: 'failed',
        time: null,
      },
      '2023-06-05': {
        status: 'completed',
        time: '07:15',
      },
      '2023-06-07': {
        status: 'none',
        time: '13:20',
      },
    },
  },
  {
    id: 3,
    name: 'Прочитати документацію',
    description: 'Lorem ipsum description',
    difficulty: 4.5,
    categories: {
      2: 'none',
    },
    days: {},
  },
  {
    id: 4,
    name: 'Task 3',
    description: 'Lorem ipsum description',
    difficulty: 5,
    categories: {
      1: 'none',
      2: 'failed',
    },
    days: {
      '2023-04-11': {
        status: 'failed',
        time: null,
      },
      '2023-06-22': {
        status: 'none',
        time: '05:15',
      },
      '2023-06-13': {
        status: 'completed',
        time: '13:20',
      },
    },
  },
  {
    id: 5,
    name: 'Вигуляти собаку',
    description: 'Кожної суботи вигулювати вранці собаку',
    difficulty: 3,
    categories: {},
    days: {
      '2023-05-06': {
        status: 'completed',
        time: '07:15',
      },
      '2023-05-13': {
        status: 'completed',
        time: '07:15',
      },
      '2023-05-20': {
        status: 'completed',
        time: '07:15',
      },
      '2023-05-27': {
        status: 'failed',
        time: '07:15',
      },
      '2023-06-03': {
        status: 'completed',
        time: '07:15',
      },
      '2023-06-10': {
        status: 'failed',
        time: '07:15',
      },
      '2023-06-17': {
        status: 'completed',
        time: '07:15',
      },
      '2023-06-24': {
        status: 'none',
        time: '07:15',
      },
      '2023-07-01': {
        status: 'none',
        time: '07:15',
      },
    },
  },
]);

export const addTask = createEvent<Task>();
$tasks.on(addTask, (tasks, newTask) => [...tasks, newTask]);

export const updateTask = createEvent<Task>();
$tasks.on(updateTask, (tasks, updatedTask) =>
  tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
);

export const deleteTask = createEvent<number>();
$tasks.on(deleteTask, (tasks, taskId) => tasks.filter((t) => t.id !== taskId));
