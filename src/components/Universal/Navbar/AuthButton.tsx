import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import CurrencyButton from "./CurrencyButton";
import MessagesButton from "./MessagesButton";
import PendingBidsButton from "./PendingBidsButton";
import TransactionsButton from "./TransactionsButton";
export default function AuthButton() {
  const pathname = usePathname();

  return (
    <>
      <SignedIn>
        {/* Mount the UserButton component */}
        <div className="lg:flex gap-4 grid">
          <div className="flex gap-4">
        <PendingBidsButton />
          {/* <MessagesButton /> */}
          <TransactionsButton />
          <CurrencyButton />
          </div>
        <UserButton showName={true} afterSignOutUrl={pathname} />
        </div>
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton
          mode="modal"
          afterSignUpUrl={pathname}
          afterSignInUrl={pathname}
        >
          <button className="cursor-pointer rounded-full bg-primary px-8 py-1 font-bold text-gray-800">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
