import { IUser } from '@/features/game/models/game.models';

export interface IChat {
  id: number;
  user: IUser;
  message: string;
}
