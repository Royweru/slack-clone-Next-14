"use client";
import React from "react";
import { Toolbar } from "./_components/toolbar";
import { Sidebar } from "./_components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./_components/workspace-sidebar";

const workspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full w-full ">
      <Toolbar />
      <div className=" flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup 
        autoSaveId="ca-workspace-layout"
      direction="horizontal"
      
      >
          <ResizablePanel
           defaultSize={25}
           
           minSize={11}
           className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default workspaceLayout;
