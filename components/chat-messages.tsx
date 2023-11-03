"use client"

import {Companion} from "@prisma/client";
import {ElementRef, FC, useEffect, useRef, useState} from "react";
import ChatMessage, {ChatMessageProps} from "@/components/chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[]
  isLoading: boolean
  companion: Companion
}

const ChatMessages: FC<ChatMessagesProps> = ({messages, isLoading, companion}) => {
  const scrollRef = useRef<ElementRef<"div">>(null)

  const [fakeLoading, setFakeLoading] = useState(messages.length === 0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [messages.length])

  return (
    <div className={"flex-1 overflow-auto pr-4"}>
      <ChatMessage src={companion.src}
                   isLoading={fakeLoading}
                   role={"system"}
                   content={`Hello,I am ${companion.name}, ${companion.description}`}/>
      {messages.map((message) => {
        return <ChatMessage role={message.role} key={message.content} content={message.content} src={message.src}/>
      })}
      {isLoading && (
        <ChatMessage role={"system"} src={companion.src} isLoading/>
      )}
      <div ref={scrollRef}/>
    </div>
  );
}

export default ChatMessages

