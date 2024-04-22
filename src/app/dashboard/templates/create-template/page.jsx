import TemplateBuilder from "@/components/dashboard/templates/TemplateBuilder";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data";

const CreateTemplate = async () => {
  const { user } = await auth();
  const { _id } = await getUserByEmail(user.email);
  return <TemplateBuilder type="create" userId={_id} />;
};

export default CreateTemplate;
