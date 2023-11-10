"use client";
import { ReactNode } from "react";
import SideLists from "./SideLists";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Sidebar({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex">
      <div className="bg-gray-900 sm:w-60 min-h-screen w-14 pt-4 transition-all">
        <div className="text-center text-white p-2"> </div>
        <ul className="mt-11">
          <SideLists   onClick={() => {
              router.push("/pages/user/dashboard");
            }} active={true}>Dashboard</SideLists>
          <SideLists
            onClick={() => {
              Cookies.remove("authToken");
              router.push("/pages/auth/login");
            }}
          >
            Logout
          </SideLists>
        </ul>
      </div>
      <section className="flex-1 bg-[#9DE4D7]-900 bg-opacity-20">
        {children}
      </section>
    </div>
  );
}
