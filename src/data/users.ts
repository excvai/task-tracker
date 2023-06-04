interface Achievement {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  nickname: number;
  achievements: Achievement[];
}

export const users: User[] = [];
