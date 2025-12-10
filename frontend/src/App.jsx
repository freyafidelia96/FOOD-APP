import CartContextProvider from "./store/shopping-cart-context";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/modals/Cart.jsx";
import { useRef } from "react";

function App() {
  const cartRef = useRef();

  return (
    <CartContextProvider>
      <Cart ref={cartRef} />
      <Header onOpenCart={() => cartRef.current.open()} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
