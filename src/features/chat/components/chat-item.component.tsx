'use client';

import { IChat } from '../models/chat.models';

export interface ChatItemProps {
  chat: IChat;
}

const ChatItem: React.FC<ChatItemProps> = (props) => {
  const { chat } = props;

  return (
    <div className="flex items-start gap-2">
      <p className="py-1">{chat.user.name}:</p>
      <div className="rounded-lg bg-slate-600 px-2 py-1">{chat.message}</div>
    </div>
  );
};

export default ChatItem;
