import { Mail } from "lucide-react";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import useMessages from "~/hooks/useMessages";
import { Message } from "~/utils/types";


interface MessagesButtonProps {}
type ReduceReturnType = { unreadMessages: Message[]; count: number }

const MessagesButton: FC<MessagesButtonProps> = () => {
  const { data: messages } = useMessages()
  if (!messages || messages.length === 0) return null;
  const {
    unreadMessages,
    count,
  }  = messages.reduce<ReduceReturnType>(
    (acc, curr) => {
      if (curr.status == "unread") {
        acc.unreadMessages.push(curr);
        acc.count++;
      }
      return acc;
    },
    { unreadMessages: [], count: 0 }
  );
  return (
    <Dialog>
      <DialogTrigger onClick={() => {console.log('hello')}}>
        <div className="relative mx-auto w-fit rounded-full p-1 hover:bg-gray-700">
          <Mail />
          <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
            {count}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center ">Messages</DialogTitle>
          <DialogDescription>
            <div className=" grid rounded-xl gap-1">
              {messages?.map((message) => (
                <div className={`${message.status === 'unread' ? "border-2 border-collapse bg-amber-50 border-primary opacity-[90%]" : ""} text-black p-4 rounded-md`}>
                  {message.content}
              </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesButton;
