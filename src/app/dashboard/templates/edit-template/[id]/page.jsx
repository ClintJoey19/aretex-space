import TemplateBuilder from "@/components/dashboard/templates/TemplateBuilder";
import { getDriveTemplate } from "@/lib/data";

const EditTemplate = async ({ params }) => {
  const res = await getDriveTemplate(params.id);

  if (res) {
    return (
      <TemplateBuilder
        id={params}
        type="edit"
        name={res.name}
        temp={res.template}
      />
    );
  }
};

export default EditTemplate;
