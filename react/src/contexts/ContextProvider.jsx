import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  message: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [message, _setMessage] = useState("");
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = token => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setMessage = msg => {
    _setMessage(msg);
    
    setTimeout(() => {
      _setMessage("");
    }, 5000);
  };
  
  return (
    <StateContext.Provider value={{ 
      user,
      setUser,
      token,
      setToken,
      message,
      setMessage
     }}>
      { children }
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);