import React, { useContext, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";

const LeftSideBar = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const {
    mutateAsync: SignOutAccount,
    isLoading,
    isSuccess,
  } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [SignOutAccount, isSuccess]);

  return (
    <div className="w-full h-screen bg-dark-3 p-3 hidden xl:max-h-screen md:flex items-start flex-col">
      <div className="cusor-pointer">
        <button type="button" className="hover:bg-transparent bg-transparent">
          <Link to="/">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              className="w-[130px] ml-2"
            />
          </Link>
        </button>
      </div>
      <div className="flex items-center mt-5">
        <div>
          <Link to={`/profile/${user.id}`}>
            <img
              src={`${user.imageUrl}` || "/assets/images/profile.png"}
              alt="avatar"
              className="w-[40px] h-[40px] rounded-full mr-3 "
            />
          </Link>
        </div>
        <Link to={`/Profile/${user.id}`}>
          <p className="text-[.8em] font-extrabold">
            {user.name || "techmastery of web"}
          </p>
          <div className="text-sm font-extralight text-gray">
            @{user.username || "olinya paul"}
          </div>
        </Link>
      </div>
      <ul className="flex flex-col gap-3 mt-5 w-full ">
        {sidebarLinks.map((link: INavLink) => {
          const pathName =
            pathname === link.route || link.route.startsWith(`${link.route}/`);

          return (
            <li
              className={` w-full block p-2 rounded-md transition hover:bg-blue-600 cursor-pointer group ${pathName && "bg-blue-500 group"}`}
              key={link.label}>
              <NavLink
                to={link.route}
                className="flex items-center justify-start ">
                <img
                  width={15}
                  src={link.imgURL}
                  alt="sideimage"
                  className={`group-hover:invert-white mr-5 ${pathName && "invert-white"}`}
                />
                <span className="text-[13px]">{link && link.label}</span>
              </NavLink>
            </li>
          );
        })}
        <div className="flex items-center justify-start ml-2 mt-20 ">
          <button type="button" onClick={() => SignOutAccount()}>
            {isLoading ? (
              <div>
                <div className="flex flex-1 justify-center items-center">
                  <img
                    src="/assets/icons/loader.svg"
                    alt="loading bar"
                    className="w-[25px] cursor-pointer mr-4"
                  />
                  <p>Please wait...</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-start">
                <img
                  src="/assets/icons/logout.svg"
                  alt="logout"
                  width={15}
                  className="cursor-pointer mr-4"
                />
                <p className="text-sm">Logout</p>
              </div>
            )}
          </button>
        </div>
      </ul>
    </div>
  );
};

export default LeftSideBar;
