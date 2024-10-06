"use client";

import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use- get-workspace-info";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useJoin } from "@/features/workspaces/api/use-join";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";

import VerificationInput from "react-verification-input";
import { toast } from "sonner";

interface JoinPageProps {
  params: {
    workspaceId: Id<"workspaces">;
  };
}
const JoinPage = ({ params }: JoinPageProps) => {
  const router = useRouter();
  const { mutate, isPending } = useJoin();
  const { data, isLoading } = useGetWorkspaceInfo({ id: params.workspaceId });

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  useEffect(() => {
    if (isMember) router.push(`/workspace/${params.workspaceId}`);
  }, [isMember, router, params.workspaceId]);

  const handleComplete = (value: string) => {
    mutate(
      { workspaceId: params.workspaceId, joinCode: value },
      {
        onSuccess(id) {
          router.replace(`/workspace/${id}`);
          toast.success("Workspace joined");
        },
        onError() {
          toast.error("Failed to join workspace");
        },
      }
    );
  };
  if (isLoading)
    return (
      <div className=" h-full flex items-center justify-center ">
        <Loader className=" size-6 animate-spin text-muted-foreground" />
      </div>
    );
  return (
    <div className=" h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
      <Image src={"/logo.svg"} alt="Logo" width={60} height={60} />
      <div
        className=" flexc flex-col gaoy4
         items-center justify-center max-w-md"
      >
        <div className=" flex flex-col gap-y-2 items-center justify-center">
          <h1 className=" text-2xl font-bold">Join workspace</h1>
          <p
            className="
                text-md text-muted-foreground"
          >
            Enter the workspace name to join
          </p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className=" flex gap-x-4">
        <Button size={"lg"} variant={"outline"} asChild>
          <Link href={"/"}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
