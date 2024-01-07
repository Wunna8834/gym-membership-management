import { getNewComers } from "@/actions/customer.actions"
import { UserInfo } from "@/app/(root)/analytics/[customerID]/page"
import NewComerCard from "./NewComerCard";

const NewComers = async () => {
    const newComers: UserInfo[] | undefined = await getNewComers() as UserInfo[] | undefined;
    if (!newComers) {
      // Handle the case where newComers is undefined, e.g., show a loading indicator or an error message
      return <div>Loading...</div>;
    }
  
    return (
      <aside className="space-y-2">
        {newComers.map(newComer => (
          <NewComerCard key={newComer._id} name={newComer.name} gender={newComer.gender}/>
        ))}
      </aside>
    );
  };

export default NewComers