import { User, users } from '@/data/users';
import { createEvent, createStore } from 'effector';

export const updateUser = createEvent<User | null>();

export const $user = createStore<User | null>(users[0]).on(
  updateUser,
  (_, newUser) => newUser
);
