import axiosInstance from "@/app/config/axiosInterceptor";
import { FileType } from "@/types";
import { SubmitHandler } from "react-hook-form";
const postAlbumThumbnail = async (
  files: FileType,
  name: string,
  isThumbnail: boolean
) => {
  const formData = new FormData();
  formData.append("name", name);
  if (files instanceof File) formData.append("file", files);
  else if (files instanceof FileList)
    for (const key in files)
      if (Object.prototype.hasOwnProperty.call(files, key))
        formData.append("file", files[key]);

  const { data } = await axiosInstance.post(
    `/user/create-${isThumbnail ? "thumbnail" : "gallery"}`,
    formData
  );
  return data;
};

const signUp: SubmitHandler<{
  username: string;
  password: string;
  confirmPassword: string;
}> = async (data: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  await axiosInstance.post("/user/register", data);
};

const signIn: SubmitHandler<{
  username: string;
  password: string;
}> = async (data: { username: string; password: string }) => {
  const { data: response } = await axiosInstance.post("/user/signin", data);
  return response;
};

export { postAlbumThumbnail, signUp, signIn };
