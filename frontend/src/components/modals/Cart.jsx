import { useImperativeHandle, useRef } from "react";
import { useCart } from "../../store/shopping-cart-context";

export default function Cart({ ref, onGoToCheckout }) {
  const dialogRef = useRef();

  const { items, getTotalCartAmount, updateItemQuantity } = useCart();

  function closeCart() {
    dialogRef.current.close();
  }

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) {
      closeCart();
    }
  }

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="bg-bg-modal m-auto backdrop:bg-backdrop md:w-2/5 w-full p-4 rounded-sm"
    >
      <p className="text-lg text-primary-dark font-bold">Your Cart</p>
      {items.length === 0 && (
        <p className="text-primary-dark">Your cart is empty.</p>
      )}
      {items.length > 0 && (
        <>
          <div className="mt-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-1.5"
              >
                <p className="text-text-secondary ">
                  {item.name} . {item.quantity} * ${item.price}
                </p>
                <div className="flex gap-3 items-center">
                  <span
                    className="rounded-full bg-text-button-dark 
                    hover:bg-text-button-hover w-5 h-5 text-bg-modal 
                    flex items-center justify-center cursor-pointer"
                    onClick={() => updateItemQuantity(item.id, -1)}
                  >
                    -
                  </span>
                  <span>{item.quantity}</span>
                  <span
                    className="rounded-full bg-text-button-dark 
                    hover:bg-text-button-hover w-5 h-5 text-bg-modal
                    flex items-center justify-center cursor-pointer"
                    onClick={() => updateItemQuantity(item.id, 1)}
                  >
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="flex justify-end mt-6 text-text-secondary font-bold text-lg">
            ${getTotalCartAmount()}
          </p>
        </>
      )}

      <div className="w-full flex justify-end gap-4 mt-5">
        <button
          onClick={closeCart}
          className="focus:outline-none cursor-pointer"
        >
          Close
        </button>
        <button
          className="bg-primary text-text-secondary px-4 py-1 
          rounded-sm cursor-pointer
          hover:bg-primary-hover"
          onClick={onGoToCheckout}
        >
          Go to Checkout
        </button>
      </div>
    </dialog>
  );
}
