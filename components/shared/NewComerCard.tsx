"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NewComerProps {
  name: string;
  gender: string;
}

const NewComerCard = ({ name, gender }: NewComerProps) => {
  return (
    <div className="text-white flex justify-start gap-2 bg-[#454545] rounded-sm px-2 py-1">
      <Avatar>
        <AvatarImage src={gender === "male" ? "/assets/man.png" : "/assets/woman.png"} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-xs text-slate-200">
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default NewComerCard;
