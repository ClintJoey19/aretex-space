import { HiFolder } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import AddFolder from "./AddFolder";
import EditFolder from "./EditFolder";
import { Button } from "@/components/ui/button";

const Folder = ({
  parentKey,
  template,
  onAddFolder,
  onEditFolder,
  onDeleteFolder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 py-1 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {template.mimeType !== "drive" && <HiFolder className="text-xl" />}
          <p className={template.mimeType === "drive" ? "text-primary" : ""}>
            {template.name}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <AddFolder
            parentKey={parentKey}
            template={template}
            onAddFolder={onAddFolder}
          />
          {template.mimeType !== "drive" && (
            <EditFolder
              parentKey={parentKey}
              name={template.name}
              onEditFolder={onEditFolder}
            />
          )}
          {template.mimeType !== "drive" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // console.log(template.name);
                onDeleteFolder(parentKey);
              }}
            >
              <AiOutlineClose />
            </Button>
          )}
        </div>
      </div>
      <div className="ml-[40px]">
        {Object.keys(template.children || {}).map((uuid) => (
          <Folder
            key={uuid}
            parentKey={uuid}
            template={template.children[uuid]}
            onAddFolder={onAddFolder}
            onEditFolder={onEditFolder}
            onDeleteFolder={onDeleteFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default Folder;
