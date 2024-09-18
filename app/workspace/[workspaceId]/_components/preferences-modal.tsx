import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkSpace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkSpace } from "@/features/workspaces/api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}
export const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const workspaceId = useWorkspaceId();
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog,confirm] = useConfirm("Are you sure","This action is irreversible")
  const router = useRouter()

  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkSpace();
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkSpace();

 const handleRemove =async ()=>{
    const ok = await confirm()
    if(!ok) return
    removeWorkspace({id:workspaceId},{
        onSuccess(){
            // router.replace("/")
            toast.success("Workspace has been deleted")
        },
        onError(){
            toast.error("Failed to delete workspace")
        }
    })
 }
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess() {
          toast.success("Successfully updated");
          setEditOpen(false);
        },
        onError() {
          toast.error("Fialed to update");
        },
      }
    );
  };
  return (
    <>
    <ConfirmDialog />
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className=" px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className=" px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className=" flex items-center justify-between">
                  <p className=" textsm font-semibold">Workspace Name</p>
                  <p className=" text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className=" text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Workspace</DialogTitle>
              </DialogHeader>
              <form className=" space-y-4 " onSubmit={handleEdit}>
                <Input
                  value={value}
                  disabled={isUpdatingWorkspace}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={80}
                  placeholder="Workspace name e.g 'gym'"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"} disabled={isUpdatingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={isUpdatingWorkspace} type="submit">
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <button
            disabled={false}
            onClick={handleRemove}
            className=" flex items-center gap-x-2 px5 py-4 border
             cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className=" size-4" />
            <p className=" text-sm font-semibold">Delete workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
