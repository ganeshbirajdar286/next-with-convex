"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(() => {
      authClient.signOut({
        fetchOptions: {
          onError: (error) => {
            toast.error(error?.error?.message || "Logout failed");
          },
          onSuccess: () => {
            toast.success("Logout successfully");
            router.push("/");
          },
        },
      });
    });
  }

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button disabled={isPending} onClick={handleLogout} className="cursor-pointer">
            {isPending ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  <span>Logout</span>
                )}
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">Sign up</Link>
            <Link className={buttonVariants({ variant: "outline" })} href="/auth/login">Login</Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}