import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MdCloudUpload } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleFolderTab from "../dashboard/shared-drive/SingleFolderTab";
import GroupFolderTab from "../dashboard/shared-drive/GroupFolderTab";
import { useEffect, useState } from "react";
import { getDriveTemplates } from "@/lib/data";
import { useParams } from "next/navigation";

const CreateFolder = ({ file }) => {
  const [templates, setTemplates] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetched = async () => {
      const res = await getDriveTemplates();
      setTemplates(res);
    };
    fetched();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <MdCloudUpload className="text-xl mr-4" /> New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="w-full">
          <Tabs defaultValue="single" className="w-full my-4">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="group">Group</TabsTrigger>
            </TabsList>
            <TabsContent value="single">
              <SingleFolderTab
                file={file}
                parentId={id}
                templates={templates}
              />
            </TabsContent>
            <TabsContent value="group">
              <GroupFolderTab file={file} parentId={id} templates={templates} />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolder;
