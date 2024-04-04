"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

export default function Home() {
  const createFile = useMutation(api.storefiles.createFile);
  const files = useQuery(api.storefiles.getFiles);

  const handleFileStore = () => {
    createFile({
      name: "Hello World3",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
      <Button onClick={handleFileStore}>Upload File</Button>
    </main>
  );
}
