import Customer from "@/model/customer"
import { connectToDB } from "@/utils/database"

export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const searchedParams = url.searchParams.get('name')

    let query = {}
    if(searchedParams) {
        query = {name: searchedParams}
    }
    try {
        await connectToDB()
        const customers = await Customer.find(query).sort({ createdAt: -1 }).populate("name").limit(20);

        return new Response(JSON.stringify(customers), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch customers", {
            status: 500
        })
    }
}