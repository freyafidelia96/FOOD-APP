import logoJPG from "../assets/logo.jpg";
import { useCart } from "../store/shopping-cart-context";

export default function Header({ onOpenCart }) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header
      className="flex items-center justify-between w-full md:px-30 md:py-10
      p-3"
    >
      <div className="flex justify-between gap-3 items-center">
        <img
          src={logoJPG}
          alt="React Food Logo"
          className="w-12 h-12 rounded-full border-2 border-primary"
        />
        <h1 className="text-primary text-xl">REACTFOOD</h1>
      </div>

      <div
        className="text-primary text-lg cursor-pointer hover:text-primary-hover"
        onClick={onOpenCart}
      >
        Cart (<span>{cartCount}</span>)
      </div>
    </header>
  );
}
