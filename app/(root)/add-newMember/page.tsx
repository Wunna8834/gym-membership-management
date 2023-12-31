"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Gender, Payment, formSchema } from "@/utils/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const [isPending, setIsPending] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Wunna",
      gender: Gender.Male,
      phoneNumber: "",
      address: "",
      paymentType: Payment.One_Month
    },
  });
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const {name, gender, phoneNumber, address, paymentType} = values
    try {
      setIsPending(true)
      const res = await fetch("/api/customer/new", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          gender: gender,
          phoneNumber: phoneNumber,
          address: address,
          paymentType: paymentType,
        }),
      });
      if (res.ok) {
        setIsPending(false)
        router.push("/")
      }
    } catch (error) {
      console.log("Frontend Error", error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" space-y-3 border bg-slate-50 rounded-md shadow-md p-4 mx-auto md:w-2/3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Gender</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-300">
                  <SelectItem value={Gender.Male}>Male</SelectItem>
                  <SelectItem value={Gender.Female}>Female</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter your number here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your address here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Payment Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-300">
                  <SelectItem value={Payment.One_Month}>1 month</SelectItem>
                  <SelectItem value={Payment.Three_Month}>3 months</SelectItem>
                  <SelectItem value={Payment.Twelve_Month}>1 year</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="bg-violet-800" size="lg">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default page;
