"use client"
import { Button } from "@/components/ui/button";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";

export default function Home() {
  const {signOut} = useAuthActions()
  return (
    <div>
      Logged in  
      <Button onClick={()=>signOut()}>
         SIgn Out
      </Button>
    </div>
  )
}
