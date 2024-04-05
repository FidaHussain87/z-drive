"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { organization } = useOrganization();
  const createFile = useMutation(api.storefiles.createFile);
  const files = useQuery(
    api.storefiles.getFiles,
    organization?.id ? { orgId: organization.id } : "skip"
  );

  const handleFileStore = () => {
    if (!organization) return;
    createFile({
      name: "Hello World3",
      orgId: organization?.id,
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
