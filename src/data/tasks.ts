type Status = 'none' | 'completed' | 'failed';

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
  difficulty: 0 | 1 | 2 | 3 | 4 | 5;
  categories: number[];
  days: {
    [k: string]: Status;
  };
}

export const tasks: Task[] = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Very important first task',
    difficulty: 3,
    categories: [1, 2],
    days: {
      '04.06.2023': 'completed',
    },
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Super ultra important second task!!!',
    difficulty: 4,
    categories: [2],
    days: {
      '03.06.2023': 'completed',
      '05.06.2023': 'none',
    },
  },
];
