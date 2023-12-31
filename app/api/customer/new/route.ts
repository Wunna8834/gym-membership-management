
import Customer from "@/model/customer";
import { connectToDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json()

  const { name, gender, phoneNumber, address, paymentType } = data
  try {
    await connectToDB();
    const newCustomer = new Customer({
      name: name,
      gender,
      phoneNumber,
      address,
      paymentType,
    });

    await newCustomer.save();
    return Response.json({data: newCustomer})
  } catch (error) {
    return Response.json({ error: "Failed to create a new customer" });
  }
}
