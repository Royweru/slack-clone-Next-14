"use client"
import React, { useState } from "react";
import { Card, CardDescription, CardHeader,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SignUpCardProps{
  setState:(state:SignInFlow)=>void
}
export const SignUpCard = ({setState}:SignUpCardProps) => {

  const[email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPwd,setConfirmPwd] = useState("")

  return ( 
   <Card className=" w-full h-full p-8">
     <CardHeader className=" px-0 pt-0">
      Sign Up to continue
     </CardHeader>
     <CardDescription>
      Use your email or another service to continue
     </CardDescription>
     <CardContent className=" relative space-y-5 px-0 pb-0">
       <form action="" className=" space-y-2.5 relative">
         <Input
           disabled={false}
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           placeholder="email"
           type="email"
           required
           />
         <Input
           disabled={false}
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           placeholder="Password"
           type="password"
           required
           />
         <Input
           disabled={false}
           value={confirmPwd}
           onChange={(e)=>setConfirmPwd(e.target.value)}
           placeholder="Confirm password"
           type="password"
           required
           />
           <Button
            type="submit"
            className=" w-full"
            size={'lg'}
            disabled={false}
            >
            Continue
           </Button>
       </form>
       <Separator />
       <div className=" flex flex-col gap-y-2.5">
         <Button
          disabled={false}
          onClick={()=>{}}
          variant={"outline"}
          size={"lg"}
          className=" w-full relative"
         >
          <FcGoogle  className=" size-5 absolute top-2.5
           left-2.5"/>
           Continue with google
         </Button>
         <Button
          disabled={false}
          onClick={()=>{}}
          variant={"outline"}
          size={"lg"}
          className=" w-full relative"
         >
          <FaGithub className=" size-5 absolute top-2.5 left-2.5"/>
           Continue with Github
         </Button>
       </div>
       <p className=" text-xs text-muted-foreground">
         Already have an account ? 
         <span className=" text-sky-700 hover:underline cursor-pointer" onClick={()=>setState("signIn")}> Sign in</span>
       </p>
     </CardContent>
   </Card>
  )
};
