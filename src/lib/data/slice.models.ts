import { IChat } from '@/features/chat/models/chat.models';
import { IUser } from '@/features/game/models/game.models';

export interface IUserState {
  user?: IUser;
}

export interface IChatState {
  chats: IChat[];
}

export interface IGameState {
  status: 'betting' | 'calculating';
  players: IUser[];
  round: number;
  speed: number;
  outcomeMultiplier?: number;
  roundOutcomes: RoundOutcome[];
}

export enum RoundOutcome {
  NONE = 'NONE',
  WINNING = 'WINNING',
  LOSING = 'LOSING',
  LOST = 'LOST',
}
