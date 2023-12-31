"use client";
import { Button } from "../ui/button";
interface ButtonProps {
  handleSubmit: (values: any) => void;
  text: string;
  className: string;
}

const Submit = ({ handleSubmit, text, className }: ButtonProps) => {
  return (
    <Button type="submit" onClick={handleSubmit} className={className}>
      {text}
    </Button>
  );
};

export default Submit;
