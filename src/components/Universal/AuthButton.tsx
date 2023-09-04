import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { truncate } from "fs";

import { usePathname } from "next/navigation";

export default function AuthButton() {
  const pathname = usePathname()

  return (
    <>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton showName={true} afterSignOutUrl={pathname} />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton
          mode="modal"
          afterSignUpUrl={pathname}
          afterSignInUrl={pathname}
        >
          <button className="cursor-pointer font-bold rounded-full bg-primary px-8 py-1 text-gray-800">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
