import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getCurrentUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  loading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false || true,
};

// type IContextType = {
//   user: IUser;
//   isLoading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
// };
export const AuthContext = createContext(INITIAL_STATE);

//@ts-ignore
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const contextValue = {
    user,
    setUser,
    loading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (
    //@ts-ignore
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// export const UseUserContext = useContext(AuthContext);
