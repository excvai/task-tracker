import { User } from '@/data/users';
import { createEvent, createStore } from 'effector';

export const updateUser = createEvent<User | null>();

export const $user = createStore<User | null>(null).on(
  updateUser,
  (_, newUser) => newUser
);
