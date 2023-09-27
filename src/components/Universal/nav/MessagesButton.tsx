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


interface MessagesButtonProps {}

const MessagesButton: FC<MessagesButtonProps> = () => {
  const { userId } = useAuth();
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const data = await getMessages(userId!);
      return data;
    },
  });


  console.log(messages)
  if (!messages || messages.length === 0) return null;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative mx-auto w-fit rounded-full p-1 hover:bg-gray-700">
          <Mail />
          <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
            {messages.length}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-center">Pending Bids</DialogTitle>
          <DialogDescription>
            <div className=" grid gap-4 rounded-xl">
              {messages?.map((bid) => (
                "Hello world"
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesButton;
