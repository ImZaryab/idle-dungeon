import { SignOutButton } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div className="absolute top-0 right-0 z-10 text-black">
        <SignOutButton>
          <button style={{ fontSize: "2rem" }} className="hover:cursor-pointer">
            Sign-Out
          </button>
        </SignOutButton>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
