import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './slices/chat.slice';
import gameSlice from './slices/game.slice';

export const store = configureStore({
  reducer: {
    [gameSlice.name]: gameSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
