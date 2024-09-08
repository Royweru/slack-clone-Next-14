"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useAuthActions } from "@convex-dev/auth/react";
import { SignInFlow } from "../types";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const router = useRouter()
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if( password!==confirmPwd){ 
      setError("Passwords don't match")
      return;
    }
    setPending(true)
    signIn("password",{name,email,password,flow:"signUp"})
    .then(()=>{
      router.push("/")
    })
    .catch(()=>{
      setError("Something went wrong")
    }).finally(()=>{
      setPending(false)
    })
  };

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true)
    signIn(value).finally(()=>{
      setPending(false)
    });
  };

  return (
    <Card className=" w-full h-full p-8">
      <CardHeader className=" px-0 pt-0">
        <CardTitle>Sign Up to register</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className=" bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
          <p>
            {error}
          </p>
        </div>
      )}
      <CardContent className=" relative space-y-5 px-0 pb-0">
        <form 
        action=""
         className=" space-y-2.5 relative"
          onSubmit={onPasswordSignUp}
         >
            <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            type="email"
            required
          />
        
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
          />
          <Button
            type="submit"
            className=" w-full"
            size={"lg"}
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className=" flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("google")}
            variant={"outline"}
            size={"lg"}
            className=" w-full relative"
          >
            <FcGoogle
              className=" size-5 absolute top-2.5
           left-2.5"
            />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("github")}
            variant={"outline"}
            size={"lg"}
            className=" w-full relative"
          >
            <FaGithub className=" size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className=" text-xs text-muted-foreground">
          Already have an account ?
          <span
            className=" text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            {" "}
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
