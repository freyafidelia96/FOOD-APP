import { useCart } from "../store/shopping-cart-context";

export default function MealItem({ id, imgSrc, name, price, description }) {
  const imageUrl = `http://localhost:8000/images/${imgSrc}`;
  const { addItemToCart } = useCart();

  return (
    <div className="flex flex-col text-center items-center bg-bg-card h-full gap-4 rounded-lg">
      <img src={imageUrl} alt={name} className="w-fit h-fit rounded-t-lg" />
      <p className="text-text-primary text-xl font-semibold">{name}</p>
      <p className="text-primary bg-bg-price px-4 py-1 rounded-sm">${price}</p>
      <p className="w-full text-center px-1 text-text-primary text-sm font-normal mt-4">
        {description}
      </p>

      <button
        className="mt-auto bg-primary hover:bg-primary-hover mb-4 px-5 py-1 rounded-sm
        cursor-pointer"
        onClick={() => addItemToCart(id, name, price)}
      >
        Add to Cart
      </button>
    </div>
  );
}
