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
import { RiAddLine } from "react-icons/ri";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { getDriveTemplates } from "@/lib/data";
import { DOMAIN } from "@/lib/utils";

const CreateDrive = () => {
  const session = useSession();
  const [driveName, setDriveName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetched = async () => {
      const res = await getDriveTemplates();
      setTemplates(res);
    };
    fetched();
  }, []);

  const createDrives = async (names) => {
    setIsSubmitting(true);
    for (const name of names) {
      const newDrive = {
        driveName: name,
        template,
      };

      try {
        const URL = `${DOMAIN}/api/dashboard/shared-drive`;
        const res = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({
            newDrive,
            accessToken: session.data.accessToken,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data.accessToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          toast({
            title: "Success",
            description: `${name} drive is created.`,
            action: (
              <ToastAction
                altText="Open"
                onClick={() =>
                  router.push(`/dashboard/shared-drives/${data.data.id}`)
                }
              >
                Open
              </ToastAction>
            ),
          });
        } else {
          const data = await res.json();
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        }
        setIsSubmitting(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleSubmitDrive = async (e) => {
    e.preventDefault();

    const names = driveName.split(", ");

    await createDrives(names);

    setDriveName("");
    setTemplate("");
    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md">
          <RiAddLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmitDrive}>
            <DialogTitle>Generate Drive</DialogTitle>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <Input
                  id="name"
                  value={driveName}
                  onChange={(e) => setDriveName(e.target.value)}
                  className="col-span-3"
                  placeholder="Drive 1, Drive 2, ..."
                />
                <Select
                  value={template}
                  onValueChange={(value) => {
                    setTemplate(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Templates</SelectLabel>
                      {templates.map((temp) => (
                        <SelectItem key={temp._id} value={temp._id}>
                          {temp.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex justify-end items-center gap-2">
              {isSubmitting && <Spinner className="w-6 h-6" />}
              <Button disabled={isSubmitting}>Create</Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDrive;
