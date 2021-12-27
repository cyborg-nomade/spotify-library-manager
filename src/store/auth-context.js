import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: Cookies.get("spotifyAuthToken"),
  onLogout: () => {},
  onLogin: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  useEffect(() => {
    const storedToken = Cookies.get("spotifyAuthToken");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logoutHandler = () => {
    Cookies.remove("spotifyAuthToken");
    setToken(null);
  };

  const loginHandler = (token) => {
    setToken(token)
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
