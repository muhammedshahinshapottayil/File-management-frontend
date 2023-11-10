import { toast } from "react-toastify";
import { Button, CancelButton } from "../button";

const ConfirmDialog = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const handleConfirm = () => {
    onConfirm();
    toast.dismiss();
  };

  const handleCancel = () => {
    onCancel();
    toast.dismiss();
  };

  return (
    <div>
      <p>{message}</p>
      <div className="flex space-x-1 mt-2 mr-2">
        <Button onClick={handleConfirm}>Confirm</Button>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      </div>
    </div>
  );
};

export default ConfirmDialog;
