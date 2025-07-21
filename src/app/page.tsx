import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
     <SignInButton>
      <Button>Login</Button>
     </SignInButton>
     <SignUpButton>
      <Button>Signup</Button>
     </SignUpButton>
    </div>
  );
}  
