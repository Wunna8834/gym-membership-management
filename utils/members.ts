import Customer from "@/model/customer";
import { connectToDB } from "./database";

export async function getCustomersCount() {
    await connectToDB()
    const totalMembers = await Customer.countDocuments({})
    return totalMembers
}