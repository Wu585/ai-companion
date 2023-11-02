"use client"

import {Companion} from "@prisma/client";
import {FC} from "react";
import ChatMessage, {ChatMessageProps} from "@/components/chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[]
  isLoading: boolean
  companion: Companion
}

const ChatMessages: FC<ChatMessagesProps> = ({messages, isLoading, companion}) => {
  return (
    <div className={"flex-1 overflow-auto pr-4"}>
      <ChatMessage src={companion.src}
                   isLoading={isLoading}
                   role={"system"}
                   content={`Hello,I am ${companion.name}, ${companion.description}`}/>
    </div>
  );
}

export default ChatMessages

