export type Status = 'none' | 'completed' | 'failed';

export interface Category {
  id: number;
  name: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'University',
  },
  {
    id: 2,
    name: 'Work',
  },
];

export interface Task {
  id: number;
  name: string;
  description: string;
  difficulty: null | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  categories: {
    [cId: number]: Status;
  };
  days: {
    [day: string]: Status;
  };
}

export const tasks: Task[] = [
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
      '06/05/2023': 'completed',
    },
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Super ultra important second task!!!',
    difficulty: null,
    categories: {
      2: 'completed',
    },
    days: {
      '06/05/2023': 'completed',
      '06/07/2023': 'none',
    },
  },
];
