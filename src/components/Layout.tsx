import { SignOutButton } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div className="absolute top-0 right-0 z-10 text-black">
        <SignOutButton>
          <button style={{ fontSize: "1.25rem" }} className="hover:cursor-pointer py-2 px-6 bg-slate-400 border-2 border-black">
            Sign out
          </button>
        </SignOutButton>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
