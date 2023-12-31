import Customer from "@/model/customer";
import { connectToDB } from "@/utils/database";

export const PATCH = async (req: Request, { params }: any) => {
  const { paymentType } = await req.json();

  try {
    await connectToDB();

    const existingCustomer = await Customer.findById(params.id);
    if (!existingCustomer) {
      return new Response("Customer does not exist", {
        status: 404,
      });
    }
    existingCustomer.paymentType = paymentType;
    await existingCustomer.save();
    return new Response("Successfully update new payment");
  } catch (error) {
    return new Response("Error updating", { status: 500 });
  }
};

export const DELETE = async(req: Request, {params}: any) => {

    try {
        await connectToDB()
        await Customer.findByIdAndDelete(params.id)
        return new Response("Customers deleted successfully", {
            status: 200
        })
    } catch (error) {
        return new Response("Cannot delete customers", {
            status: 500
        })
    }
}
