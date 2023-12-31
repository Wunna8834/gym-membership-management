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
import { useRouter } from "next/navigation";
interface Props {
  _id: string;
  name: string;
  paymentType: string;
}

const EditMember = ({ _id, name, paymentType }: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentType: Payment.One_Month,
    },
  });
  async function handleSubmit(values: z.infer<typeof paymentSchema>) {
    console.log(values.paymentType);
    try {
      const res = await fetch(`/api/customer/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          paymentType: values.paymentType,
        }),
      });
      if(res.ok) {
        form.reset()
      }
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload()
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
