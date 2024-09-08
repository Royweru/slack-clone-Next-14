"use client"
import { Button } from "@/components/ui/button";
import { AuthScreen } from "@/features/auth/components/auth-screen";

import { UserButton } from "@/features/auth/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";

import Image from "next/image";

export default function Home() {

  const {signOut} = useAuthActions()
  return (
    <div className=" w-full flex ">
      Logged in  
      <UserButton />
    
    </div>
  )
}
