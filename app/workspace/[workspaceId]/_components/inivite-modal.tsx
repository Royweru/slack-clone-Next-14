import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Copy, RefreshCcw } from "lucide-react";
import React from "react";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirm";

export const InviteModal = ({
  open,
  setOpen,
  joinCode,
  name,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  joinCode: string;
  name: string;
}) => {
  const { mutate, isPending } = useNewJoinCode();
  const [ConfirmDialog,confirm] = useConfirm("Are you sure?",
    "This will deactivate the current invite code and generate new one.")
  const workspaceId = useWorkspaceId();
  const handleNewCode = async()=>{
    const ok = await confirm()
    if(!ok) return
    
    mutate({
        workspaceId
    },{
        onSuccess(){
            toast.success("Inivie code regenerated")
        },
        onError(){
            toast.error("Failed to generate new code")
        }
    })
  }
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied successfully"));
  };
  return (
    <>
    <ConfirmDialog />
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to your space</DialogTitle>
          <DialogDescription>
            Use code below to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col gap-y-4 items-center justify-between py-10">
          <p className=" text-4xl font-bold tracking-widest uppercase">
            {joinCode}
          </p>
          <Button variant={"ghost"} size={"sm"} onClick={handleCopy}>
            Copy Link
            <Copy className=" ml-2 size-3.5" />
          </Button>
        </div>
        <div className=" flex items-center justify-between w-full">
          <Button onClick={handleNewCode} variant={"outline"}>
            New code
            <RefreshCcw className=" size-4 ml-4" />
          </Button>

          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
