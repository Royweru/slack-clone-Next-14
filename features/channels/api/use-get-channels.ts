import { api } from "@/convex/_generated/api";

import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface UseGetChannelProps{
    workspaceId:Id<"workspaces">
}

export const useGetChannels = ({workspaceId}:UseGetChannelProps)=>{
   const data = useQuery(api.channels.get,{workspaceId})
   const isLoading = data===null

   return {data ,isLoading}
}