import {FC} from "react";
import {auth, redirectToSignIn} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import {redirect} from "next/navigation";
import ChatClient from "@/app/(chat)/(routes)/chat/[chatId]/components/client";

interface ChatIdPageProps {
  params: {
    chatId: string
  }
}

const ChatIdPage: FC<ChatIdPageProps> = async ({params}) => {
  const {userId} = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId
        }
      },
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  if (!companion) {
    return redirect('/')
  }

  return (
    <ChatClient companion={companion}/>
  );
}

export default ChatIdPage

