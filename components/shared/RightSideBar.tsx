import NewComers from "./NewComers";

const RightSideBar = () => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="">New Members</h3>
        <div className=" h-64 overflow-scroll custom-scrollbar mt-2">
          <NewComers />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="">Expire Soon</h3>
        <p className="text-wrap text-white text-center text-sm mt-5">All users' membership is active right now</p>
      </div>
    </section>
  );
};

export default RightSideBar;
