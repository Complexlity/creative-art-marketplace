import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Bell } from "lucide-react";
import { FC } from "react";

import useMessages from "~/hooks/useMessages";
import { Message } from "~/utils/types";
import { supabaseWithClient as supabaseClient } from "supabase";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface MessagesButtonProps {}
type ReduceReturnType = { unreadMessages: Message[]; count: number };

const COLUMNS = ["type", "item", "amount", "status"];

export default function MessagesButton2() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <div className="">
      <div
        onClick={() => {
          onOpen();
        }}
      >
        <div className="relative mx-auto w-fit cursor-pointer rounded-full p-1 hover:bg-gray-700">
          <Bell />

          {count > 0 ? (
            <div className="min-h-4 min-w-4 absolute -top-[0px] left-[calc(100%-10px)] flex items-center  justify-center rounded-full bg-blue-400 px-1 text-xs">
              {count}
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        className="text-foreground dark"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
				classNames={{
					body: "pb-6 px-0",
					header: "pb-0",
          backdrop: "bg-primary/10 backdrop-opacity-10",
          base: "border-[#292f46] bg-gray-900 dark:bg-indigo-950 text-orange",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                Messages
              </ModalHeader>
              <ModalBody>
                <Table
                  shadow="none"
                  radius="none"
                  classNames={{
                    base: "[&>*]:bg-transparent [&>*]:bg-none"
                  }}
                  aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Type</TableColumn>
        <TableColumn>Item</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>+-Bal(fees)</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"You have no messages"}>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>

              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary"  onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
