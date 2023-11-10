import { ButtonHTMLAttributes, ChangeEvent } from "react";
type EventChange = ChangeEvent<HTMLInputElement>;
type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className children"
>;
type stringChildtypeType = {
  children: string;
};

type FileType = FileList | File | null;

type FormDataSignup = {
  username: string;
  password: string;
  confirmPassword: string;
};
type FormDataSignIn = {
  username: string;
  password: string;
};
type Album = {
  name: string;
  file: string;
  fileName: string;
  date: string; // You might want to use Date type here if you are working with Date objects
  _id: string;
};
