import React from "react";
import Section from "@/components/global/Section";
import Container from "@/components/global/Container";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <Section className="h-[80vh] flex justify-center items-center">
      <Container className="flex justify-center items-center">
        <div className="w-[700px] flex flex-col items-center gap-5">
          <h1 className="text-6xl font-bold text-center leading-[4rem]">
            Harnessing advanced{" "}
            <span className="px-2 text-primary rounded-md">
              file management
            </span>{" "}
            for unparalleled efficiency and control
          </h1>
          <p>
            Simplify, organize, and conquer your digital workspace like never
            before.
          </p>
          <div className="flex gap-5 mt-5">
            <Button variant="outline" className="text-lg py-2 px-4">
              Learn More
            </Button>
            <Button className="text-lg py-2 px-4">Get Started</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
