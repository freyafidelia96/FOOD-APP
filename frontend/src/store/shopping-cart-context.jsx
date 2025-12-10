import { createContext, use, useState } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: (id, name, price) => {},
  updateItemQuantity: (id, amount) => {},
  getCartCount: () => {},
  getTotalCartAmount: () => {},
  clearCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function addItemToCart(id, name, price) {
    setShoppingCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.id === id
      );
      const updatedItems = [...prevCart.items];

      if (existingItemIndex > -1) {
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        updatedItems.push({
          id,
          name,
          price,
          quantity: 1,
        });
      }

      return { items: updatedItems };
    });
  }

  function updateItemQuantity(id, amount) {
    setShoppingCart((prevCart) => {
      const updatedItems = [...prevCart.items];
      const itemIndex = updatedItems.findIndex((item) => item.id === id);

      if (itemIndex > -1) {
        const updatedItem = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + amount,
        };

        if (updatedItem.quantity <= 0) {
          updatedItems.splice(itemIndex, 1);
        } else {
          updatedItems[itemIndex] = updatedItem;
        }
      }

      return { items: updatedItems };
    });
  }

  function getCartCount() {
    return shoppingCart.items.reduce((count, item) => count + item.quantity, 0);
  }

  function getTotalCartAmount() {
    return shoppingCart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  function clearCart() {
    setShoppingCart({ items: [] });
  }

  const contextValue = {
    items: shoppingCart.items,
    addItemToCart,
    updateItemQuantity,
    getCartCount,
    getTotalCartAmount,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  return use(CartContext);
}
