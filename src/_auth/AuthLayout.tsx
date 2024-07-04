import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <div className="flex w-full gap-5">
      {isAuthenticated ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <section className="flex flex-1 justify-between items-center flex-row w-full max-sm:w-full max-sm:flex-col">
          <main className="basis-[50%] max-sm:basis-[100%]">
            <Outlet />
          </main>
          <div className="basis-[50%] w-full h-screen bg-slate-50 max-sm:hidden overflow-hidden">
            <img
              src="/assets/images/side-img.svg"
              alt="home banner"
              className=" w-full h-full object-cover "
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default AuthLayout;
