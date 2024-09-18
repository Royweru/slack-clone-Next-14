"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface HintProps{
   label:string,
   children:React.ReactNode,
   side?:"top"|"right"|"bottom"|"left",
   align?:"start"|"center"|"end"
}

import React from 'react'

export const Hint = ({
    label,children,side,align
}:HintProps) => {
  return (
   <TooltipProvider>
    <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className=" bg-black text-white">
             <p className=" font-medium text-xs">
                {label}
             </p>
        </TooltipContent>
    </Tooltip>
   </TooltipProvider>
  )
}
