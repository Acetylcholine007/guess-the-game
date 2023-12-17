import { mockUsers } from '@/features/game/mocks/game.mocks';
import { IChat } from '../models/chat.models';

export const mockChats: IChat[] = [
  { id: 1, user: mockUsers[0], message: 'Hi' },
  { id: 2, user: mockUsers[1], message: 'Yow' },
  { id: 3, user: mockUsers[2], message: 'Hello' },
  { id: 4, user: mockUsers[3], message: 'Test' },
  { id: 5, user: mockUsers[4], message: 'Ohayou' },
];
