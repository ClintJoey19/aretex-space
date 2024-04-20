import ContentTitle from "@/components/dashboard/ContentTitle";
import ContentTable from "@/components/dashboard/ContentTable";

const ContentPage = ({ params }) => {
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4" suppressHydrationWarning={true}>
        <ContentTitle id={params.id} />

        <ContentTable driveId={params.id} />
      </div>
    </main>
  );
};

export default ContentPage;
