import Image from "next/image";
import { Details } from "../details";
import { Album } from "@/types";
import Link from "next/link";

export default function CustomImage({
  file,
  isAlbum,
  onLoad,
  albumId,
  _id: id,
  ...rest
}: Album & { isAlbum: boolean; onLoad: () => void; albumId: string }) {
  return (
    <div>
      <div className="w-full h-[258px] p-2.5 rounded-[5px] shadow border border-stone-300">
        {!isAlbum ? (
          <Image
            className="w-full h-full mx-auto"
            src={file}
            height={100}
            width={100}
            alt={"This image is currently unavailable"}
            priority={true}
          />
        ) : (
          <Link href={`/pages/user/gallery/${id}`}>
            <Image
              className="w-full h-full mx-auto"
              src={file}
              height={100}
              width={100}
              alt={"This image is currently unavailable"}
              priority={true}
            />
          </Link>
        )}
      </div>
      <Details
        onLoad={onLoad}
        isAlbum={isAlbum}
        file={file}
        _id={id}
        id={albumId}
        {...rest}
      />
    </div>
  );
}
