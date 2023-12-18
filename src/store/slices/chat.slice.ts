import { IChat } from '@/features/chat/models/chat.models';
import { IChatState } from '@/lib/data/slice.models';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { calculateResult } from './game.slice';

const initialState: IChatState = { chats: [] };

export const userSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<IChat>) => {
      state.chats.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(calculateResult, (state, action) => {
      action.payload;
    });
  },
});

export const { addChat } = userSlice.actions;

export default userSlice;
