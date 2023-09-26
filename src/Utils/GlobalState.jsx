import React, { createContext, useContext, useReducer } from "react";

// Define the initial state
const initialState = {
  redirectUrl: null,
  order_id: null,
};

// Create a context
const AppContext = createContext();

// Create a reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_GLOBAL_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Create an AppProvider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setGlobalState = (payload) => {
    dispatch({ type: "SET_GLOBAL_STATE", payload });
  };

  return (
    <AppContext.Provider value={{ state, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => {
  return useContext(AppContext);
};
