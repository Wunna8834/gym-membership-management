"use client";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Eye, FileSignature, Trash2 } from "lucide-react";
import DeleteMembers from "./DeleteMember";
import EditMember from "./EditMember";
import Link from "next/link";

interface Props {
  _id: string
  name: string;
  payment: string;
  onEditSuccess: () => void
}

const UserActions = ({_id, name, payment, onEditSuccess}: Props) => {
  return (
    <div className="flex gap-2">
      <Button asChild size="icon" className="action-button">
        <Link href={`/analytics/${_id}`}>
          <Eye color="#7B66FF" />
        </Link>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="action-button">
            <FileSignature color="#EEC759" />
          </Button>
        </DialogTrigger>
        <EditMember name={name} paymentType={payment} _id={_id} onEditSuccess={onEditSuccess}/>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            className="action-button"
          >
            <Trash2 color="#EF4040" />
          </Button>
        </AlertDialogTrigger>
        <DeleteMembers _id={_id} onDeleteSuccess={onEditSuccess}/>
      </AlertDialog>
    </div>
  );
};

export default UserActions;
