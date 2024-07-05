import ButtomBar from "@/components/ButtomBar";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import TopBar from "@/components/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <section className="w-full h-screen">
      <TopBar />
      <section className="flex flex-1 w-full items-center justify-start mt-3">
        <LeftSideBar />
        <main className="flex-[50%]">
          <Outlet />
        </main>
        <RightSideBar />
      </section>
      <ButtomBar />
    </section>
  );
};

export default RootLayout;
