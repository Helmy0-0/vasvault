"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  user:{
    id: string;
    email: string;
  }
}

export default function Navbar({ user }: NavbarProps) {

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
      <Link href="/" className="text-xl font-bold text-neutral-800 dark:text-white">
        Vasvault
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {user.email}
            </span>
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
