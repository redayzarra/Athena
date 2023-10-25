import { ModeToggle } from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="flex">
      {/* {!isAuth ? (
        <Link href="/sign-in">
          <Button variant="ghost">Sign In</Button>
        </Link>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
      <ModeToggle /> */}
    </div>
  );
}
