
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { PencilLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <PencilLine className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold">
            SEO Blog Creator
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link to="/create">
            <Button>Create New Post</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
