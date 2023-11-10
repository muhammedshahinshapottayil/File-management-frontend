import { Suspense } from "react";
import Loading from "./loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "@/app/components/sidebar";
import { Navbar } from "@/app/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Sidebar>
          <Navbar />
          {children}
        </Sidebar>
      </Suspense>
    </div>
  );
}
