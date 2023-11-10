import axiosInstance from "@/app/config/axiosInterceptor";

const deleteFile = async (albumId: string, isAlbum: boolean, id: string) => {
  const { data } = await axiosInstance.delete(
    `/user/delete-${isAlbum ? `albums/${albumId}` : `gallery/${id}/${albumId}`}`
  );
  return data.data;
};

export { deleteFile };
