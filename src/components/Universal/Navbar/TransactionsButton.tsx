import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { supabaseWithClient as supabaseClient } from "~/supabase";
import useTransactions from "~/hooks/useTransactions";
import { formatDate } from "~/utils/libs";
import { Transactions } from "~/utils/types";
import { toast } from "react-toastify";

interface TransactionsButtonProps {}
type ReduceReturnType = {
  unreadTransactions: Transactions[];
  count: number;
  selectedKeys: string[];
};

const COLUMNS = [
  {
    key: "created_at",
    label: "Date",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "balance_change",
    label: "+- Bal",
  },
];

export default function TransactionsButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: transactions } = useTransactions();
  const { getToken, userId } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: readTransactions } = useMutation({
    mutationFn: async () => {
      if (unreadTransactions.length === 0) return;
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data, error } = await supabase
        .from("transactions")
        .update({ read_status: "read" })
        .eq("user_id", userId!)
        .select();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });

  if (!transactions || !Array.isArray(transactions)) return <p></p>;
  const { unreadTransactions, count, selectedKeys } =
    transactions.reduce<ReduceReturnType>(
      (acc, curr) => {
        if (curr.read_status == "unread") {
          acc.unreadTransactions.push(curr);
          acc.count++;
          acc.selectedKeys.push(`${curr.id}`);
        }
        return acc;
      },
      { unreadTransactions: [], count: 0, selectedKeys: [] }
    );

  return (
    <div className="">
      <div
        onClick={() => {
          onOpen();
          readTransactions();
        }}
      >
        <div className="relative mx-auto w-fit cursor-pointer rounded-full p-1 hover:bg-gray-700">
          <ArrowLeftRight />

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
        scrollBehavior="inside"
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
              <ModalHeader className="flex flex-col">Transactions</ModalHeader>
              <ModalBody>
                <Table
                  removeWrapper
                  shadow="none"
                  radius="none"
                  aria-label="A table of all your transactions on the site"
                  color="primary"
                  selectionMode="single"
                  defaultSelectedKeys={selectedKeys}
                  classNames={{
                    thead: "rounded-none",
                    th: "text-center text-white first:rounded-none last:rounded-none",
                    td: "text-center",
                  }}
                >
                  <TableHeader
                    columns={COLUMNS}
                    className="rounded-none bg-primary"
                  >
                    {(column) => (
                      <TableColumn align="center" key={column.key}>
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    emptyContent={"You have no transactions"}
                    items={[...transactions].reverse()}
                  >
                    {(item) => (
                      <TableRow key={`${item.id}`}>
                        {(columnKey) => {
                          return (
                            <TableCell>
                              {columnKey === "status" ? (
                                <Chip
                                  color={
                                    item[columnKey] === "pending"
                                      ? "warning"
                                      : ["complete", "accepted"].includes(item[columnKey])
                                      ? "success"
                                      : "danger"
                                  }
                                  classNames={{
                                    base: "p-0 m-0",
                                  }}
                                >
                                  {item[columnKey]}
                                </Chip>
                              ) : columnKey === "created_at" ? (
                                formatDate(item[columnKey])
                              ) : (
                                //@ts-expect-error
                                item[columnKey]
                              )}
                            </TableCell>
                          );
                        }}
                      </TableRow>
                    )}
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
