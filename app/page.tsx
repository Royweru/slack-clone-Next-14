"use client";
import { Button } from "@/components/ui/button";
import { AuthScreen } from "@/features/auth/components/auth-screen";

import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/strore/use-create-workspace-modal";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useAuthActions } from "@convex-dev/auth/react";


import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [open,setOpen] = useCreateWorkspaceModal()
  const router = useRouter()

  const { signOut } = useAuthActions();
  const { data, isLoading } = useGetWorkSpaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

useEffect(()=>{
  if(isLoading) return;

  if(workspaceId){
    router.replace(`/workspace/${workspaceId}`)
  }else if(!open){
    setOpen(true)
  }
},[workspaceId,isLoading,open,setOpen,router])

  return (
    <div className=" w-full flex ">
      Logged in
      <UserButton />
    </div>
  );
}
