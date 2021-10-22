import { createContext } from "react";

const AuthContext = createContext({
  userId: "",
  setUserId: (newUserID: string) => {},
});

export default AuthContext;
