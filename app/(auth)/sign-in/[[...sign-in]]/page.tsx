import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col gap-2 w-full justify-center items-center min-h-screen">
        <h2 className=" font-semibold text-2xl">For Better Management</h2>
        <SignIn />
      </div>
    </div>
  );
}
