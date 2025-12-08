import { createContext, useState } from "react";

export const CartContext = createContext({
  items: [],
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  const contextValue = {
    items: shoppingCart.items,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
