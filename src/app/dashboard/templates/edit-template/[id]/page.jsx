import TemplateBuilder from "@/components/dashboard/templates/TemplateBuilder";
import { getDriveTemplate } from "@/lib/data";

const EditTemplate = async ({ params }) => {
  const { name, template } = await getDriveTemplate(params.id);
  console.log(template);

  return (
    <TemplateBuilder id={params.id} type="edit" name={name} temp={template} />
  );
};

export default EditTemplate;
