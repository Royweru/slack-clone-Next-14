import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { LucideIcon } from 'lucide-react'

import { cva, VariantProps } from 'class-variance-authority'

import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { cn } from '@/lib/utils'

const SidebarItemVariants = cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden ",
    {
        variants:{
            variant:{
                default:"text-[#f9edffcc]",
                active:"text-[#481349] bg-white/90 hover:bg-white/90"
            }
        },
        defaultVariants:{
            variant:"default"
        }
    }
)

interface SidebarItemProps{
    label:string,
    id:string,
    icon:IconType|LucideIcon,
    variant?:VariantProps<typeof SidebarItemVariants>["variant"]
}

export const SidebarItem = ({
    label,
    id,
    icon:Icon,
    variant,
}:SidebarItemProps) => {
    const workspaceId = useWorkspaceId()
  return (
   <Button
    variant={"transparent"}
    size={"sm"}
    asChild
    className={cn(SidebarItemVariants({variant}))}
   >
     <Link href={`/workspace/${workspaceId}/channel/${id}`}>
     <Icon  className=' size-3.5 mr-1 shrink-0'/>
     <span className=' text-sm  truncate'> 
        {label}
     </span>
     </Link>
   </Button>
  )
}
