interface Achievement {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  achievements: Achievement[];
}

export const users: User[] = [
  {
    id: 1,
    email: 'test@gmail.com',
    password: 'test',
    nickname: 'Deal',
    achievements: [],
  },
];
