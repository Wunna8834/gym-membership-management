"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Payment, formSchema, paymentSchema } from "@/utils/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Submit from "../buttons/Submit";
import { useReducer } from "react";
import { INITIAL_STATE, customerReducer } from "@/reducer/customerReducer";
import { calculateExpireDate } from "@/utils/dates";
interface Props {
  _id: string;
  name: string;
  paymentType: string;
  onEditSuccess: () => void
}

const EditMember = ({ _id, name, paymentType, onEditSuccess}: Props) => {
  const [state, dispatch] = useReducer(customerReducer, INITIAL_STATE);
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: Payment.One_Month,
    },
  });
  async function handleSubmit(values: z.infer<typeof paymentSchema>) {
    const expireDate = calculateExpireDate(values.paymentType)
    try {

      const res = await fetch(`/api/customer/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          paymentType: values.paymentType,
          expireDate: expireDate
        }),
      });
      if (res.ok) {
        try {
          const updatedCustomer = await res.json();
          dispatch({ type: "EDIT_SUCCESS", payload: updatedCustomer });
          onEditSuccess()
        } catch (jsonError) {
          // Handle the case where the response is not a valid JSON
          console.error("Error parsing JSON:", jsonError);
        }
      } else {
        // Handle non-OK response (e.g., HTTP error status)
        console.error("Server error:", res.status, res.statusText);
        dispatch({ type: "FETCH_ERROR" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      console.log(error);
    }
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Extend Membership</DialogTitle>
        <DialogDescription>
          Choose the desired memembership.Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <div>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} disabled />
          </div>
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Payment Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={paymentType} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-300">
                    <SelectItem value={Payment.One_Month}>1 month</SelectItem>
                    <SelectItem value={Payment.Three_Month}>
                      3 months
                    </SelectItem>
                    <SelectItem value={Payment.Twelve_Month}>1 year</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <DialogFooter className="mt-3">
            <DialogTrigger>
              <Submit
                text="Save Changes"
                handleSubmit={handleSubmit}
                className="bg-violet-800"
              />
            </DialogTrigger>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditMember;
