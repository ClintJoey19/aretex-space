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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { getDriveTemplates } from "@/lib/data";

const CreateDrive = ({ file }) => {
  const title = `New ${file}`;
  const session = useSession();
  const [driveName, setDriveName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetched = async () => {
      const res = await getDriveTemplates();
      setTemplates(res);
    };
    fetched();
  }, []);

  const handleSubmitDrive = async (e) => {
    e.preventDefault();

    const names = driveName.split(", ");

    for (const name of names) {
      const newDrive = {
        driveName: name,
        template,
      };

      try {
        // const URL =
        //   "https://aretex-space.vercel.app/api/dashboard/shared-drive"; // production
        // const URL = "https://cheerful-cat-3fcb8b.netlify.app/shared-drive"; // production
        const URL = "http://localhost:3000/api/dashboard/shared-drive";
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
            <DialogFooter>
              <Button>Create</Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDrive;
