import { Gallery } from "@/types";
import {
  AiFillInfoCircle,
  AiFillEdit,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { CustomModal, DeleteModal } from "../modal";
import ModalDetails from "./ModalDetails";
import { FileUpload } from "../fileupload";
function Details({
  name,
  isAlbum,
  onLoad,
  id,
  ...rest
}: Gallery["data"] & { isAlbum: boolean; onLoad: () => void; id: string }) {
  return (
    <div className=" flex justify-between p-2.5 rounded-[5px] shadow border border-stone-300">
      <p className="text-black text-lg font-light font-['Roboto']">{name}</p>
      <div className="flex">
        {isAlbum && (
          <CustomModal
            Button={() => (
              <AiFillEdit size={30} color="blue" className="info-icon" />
            )}
          >
            <FileUpload
              albumId={rest._id}
              onLoad={onLoad}
              isThumbnail={isAlbum}
              {...rest}
            />
          </CustomModal>
        )}
        <a
          download={true}
          href={rest.file.replace("/upload/", "/upload/fl_attachment/")}
        >
          <AiOutlineCloudDownload size={30} color="blue" />
        </a>
        <DeleteModal
          albumId={rest._id}
          onLoad={onLoad}
          isAlbum={isAlbum}
          id={id}
        />
        <CustomModal
          Button={() => <AiFillInfoCircle size={30} className="info-icon" />}
        >
          <ModalDetails name={name} {...rest} />
        </CustomModal>
      </div>
    </div>
  );
}

export default Details;
