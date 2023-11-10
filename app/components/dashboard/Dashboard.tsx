"use client";
import { getAlbums, getGallery } from "@/lib/gets";
import { CustomImage } from "../fileList";
import { useEffect, useState } from "react";
import { errorToast } from "@/lib/toasts";
import { Album } from "@/types";
import { FileUpload } from "../fileupload";
import { CustomModal } from "../modal";
import { Button } from "../button";
import { useParams } from "next/navigation";
import { Spinner } from "../Spinner";

export default function Home({ isAlbum }: { isAlbum: boolean }) {
  const [data, setdata] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params: { id: string } = useParams();

  const onLoad = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      let response: Album[] = [];
      if (isAlbum) response = await getAlbums(signal);
      else if (!isAlbum) response = await getGallery(params.id, signal);
      setdata(response);
    } catch (error) {
      errorToast(error);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    onLoad(signal);
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      {isLoading && <Spinner />}
      <div className="fixed bottom-0 right-0 m-2">
        <CustomModal Button={() => <Button> Create New</Button>}>
          <FileUpload
            albumId={params.id}
            onLoad={onLoad}
            isThumbnail={isAlbum}
          />
        </CustomModal>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.map((item: Album) => (
            <div key={item._id} className="m-2">
              <CustomImage
                albumId={params.id}
                onLoad={onLoad}
                isAlbum={isAlbum}
                {...item}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 font-bold ">
          No data available.
        </p>
      )}
    </div>
  );
}
