import { AiFillHome, AiOutlineLogout } from "react-icons/ai";

export default function SideLists({
  children,
  onClick,
  active,
}: {
  children: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={`hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center ${
        active && "active"
      }`}
    >
      {active ? (
        <AiFillHome className="info-icon" />
      ) : (
        <AiOutlineLogout className="delete-icon" />
      )}
      <span className="ml-3 hidden sm:block  text-gray-400 font-semibold tracking-wide hover:text-white transition-colors">
        {children}
      </span>
    </li>
  );
}
