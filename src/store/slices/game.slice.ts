import { IGameState, RoundOutcome } from '@/lib/data/slice.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { randomNumberFromRange } from '@/lib/utils/random.utils';

const initialState: IGameState = {
  players: [],
  status: 'betting',
  round: 1,
  speed: 1,
  roundOutcomes: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializePlayers: (state, action: PayloadAction<string>) => {
      state.players = [
        {
          name: action.payload,
          points: 1000,
          bet: { multiplier: 1, points: 50 },
        },
        { name: 'CPU 1', points: 1000 },
        { name: 'CPU 2', points: 1000 },
        { name: 'CPU 3', points: 1000 },
        { name: 'CPU 4', points: 1000 },
      ];
    },
    changeSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    placeBet: (
      state,
      action: PayloadAction<{ multiplier: number; points: number }>
    ) => {
      state.players = state.players.map((player, index) => {
        if (index === 0)
          return {
            ...player,
            points: player.points - action.payload.points,
            bet: action.payload,
          };

        const multiplier =
          player.points === 0 ? 0 : randomNumberFromRange(0, 9, 2);
        const points = randomNumberFromRange(
          player.points === 0 ? 0 : 1,
          player.points
        );
        return {
          ...player,
          points: player.points - points,
          bet: { multiplier, points },
        };
      });
      state.status = 'calculating';
      state.outcomeMultiplier = randomNumberFromRange(0, 9, 2);
    },
    calculateResult: (state) => {
      state.players = state.players.map((player, index) => {
        if (player.bet && player.bet?.multiplier === state.outcomeMultiplier) {
          state.roundOutcomes[index] = RoundOutcome.WINNING;
          return {
            ...player,
            points: player.points + player.bet.points * state.outcomeMultiplier,
          };
        } else {
          state.roundOutcomes[index] =
            player.points === 0 ? RoundOutcome.LOST : RoundOutcome.LOSING;
          return player;
        }
      });
      state.status = 'betting';
      state.round++;
      state.players;
    },
    reset: (state) => {
      state.players = [
        {
          name: state.players[0].name,
          points: 1000,
          bet: { multiplier: 1, points: 50 },
        },
        { name: 'CPU 1', points: 1000 },
        { name: 'CPU 2', points: 1000 },
        { name: 'CPU 3', points: 1000 },
        { name: 'CPU 4', points: 1000 },
      ];
      state.round = 1;
    },
  },
});

export const {
  changeSpeed,
  calculateResult,
  initializePlayers,
  placeBet,
  reset,
} = gameSlice.actions;

export default gameSlice;
