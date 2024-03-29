export interface User {
  email: string;
  nickname: string;
  exp: number;
  registeredAt: Date;
  avatar: string;
  achievements: string[]; // Array of achievement IDs
}
