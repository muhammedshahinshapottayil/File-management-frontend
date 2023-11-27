import { Input } from "../inputs";
import DragDrop from "../dragndrop/DragAndDrop";
import { Button, CancelButton } from "../button";
import { EventChange, FileType } from "@/types";
import { postAlbumThumbnail } from "@/lib/posts";
import { useState } from "react";
import { errorToast, notify } from "@/lib/toasts";
import { Spinner } from "../Spinner";

export default function FileUpload({
  isThumbnail,
  onLoad,
  albumId,
}: {
  albumId?: string;
  isThumbnail: boolean;
  onLoad: () => void;
}) {
  const [name, setName] = useState<string>(!isThumbnail ? albumId ?? "" : "");
  const [files, setFile] = useState<FileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileSelect = (file: FileList) => {
    setFile(file);
  };

  const onSubmit = async () => {
    try {
      if (files != null && name != "") {
        setIsLoading(true);
        await postAlbumThumbnail(files, name, isThumbnail, albumId);
        clearAll();
        onLoad();
        notify("Successfully Completed");
      } else notify("Please fill all fields");
    } catch (error) {
      errorToast(error);
    }
    setIsLoading(false);
  };

  const clearAll = () => {
    setName(!isThumbnail ? albumId ?? "" : "");
    setFile(null);
  };
  return (
    <div >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4" >
          {isThumbnail && (
            <Input
              value={name}
              onChange={(e: EventChange) => setName(e.target.value)}
              placeholder="Album Name"
            />
          )}
          <DragDrop handleChange={handleFileSelect} />
          <center>
            <div className="space-x-4">
              <Button onClick={onSubmit}>Submit</Button>
              <CancelButton onClick={clearAll}>Clear</CancelButton>
            </div>
          </center>
        </div>
      )}
    </div>
  );
}
