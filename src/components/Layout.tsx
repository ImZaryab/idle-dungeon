import { SignOutButton } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import useStore from "../store";
import { Toaster } from "sonner";

const Layout = () => {
  const reset = useStore((state) => state.reset);

  const handleSignOut = () => {
    reset();
  };

  return (
    <>
      <div className="absolute top-0 right-0 z-10 text-black">
        <SignOutButton redirectUrl="/login">
          <button
            style={{ fontSize: "1.25rem" }}
            className="hover:cursor-pointer py-2 px-6 bg-slate-400 border-2 border-black"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </SignOutButton>
      </div>
      <Toaster />
      <Outlet />
    </>
  );
};

export default Layout;
