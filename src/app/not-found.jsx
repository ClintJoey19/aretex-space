import React from "react";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/global/Section";
import Container from "@/components/global/Container";

const NotFound = () => {
  return (
    <Section className="h-[100vh] w-full justify-center items-center">
      <Container className="flex flex-col justify-center items-center h-full relative gap-4">
        <Image src="not-found.svg" alt="not-found" width={400} height={300} />
        <Link href="/" className="hover:text-primary transition-colors">
          Back to Home
        </Link>
      </Container>
    </Section>
  );
};

export default NotFound;
