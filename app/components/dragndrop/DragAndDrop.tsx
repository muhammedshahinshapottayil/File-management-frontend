"use client";
import { FileUploader } from "react-drag-drop-files";
type Props = {
  handleChange: (file: FileList) => void;
};
function DragDrop({ handleChange }: Props) {
  return (
    <div className="file-upload-wrapper">
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        maxSize={10}
        minSize={0}
        onSizeError={() => {
          console.log("limit");
        }}
        types={["JPG", "PNG", "JPEG", "JPEG"]}
      />
    </div>
  );
}

export default DragDrop;
