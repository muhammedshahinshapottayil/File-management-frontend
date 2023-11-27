import { ButtonHTMLAttributes, ChangeEvent } from "react";
type EventChange = ChangeEvent<HTMLInputElement>;
type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className children"
>;
type stringChildtypeType = {
  children: string;
};

type FileType = FileList | null;

type FormDataSignup = {
  username: string;
  password: string;
  confirmPassword: string;
};
type FormDataSignIn = {
  username: string;
  password: string;
};
type AlbumType = {
  name: string;
  file: string;
  fileName: string;
  date: string;
  _id: string;
};
interface Gallery {
  data: AlbumType;
  albumName: string;
}


