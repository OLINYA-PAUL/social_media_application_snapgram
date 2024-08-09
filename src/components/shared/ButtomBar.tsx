import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";

const ButtomBar = () => {
  const { pathname } = useLocation();
  return (
    <div className="md:hidden fixed bottom-0 z-1 w-full bg-dark-3]  bg-dark-3">
      <ul className="flex flex-row gap-2  ">
        {sidebarLinks.map((link: INavLink) => {
          const pathName =
            pathname === link.route || link.route.startsWith(`${link.route}/`);

          return (
            <li
              className={` ml-auto  p-2 rounded-md hover:bg-blue-500 cursor-pointer group ${pathName && "bg-blue-500 group"}`}
              key={link.label}>
              <NavLink
                to={link.route}
                className="flex items-center justify-start flex-col text-sm ">
                <img
                  src={link.imgURL}
                  alt="sideimage"
                  className={`group-hover:invert-white mr-2 w-[20px] ${pathName && "invert-white"}`}
                />
                {link && link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ButtomBar;
