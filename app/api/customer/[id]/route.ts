import Customer from "@/model/customer";
import { connectToDB } from "@/utils/database";

export const PATCH = async (req: Request, { params }: any) => {
  const { paymentType, expireDate } = await req.json();

  try {
    await connectToDB();

    const existingCustomer = await Customer.findById(params.id);
    if (!existingCustomer) {
      return new Response(JSON.stringify({ success: false, error: "Customer does not exist" }), {
        status: 404,
      });
    }

    existingCustomer.paymentType = paymentType;
    existingCustomer.expireDate = expireDate
    await existingCustomer.save();

    return new Response(JSON.stringify({ success: true, message: "Successfully updated payment" }));
  } catch (error) {
    console.error("Error updating customer:", error);
    return new Response(JSON.stringify({ success: false, error: "Error updating customer" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, { params }: any) => {
  try {
    await connectToDB();

    const deletedCustomer = await Customer.findByIdAndDelete(params.id);
    if (!deletedCustomer) {
      return new Response(JSON.stringify({ success: false, error: "Customer not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Customer deleted successfully" }));
  } catch (error) {
    console.error("Error deleting customer:", error);
    return new Response(JSON.stringify({ success: false, error: "Error deleting customer" }), {
      status: 500,
    });
  }
};
