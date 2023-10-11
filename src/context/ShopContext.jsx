const { createContext, useState, useReducer, useEffect } = require("react");

const ShopContext = createContext();

export const actions = {
  SET_LOCATION: "location/SET_LOCATION",
  SET_SHOPS: "location/SET_SHOPS",
};

const shopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.SET_LOCATION: {
      return { ...state, location: payload };
    }
    case actions.SET_SHOPS: {
      return { ...state, shops: payload };
    }
    default: {
      return { ...state };
    }
  }
};

const ShopProvider = ({ children }) => {
  const initailState = {
    location: "",
    shops: [],
  };
  const [state, dispatch] = useReducer(shopReducer, initailState);  
  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopProvider };
