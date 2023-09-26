import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import PendingBidsButton from "./PendingBidsButton";
export default function AuthButton() {
  const pathname = usePathname();
  // This is here to sync the user with supabase after sign up
  // const { data: user } = useCurrentUser({})

  return (
    <>
      <SignedIn>
        {/* Mount the UserButton component */}

        <UserButton showName={true} afterSignOutUrl={pathname} />
        <PendingBidsButton />
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
