import { InputHTMLAttributes } from "react";
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
export default function Input({ ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
    />
  );
}
