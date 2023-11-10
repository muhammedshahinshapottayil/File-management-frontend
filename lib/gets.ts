import axiosInstance from "@/app/config/axiosInterceptor";

const getAlbums = async (signal?: AbortSignal) => {
  const { data } = await axiosInstance.get("/user/get-albums", { signal });
  return data.data;
};

const getGallery = async (id: string, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get(`/user/get-gallery/${id}`, {
    signal,
  });
  return data.data;
};

export { getAlbums, getGallery };
