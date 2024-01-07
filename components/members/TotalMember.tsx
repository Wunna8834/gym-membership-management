import Customer from "@/model/customer"
import { connectToDB } from "@/utils/database"
import { revalidatePath } from "next/cache"

const getTotalMembers = async() => {
  'use server'
  try {
    await connectToDB()
    const totalMembers = await Customer.countDocuments({})
    return totalMembers
  } catch (error) {
    console.log(error)
  }
}

const TotalMember = async () => {
  const totalMembers = await getTotalMembers()
  return (
    <div className="flex gap-2 items-center">
        <h3 className="md:text-3xl">Total Members - </h3>
        <p className="md:text-3xl">{totalMembers}</p>
    </div>
  )
}

export default TotalMember