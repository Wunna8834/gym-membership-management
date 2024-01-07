"use server";

import Customer from "@/model/customer";
import { connectToDB } from "@/utils/database";
import { revalidatePath } from "next/cache";

interface BodyMeasurementProps {
  customerID: string;
  month: string;
  path: string;
  weight: number;
  neck: number;
  chest: number;
  waist: number;
  left_arm: number;
  right_arm: number;
  left_thight: number;
  right_thight: number;
  left_calf: number;
  right_calf: number;
}

export async function updateBodyMeasurements({
  customerID,
  month,
  path,
  weight,
  neck,
  chest,
  waist,
  left_arm,
  right_arm,
  left_thight,
  right_thight,
  left_calf,
  right_calf,
}: BodyMeasurementProps): Promise<void> {
  try {
    await connectToDB();
    const newMeasurements = {
      month: month,
      weight: weight,
      neck: neck,
      chest: chest,
      waist: waist,
      arms: {
        left: left_arm,
        right: right_arm,
      },
      thight: {
        left: left_thight,
        right: right_thight,
      },
      calf: {
        left: left_calf,
        right: right_calf,
      },
    };
    await Customer.findByIdAndUpdate(
      customerID,
      {
        $push: {
          bodyMeasurements: newMeasurements,
        },
      },
      { new: true }
    );
    revalidatePath(path);
  } catch (error) {
    console.log("Can't update body information", error);
  }
}


export async function getCustomerInfo(customerID: string) {
  try {
    await connectToDB()
    const customerInfo = await Customer.findById(customerID)
    return customerInfo
  } catch (error) {
    console.log("can't get customer info", error)
  }
}

export async function deleteCustomer(customerID: string) {
  try {
    await connectToDB()
    const customerInfo = await Customer.findByIdAndDelete(customerID)
    revalidatePath("/", "layout")
  } catch (error) {
    console.log(error)
  }
}

export async function getNewComers() {
  try {
    await connectToDB()
    const newComers = await Customer.find({}).sort({createdAt: -1}).populate("name").limit(7)
    return newComers
  } catch (error) {
    console.log(error)
  }
}
