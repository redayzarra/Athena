import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

const SignInButton = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;

  return !isAuth ? (
    <Link href="/sign-in" passHref>
      <Button size="sm" variant="default">
        Sign In
      </Button>
    </Link>
  ) : (
    <UserButton afterSignOutUrl="/" />
  );
};

export default SignInButton;
