import Folder from "./Folder";

const FolderStructure = ({ template, onAddFolder }) => {
  return (
    <div>
      <Folder template={template} onAddFolder={onAddFolder} />
    </div>
  );
};

export default FolderStructure;
