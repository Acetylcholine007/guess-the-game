import { IUser } from '@/features/game/models/game.models';

export interface IChat {
  id: string;
  user: IUser;
  message: string;
}
