import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Container from "@/components/global/Container";
import Section from "@/components/global/Section";
import { FcGoogle } from "react-icons/fc";
import { getUser } from "@/lib/data";

const LoginPage = async () => {
  const user = await getUser("660184bb21f63fda805a2b35");
  console.log(user);
  return (
    <Section className="h-[100vh] flex justify-center item-center">
      <Container className="h-full flex justify-center items-center">
        <Card className="w-[500px] min-w-[300px] p-">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Effortlessly organize, sync, and secure your digital assets with
              our Drive Management Portal &#8209; log in now to take control.
            </CardDescription>
          </CardContent>
          <form className="mb-6 flex justify-center">
            <Button variant="outline">
              <FcGoogle className="mr-4" /> Sign in with Google
            </Button>
          </form>
        </Card>
      </Container>
    </Section>
  );
};

export default LoginPage;
