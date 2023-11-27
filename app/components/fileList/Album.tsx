import { Gallery } from "@/types";
import { useState, createRef, RefObject } from "react";
import { Details } from "../details";
import Link from "next/link";

const AlbumCarousel = ({
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
}) => {
  const files: any = file;
  const [currentImage, setCurrentImage] = useState<number>(0);
  const refs: RefObject<HTMLDivElement>[] = files.map(() =>
    createRef<HTMLDivElement>()
  );

  const scrollToImage = (i: number) => {
    setCurrentImage(i);
    refs[i].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const nextImage = () => {
    if (currentImage >= files.length - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(files.length - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    "absolute  text-2xl z-10  h-10 w-10 rounded-full opacity-75 flex items-center justify-center";
  return (
    <div className="mt-0.5 p-1 flex justify-center w-screen md:w-1/2 items-center">
      <div className="relative w-full">
        <div className="carousel">
          {files.length > 1 && (
            <button
              type="button"
              onClick={() => previousImage()}
              className={`${arrowStyle} left-2`}
              style={{ top: "40%", zIndex: 0 }}
            >
              <span role="img" aria-label="Arrow left">
                <div className="arrows prev"></div>
              </span>
            </button>
          )}
          <div className="w-[258px] h-[300px] overflow-hidden">
            {files.map((img: Gallery["data"], i: number) => (
              <div className=" flex-shrink-0" ref={refs[i]} key={img._id}>
                <div>
                  <Link href={`/pages/user/gallery/${id}`}>
                    <img
                      src={img.file}
                      className="w-full h-[258px] object-contain"
                    />
                  </Link>
                  <Details
                    onLoad={onLoad}
                    isAlbum={isAlbum}
                    file={img.file}
                    _id={id}
                    id={albumId}
                    {...rest}
                  />
                </div>
              </div>
            ))}
          </div>
          {files.length > 1 && (
            <button
              type="button"
              onClick={() => nextImage()}
              className={`${arrowStyle} left-52`}
              style={{ top: "40%", zIndex: 0 }}
            >
              <span role="img" aria-label="Arrow right">
                <div className="arrows next"></div>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumCarousel;
