"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdCloudUpload } from "react-icons/md";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";

const templates = [
  {
    id: 1,
    name: "Template 1",
  },
  {
    id: 2,
    name: "Template 2",
  },
  {
    id: 3,
    name: "Template 3",
  },
  {
    id: 4,
    name: "Template 4",
  },
];

const CreateDialog = ({ file }) => {
  const title = `New ${file}`;
  const session = useSession();
  const [driveName, setDriveName] = useState("");
  const [template, setTemplate] = useState("");
  const { toast } = useToast();

  // fetch here the templates from the db
  // pending

  const handleSubmitDrive = async (e) => {
    e.preventDefault();

    const names = driveName.split(", ");

    for (const name of names) {
      const newDrive = {
        driveName: name,
        template,
      };

      try {
        const res = await fetch(
          "http://localhost:3000/api/dashboard/shared-drive",
          {
            method: "POST",
            body: JSON.stringify({
              newDrive,
              accessToken: session.data.accessToken,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.data.accessToken}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          toast({
            title: "Success",
            description: `${name} drive is created.`,
          });
        } else {
          const data = await res.json();
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    setDriveName("");
    setTemplate("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <MdCloudUpload className="text-xl mr-4" /> New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmitDrive}>
            <DialogTitle>{title}</DialogTitle>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <Input
                  id="name"
                  value={driveName}
                  onChange={(e) => setDriveName(e.target.value)}
                  className="col-span-3"
                  placeholder="Drive 1, Drive 2, ..."
                />
                <Select
                  value={template}
                  onValueChange={(value) => setTemplate(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Templates</SelectLabel>
                      {templates.map((temp) => (
                        <SelectItem key={temp.id} value={temp.name.toString()}>
                          {temp.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button>Create</Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
