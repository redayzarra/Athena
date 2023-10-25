import { ModeToggle } from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex space-x-4 mt-4">
      <p className="text-3xl font-medium">Hello World</p>
      <ModeToggle />
    </div>
  );
}
