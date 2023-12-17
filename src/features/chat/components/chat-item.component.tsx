'use client';

import { cn } from '@/lib/utils/tailwind.utils';
import { IChat } from '../models/chat.models';

export interface ChatItemProps {
  chat: IChat;
}

const ChatItem: React.FC<ChatItemProps> = (props) => {
  const { chat } = props;

  return (
    <div className="flex items-start gap-2">
      <p
        className={cn('py-1', {
          'text-pink-600': chat.user.name === 'CPU 1',
          'text-red-600': chat.user.name === 'CPU 2',
          'text-orange-600': chat.user.name === 'CPU 3',
          'text-yellow-600': chat.user.name === 'CPU 4',
          'text-lime-600': !/^CPU [1-4]$/.test(chat.user.name),
        })}
      >
        {chat.user.name}:
      </p>
      <div className="rounded-lg bg-slate-600 px-2 py-1">{chat.message}</div>
    </div>
  );
};

export default ChatItem;
