import { useQuery } from "@tanstack/react-query";
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
import { getMessages } from "~/utils/queries";

import { useAuth } from "@clerk/nextjs";
import useSupabase from "~/hooks/useSupabaseWithAuth";


interface MessagesButtonProps {}

const MessagesButton: FC<MessagesButtonProps> = () => {
  const { userId } = useAuth();
  const supabase = useSupabase()
  if(!supabase) return null
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      let { data: messages, error } = await supabase!
        .from("messages")
        .select("*");
        return messages
    },
  });


  console.log(messages)
  if (!messages || messages.length === 0) return null;
  return (
    <Dialog>
      <DialogTrigger onClick={() => {console.log('hello')}}>
        <div className="relative mx-auto w-fit rounded-full p-1 hover:bg-gray-700">
          <Mail />
          <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
            {messages.length}
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
