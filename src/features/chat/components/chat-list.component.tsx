'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import ChatItem from './chat-item.component';
import useAppDispatch from '@/lib/hooks/app-dispatch.hook';
import { addChat } from '@/store/slices/chat.slice';
import useAppSelector from '@/lib/hooks/app-selector.hook';
import { v4 as uuidv4 } from 'uuid';
import { RoundOutcome } from '@/lib/data/slice.models';
import {
  mockLosingMessages,
  mockLostMessages,
  mockWinningMessages,
} from '../mocks/chat.mocks';
import { randomNumberFromRange } from '@/lib/utils/random.utils';

export interface ChatListProps {}

const ChatList: React.FC<ChatListProps> = (props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const { players, roundOutcomes, round } = useAppSelector(
    (store) => store.game
  );
  const { chats } = useAppSelector((store) => store.chat);

  useEffect(() => {
    players.forEach((player, index) => {
      if (/^CPU [1-4]$/.test(player.name)) {
        const mockMessagePool =
          roundOutcomes[index] === RoundOutcome.WINNING
            ? mockWinningMessages
            : roundOutcomes[index] === RoundOutcome.LOSING
              ? mockLosingMessages
              : mockLostMessages;
        if (
          roundOutcomes[index] === RoundOutcome.WINNING ||
          roundOutcomes[index] === RoundOutcome.LOST ||
          Math.random() >= 0.3
        )
          setTimeout(() => {
            dispatch(
              addChat({
                id: uuidv4(),
                user: player,
                message:
                  mockMessagePool[
                    randomNumberFromRange(0, mockMessagePool.length - 2)
                  ],
              })
            );
          }, Math.random() * 5000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = formRef.current?.checkValidity();
      if (!isValid) return;
      const formData = new FormData(e.currentTarget);

      dispatch(
        addChat({
          id: uuidv4(),
          user: players[0],
          message: formData.get('message') as string,
        })
      );
      formRef.current?.reset();
    },
    [dispatch, players]
  );

  return (
    <div className="col-span-1 flex flex-col gap-1 sm:col-span-2">
      <h2>Chat</h2>
      <div className="card-flat">
        <div className="flex h-[11.25rem] flex-col-reverse gap-2 overflow-y-auto p-4">
          {chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
        <form
          ref={formRef}
          className="flex items-center gap-2 bg-slate-700 p-2"
          onSubmit={submitHandler}
        >
          <input
            autoComplete="off"
            required
            type="text"
            name="message"
            className="grow"
          />
          <button type="submit" disabled={players.length === 0}>
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatList;
