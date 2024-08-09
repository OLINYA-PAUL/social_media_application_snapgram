import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TopBar = () => {
  const { user } = useContext(AuthContext);
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
    <section className="navbar">
      <div className="cusor-pointer">
        <Button variant="ghost" type="button">
          <Link to="/">
            <img
              src="/assets/images/logo.svg"
              alt="logo"
              className="w-[120px]"
            />
          </Link>
        </Button>
      </div>
      <div className="flex  items-center justify-center">
        <Button variant="ghost" type="button" onClick={() => SignOutAccount()}>
          {isLoading ? (
            <div>
              <div className="flex flex-1 justify-center items-center gap-3">
                <img
                  src="/assets/icons/loader.svg"
                  alt="loading bar"
                  className="w-[25px] cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div>
              <img
                src="/assets/icons/logout.svg"
                alt="logout"
                className="w-[25px] cursor-pointer"
              />
            </div>
          )}
        </Button>
        <Link to={`/profile/?userid=${user.id}`}>
          <img
            src={` ${user.imageUrl} ` || "/assets/images/profile.png"}
            alt="avatar"
            className="w-[30px] mr-4 rounded-full"
          />
        </Link>
      </div>
    </section>
  );
};

export default TopBar;
