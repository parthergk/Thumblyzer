"use client";
import UrlInput from "../components/UrlInput";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <main className="bg-[#212121] text-white min-h-screen flex flex-col justify-center items-center">
        <div className=" self-start ">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <UrlInput />
      </main>
    </>
  );
}
