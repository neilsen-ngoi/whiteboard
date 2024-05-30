"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const EmptyOrg = () => {
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <Image src={"/elements.svg"} alt="empty" height={200} width={200} />
      <h2 className=" text-2xl font-semibold mt-6">Welcome to WhiteBoard</h2>
      <p className=" text-muted-foreground text-sm mt-2">
        Create and organization to get started
      </p>
      <div className=" mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>Create an organization</Button>
          </DialogTrigger>
          <DialogContent className=" p-0 bg-transparent border-none">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrg;
