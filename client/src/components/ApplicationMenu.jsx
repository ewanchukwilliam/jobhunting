import { LucideEdit, LucideView, LucideX } from "lucide-react";
import { FaAngleDown, FaEdit, FaNewspaper } from "react-icons/fa";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ApplicationMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          Options
          <FaAngleDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-accent group-hover:text-white">Application Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 items-center group">
          <LucideView className="text-accent group-hover:text-white" />
          <span>Read</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 items-center group">
          <LucideEdit className="text-accent group-hover:text-white" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 items-center group">
          <LucideX className="text-accent group-hover:text-white" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationMenu;
