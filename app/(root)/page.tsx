import Search from "@/components/Search";
import TotalMember from "@/components/members/TotalMember";
import AddNewMember from "@/components/buttons/AddNewMember";
import MembersTable from "@/components/members/MembersTable";

export default async function Home() {
  return (
    <main className="text-white">
      <div className="flex justify-between w-full items-center my-4">
        <TotalMember />
        <AddNewMember />
      </div>
      <section>
        <MembersTable />
      </section>
    </main>
  );
}
