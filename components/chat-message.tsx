"use client"

import {FC} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";
import BotAvatar from "@/components/bot-avatar";
import {BeatLoader} from "react-spinners";
import UserAvatar from "@/components/user-avatar";
import {Button} from "@/components/ui/button";
import {Copy} from "lucide-react";

export interface ChatMessageProps {
  role: "system" | "user",
  content?: string
  isLoading?: boolean
  src?: string
}

const ChatMessage: FC<ChatMessageProps> = ({role, content, isLoading, src}) => {
  const {toast} = useToast()
  const {theme} = useTheme()

  const onCopy = () => {
    if (!content) {
      return
    }
    navigator.clipboard.writeText(content)
    toast({
      description: "Message copied to clipboard"
    })
  }

  return (
    <div className={cn(
      "group flex items-center gap-x-3 py-4 w-full",
      role === "user" && "justify-end"
    )}>
      {role !== "user" && src && <BotAvatar src={src}/>}
      <div className={"rounded-md px-4 py-2 max-2-sm text-sm bg-primary/10"}>
        {isLoading ? <BeatLoader size={5}
                                 color={theme === "light" ? "black" : "white"}/> : content}
      </div>
      {role === "user" && <UserAvatar/>}
      {role !== "user" && !isLoading && <Button onClick={onCopy}
                                                className={"opacity-0 group-hover:opacity-100 transition"} size={"icon"}
                                                variant={"ghost"}>
          <Copy className={"h-4 w-4"}/>
      </Button>}
    </div>
  );
}

export default ChatMessage

