import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut } from "lucide-react";
import { UseCurrentUser } from "../hooks/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
    const {signOut} = useAuthActions()
  const { data, isLoading } = UseCurrentUser();

  if (isLoading)
    return <Loader2 className=" size-4 animate-spin text-muted-foreground" />;

  if (!data) return null;

  const { name, email, image } = data;
  const avatarFallback = name?.charAt(0).toUpperCase()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage alt={name} src={image} />
          <AvatarFallback>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className=" w-75">
        <DropdownMenuItem onClick={signOut}>
            <LogOut className=" size-4 mr-2"/>
            Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
