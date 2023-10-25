import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
        },
        variables: {
          colorPrimary: "black",
          colorDanger: "black",
          colorSuccess: "black",
          colorWarning: "black",
          colorAlphaShade: "black",
        },
      }}
    />
  );
}
