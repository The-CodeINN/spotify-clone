"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome, HiSearch } from "react-icons/hi";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    // Handle logout logic here
    const { error } = await supabaseClient.auth.signOut();
    // Reset any playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully!");
    }
  };
  return (
    <div
      className={twMerge(
        `
                  h-fit
                  bg-gradient-to-b
                  from-emerald-800
                  p-6
          `,
        className
      )}
    >
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => router.back()}
            className='rounded-full bg-black items-center justify-center hover:opacity-75 transition'
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            onClick={() => router.forward()}
            className='rounded-full bg-black items-center justify-center hover:opacity-75 transition'
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome size={20} className='text-black' />
          </button>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiSearch size={20} className='text-black' />
          </button>
        </div>

        <div className='flex justify-between items-center gap-x-4'>
          {user ? (
            <div className='flex gap-x-4 items-center'>
              <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                Logout
              </Button>
              <Button
                className='bg-white'
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className='bg-transparent text-neutral-300 font-medium'
                >
                  Signup
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className='px-6 py-2 bg-white'
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
