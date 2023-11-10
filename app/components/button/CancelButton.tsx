import { ButtonProps, stringChildtypeType } from "@/types";

export default function Button({
  children,
  ...rest
}: ButtonProps & stringChildtypeType) {
  return (
    <button {...rest} className="custom-button-style cancel-button">
      {children}
    </button>
  );
}
