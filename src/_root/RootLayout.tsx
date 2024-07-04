import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex w-full gap-5">
      <Outlet />
    </div>
  );
};

export default RootLayout;
