import ButtomBar from "@/components/shared/ButtomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import TopBar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <section className="w-full md:flex relative">
      <TopBar />
      <section className="fixed w-[200px] h-full z-10">
        <LeftSideBar />
      </section>
      <main className=" w-full flex flex-1 mr-7  ml-[250px] ">
        <Outlet />
      </main>
      <ButtomBar />
    </section>
  );
};

export default RootLayout;
