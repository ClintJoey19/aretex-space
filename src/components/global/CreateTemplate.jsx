"use client";
import { Button } from "../ui/button";
import { RiAddLine } from "react-icons/ri";
import Link from "next/link";

const CreateTemplate = () => {
  return (
    <Button size="md" asChild>
      <Link href="/dashboard/templates/create-template">
        <RiAddLine />
      </Link>
    </Button>
  );
};

export default CreateTemplate;
