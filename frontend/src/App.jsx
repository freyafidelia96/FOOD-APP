import CartContextProvider from "./store/shopping-cart-context";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/modals/Cart.jsx";
import { useRef } from "react";
import Checkout from "./components/modals/Checkout.jsx";

function App() {
  const cartRef = useRef();
  const checkoutRef = useRef();

  function handleGoToCheckout() {
    cartRef.current.close();
    checkoutRef.current.open();
  }

  return (
    <CartContextProvider>
      <Cart ref={cartRef} onGoToCheckout={handleGoToCheckout} />
      <Checkout ref={checkoutRef} />
      <Header onOpenCart={() => cartRef.current.open()} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
