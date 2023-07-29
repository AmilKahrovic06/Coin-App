// CoinContext.js
import React, { createContext, useContext, useState } from "react";

const CoinContext = createContext();

export function useCoinContext() {
  return useContext(CoinContext);
}

export function CoinContextProvider({ children }) {
  const [selectedCoin, setSelected] = useState(null);

  return (
    <CoinContext.Provider value={{ selectedCoin, setSelected }}>
      {children}
    </CoinContext.Provider>
  );
}
