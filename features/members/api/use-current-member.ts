import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

interface UseCurrentMemberProps{
    workspaceId :Id<"workspaces">
}

export const useCurrentMember= ({workspaceId}:UseCurrentMemberProps)=>{
    const data = useQuery(api.members.current,{workspaceId})
    const isLoading = data === null

    return {data,isLoading}

}