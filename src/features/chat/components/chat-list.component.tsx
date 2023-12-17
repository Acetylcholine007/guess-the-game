'use client';

import React, { useCallback, useRef } from 'react';
import ChatItem from './chat-item.component';
import { mockChats } from '../mocks/chat.mocks';

export interface ChatListProps {}

const ChatList: React.FC<ChatListProps> = (props) => {
  const {} = props;
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {},
    []
  );

  return (
    <div className="col-span-1 flex flex-col gap-1 sm:col-span-2">
      <h2>Chat</h2>
      <div className="card-flat">
        <div className="flex h-[11.25rem] flex-col-reverse gap-2 overflow-y-auto p-4">
          {mockChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
        <form
          ref={formRef}
          className="flex items-center gap-2 bg-slate-700 p-2"
          onSubmit={submitHandler}
        >
          <input type="text" name="message" className="grow" />
          <button type="submit">Start</button>
        </form>
      </div>
    </div>
  );
};

export default ChatList;
