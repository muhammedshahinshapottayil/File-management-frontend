import Image from "next/image";
import { Details } from "../details";
import { Gallery } from "@/types";

export default function CustomImage({
  file,
  isAlbum,
  onLoad,
  albumId,
  _id: id,
  ...rest
}: Gallery["data"] & {
  isAlbum: boolean;
  onLoad: () => void;
  albumId: string;
}) {
  const files: any = file;
  return (
    <>
      <div className="w-full h-[258px] p-2.5 rounded-[5px] shadow border border-stone-300">
        <Image
          className="w-full h-full mx-auto"
          src={file}
          height={100}
          width={100}
          alt={"This image is currently unavailable"}
          priority={true}
        />
      </div>
      <Details
        onLoad={onLoad}
        isAlbum={isAlbum}
        file={file}
        _id={id}
        id={albumId}
        {...rest}
      />
    </>
  );
}
