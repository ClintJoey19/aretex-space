"use client";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignInButton = ({ onClick }) => {
  return (
    <Button variant="outline" onClick={() => signIn("google")}>
      <FcGoogle className="mr-4" /> Sign in with Google
    </Button>
  );
};

export default SignInButton;
