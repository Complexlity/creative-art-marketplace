import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Bell } from "lucide-react";
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
import { supabaseWithClient as supabaseClient } from "~/supabase";

interface MessagesButtonProps {}
type ReduceReturnType = { unreadMessages: Message[]; count: number };

const MessagesButton: FC<MessagesButtonProps> = () => {
  const { data: messages } = useMessages();
  const { getToken, userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: readMessages } = useMutation({
    mutationFn: async () => {
      if (unreadMessages.length === 0) return;
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data, error } = await supabase
        .from("messages")
        .update({ status: "read" })
        .eq("user_id", userId!)
        .select();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
  if (!messages || messages.length === 0) return <p></p>;
  const { unreadMessages, count } = messages.reduce<ReduceReturnType>(
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
      {/* @ts-ignore passing mutation to onclick */}
      <DialogTrigger onClick={readMessages}>
        <div className="relative mx-auto w-fit rounded-full p-1 hover:bg-gray-700">
          <Bell />

          {count > 0 ? (
            <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
              {count}
            </div>
          ) : null}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center ">Messages</DialogTitle>
          <DialogDescription>
            <div className=" grid gap-1 rounded-xl">
              {messages?.map((message, index) => (
                <div
                  key={`${messages}${index}`}
                  className={`${
                    message.status === "unread"
                      ? "border-collapse border-2 border-primary bg-amber-50 opacity-[90%]"
                      : ""
                  } rounded-md p-4 text-black`}
                >
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
