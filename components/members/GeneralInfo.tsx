"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isMembershipActive } from "@/utils/dates";
import { Badge } from "@/components/ui/badge";

interface GeneralInfoProps {
  customerName: string;
  gender: string;
  phone: string;
  expireDate: Date | undefined;
}

const GeneralInfo = ({
  customerName,
  gender,
  phone,
  expireDate,
}: GeneralInfoProps) => {
  const formattedExpireDate = expireDate
    ? expireDate.toLocaleDateString("en-GB")
    : "N/A";
  const isValidMember = expireDate ? isMembershipActive(expireDate) : false;
  return (
    <div className="flex justify-start gap-4 items-center">
      <Avatar className=" w-20 h-20 md:w-44 md:h-44">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-white space-y-1">
        <p className="font-[600] text-3xl tracking-widest">{customerName}</p>
        <p className="text-sm tracking-wide text-slate-300">
          ({gender.charAt(0).toUpperCase() + gender.slice(1)})
        </p>
        <p className="md:text-lg tracking-wider">
          Phone: <span className="font-[400]">{phone}</span>
        </p>
        <p className="md:text-lg tracking-wider">
          Expire Date: <span className="font-[300] text-red-500">{formattedExpireDate}</span>
        </p>
        <div className="flex gap-2 tracking-wider">
          <p className="md:text-lg">Membership Status:</p>
          {isValidMember ? (
            <Badge className="bg-green-500">Active</Badge>
          ) : (
            <Badge variant="destructive">Expired</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
