import ButtomBar from "@/components/shared/ButtomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/_root/pages/RightSideBar";
import TopBar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <section className="w-full h-screen relative">
      <TopBar />
      <section className="flex  w-full h-screen justify-between items-center relative ">
        <aside className=" basis-[22%] max-sm:basis-0">
          <LeftSideBar />
        </aside>
        <main className=" mx-2  basis-[53%] w-full max-sm:mx-0 max-sm:basis-[100%]">
          <Outlet />
        </main>
        <aside className=" basis-[25%] max-sm:basis-0">
          <RightSideBar />
        </aside>
      </section>
      <ButtomBar />
    </section>
  );
};

export default RootLayout;
