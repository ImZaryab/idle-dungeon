import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import { IUser } from "../../store/types";
import { useGetUserData } from "../../controllers/user";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const setUser = useStore((state) => state.setAuthUser);

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/login");
    }
    if (user) {
      const authUserObj: IUser = {
        id: user?.primaryEmailAddress?.id ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        name: user?.fullName ?? "",
        provider: user?.primaryEmailAddress?.linkedTo[0]?.type ?? "",
        verified:
          user?.emailAddresses[0].verification.status === "verified"
            ? true
            : false,
      };

      setUser(authUserObj);
    }
  }, [isLoaded, user, navigate, setUser]);

  const authUser = useStore((state) => state.authUser);

  // Automatically verify/create user in backend
  useGetUserData({
    id: authUser?.id,
    email: authUser?.email,
    name: authUser?.name,
    provider: authUser?.provider,
    isVerified: authUser?.verified,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
