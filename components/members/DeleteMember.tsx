"use client";
import { useReducer } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { INITIAL_STATE, customerReducer } from "@/reducer/customerReducer";
import { usePathname } from "next/navigation";
import { deleteCustomer } from "@/actions/customer.actions";

interface Props {
  _id: string;
  onDeleteSuccess: () => void
}

const DeleteMembers = ({ _id, onDeleteSuccess }: Props) => {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(customerReducer, INITIAL_STATE);
  const handleDelete = async () => {
    try {
      await deleteCustomer(_id)
      dispatch({ type: "DELETE_SUCCESS", payload:{_id} });
      onDeleteSuccess()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action will permenantly delete this customer
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteMembers;
