import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Params {
  showForm: boolean
  setShowForm: (value: boolean) => void;
}

const AddBodyMeasurements = ({setShowForm, showForm}: Params) => {
  function handleClick() {
    setShowForm(true)
  }
  return (
    <Button disabled={showForm} className="bg-violet-800" onClick={handleClick}>
      <Plus size={16} />
      Add Body Measurements
    </Button>
  );
};

export default AddBodyMeasurements;
