import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import "react-toastify/dist/ReactToastify.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteFile } from "@/lib/deletes";
import { errorToast, notify } from "@/lib/toasts";

export default function DeleteModal({
  albumId,
  id,
  isAlbum,
  onLoad,
}: {
  onLoad: () => void;
  albumId: string;
  id: string;
  isAlbum: boolean;
}) {
  const handleDelete = () => {
    toast.dismiss();
    const deleteImage = async () => {
      try {
        await deleteFile(albumId, isAlbum, id);
        onLoad();
        notify("Successfully Completed");
      } catch (error) {
        errorToast(error);
      }
    };

    toast.info(
      <ConfirmDialog
        message="Are you sure you want to delete?"
        onConfirm={() => {
          deleteImage();
        }}
        onCancel={() => console.log("Delete canceled")}
      />,
      {
        autoClose: 4000,
      }
    );
  };

  return (
    <AiTwotoneDelete size={30} className="delete-icon" onClick={handleDelete} />
  );
}
