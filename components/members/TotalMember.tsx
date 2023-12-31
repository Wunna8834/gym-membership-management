import Customer from "@/model/customer"

const TotalMember = async () => {
  const totalMembers = await Customer.countDocuments({})
  console.log("Total Members", totalMembers)
  return (
    <div className="flex gap-2 items-center">
        <h3 className="md:text-3xl">Total Members - </h3>
        <p className="md:text-3xl">{totalMembers}</p>
    </div>
  )
}

export default TotalMember