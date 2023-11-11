import { CircleDollarSign } from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "~/utils/libs";

const MKT = ({className}: {className?: ClassNameValue}) => {
  return <CircleDollarSign className={cn('h-6 w-6 text-[#ffbb33]' ,className)} />;
}

export default MKT;