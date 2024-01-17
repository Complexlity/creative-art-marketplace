import { useAuth } from "@clerk/nextjs";
import useCurrentUser from "~/hooks/useCurrentUser";
import { CircleDollarSign } from "lucide-react";
import MktIcon from "../MktIcon";

const CurrencyButton = () => {
  const { data: user } = useCurrentUser({})

  if(!user) return
  return (
    <div className="flex items-center gap-1">
      <MktIcon />
      <p className="text-2xl">
      {user.game_currency}
      </p>
    </div>
  );
}

export default CurrencyButton;