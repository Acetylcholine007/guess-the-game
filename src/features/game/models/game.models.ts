export interface IUser {
  name: string;
  points: number;
  bet?: IBet;
}

export interface IBet {
  multiplier: number;
  points: number;
}
