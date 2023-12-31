import { Button } from "../ui/button"
import {Plus} from 'lucide-react'
import Link from "next/link"
const AddNewMember = () => {
  return (
    <Button asChild className="bg-violet-800">
        <Link href="/add-newMember">
            <Plus size={16}/>
            Add New Member
        </Link>
    </Button>
  )
}

export default AddNewMember