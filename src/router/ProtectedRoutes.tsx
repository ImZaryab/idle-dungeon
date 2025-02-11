import { SignOutButton } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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

export default ProtectedRoute;
