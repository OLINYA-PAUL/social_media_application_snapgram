import ButtomBar from "@/components/shared/ButtomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/_root/pages/RightSideBar";
import TopBar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <section className="w-full h-screen">
      <TopBar />
      <section className="flex w-full justify-start ">
        <LeftSideBar />
        <main className="mx-3 basis-[53%] w-full max-sm:mx-0 max-sm:basis-[100%]">
          <Outlet />
        </main>
        <RightSideBar />
      </section>
      <ButtomBar />
    </section>
  );
};

export default RootLayout;
