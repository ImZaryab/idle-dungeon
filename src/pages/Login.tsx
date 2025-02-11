import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <section className="min-h-screen flex justify-center items-center text-2xl">
      <SignIn />
    </section>
  );
};

export default LoginPage;
