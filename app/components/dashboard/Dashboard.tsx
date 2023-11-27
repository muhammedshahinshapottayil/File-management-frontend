"use client";
import { getAlbums, getGallery } from "@/lib/gets";
import { CustomImage } from "../fileList";
import { useEffect, useState } from "react";
import { errorToast } from "@/lib/toasts";
import { Gallery } from "@/types";
import { FileUpload } from "../fileupload";
import { CustomModal } from "../modal";
import { Button } from "../button";
import { useParams } from "next/navigation";
import { Spinner } from "../Spinner";
import AlbumCarousel from "../fileList/Album";

export default function Home({ isAlbum }: { isAlbum: boolean }) {
  const [data, setdata] = useState<Gallery["data"][]>([]);
  const [name, setname] = useState<Gallery["albumName"]>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params: { id: string } = useParams();

  const onLoad = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      let response: { albumName: string; data: Gallery["data"][] } = {
        albumName: "",
        data: [],
      };
      if (isAlbum) response.data = await getAlbums(signal);
      else if (!isAlbum) {
        response = await getGallery(params.id, signal);
        setname(response.albumName);
      }
      setdata(response.data);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 text-center my-4">
            {name}
          </h1>
          <div className="fixed bottom-0 right-0 m-2 z-1">
            <CustomModal
              Button={() => (
                <Button>{isAlbum ? "Create New Album" : "Add Pictures"}</Button>
              )}
            >
              <FileUpload
                albumId={params.id}
                onLoad={onLoad}
                isThumbnail={isAlbum}
              />
            </CustomModal>
          </div>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
              {data.map((item: Gallery["data"]) => (
                <div key={item._id} className="m-2">
                  {!isAlbum ? (
                    <CustomImage
                      albumId={params.id}
                      onLoad={onLoad}
                      isAlbum={isAlbum}
                      {...item}
                    />
                  ) : (
                    <AlbumCarousel
                      albumId={params.id}
                      onLoad={onLoad}
                      isAlbum={isAlbum}
                      {...item}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 font-bold">
              No data available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
