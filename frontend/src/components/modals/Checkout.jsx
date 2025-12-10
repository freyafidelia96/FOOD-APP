import { useImperativeHandle, useRef } from "react";
import { useCart } from "../../store/shopping-cart-context";
import { useActionState } from "react";

export default function Checkout({ ref }) {
  const dialogRef = useRef();

  const { getTotalCartAmount, items, clearCart } = useCart();

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

  async function checkoutAction(prevFormData, formData) {
    const orderData = {
      items: items,
      total: getTotalCartAmount(),
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      street: formData.get("street"),
      postal_code: formData.get("postal-code"),
      city: formData.get("city"),
    };

    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to submit order.");

      const result = await response.json();
      console.log("Order submitted successfully:", result);

      clearCart();
      closeCart();
      return { success: true };
    } catch (err) {
      return { error: err.message || "Something went wrong." };
    }
  }

  const [formState, formAction] = useActionState(checkoutAction, {
    error: null,
    success: false,
  });

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="bg-bg-modal m-auto backdrop:bg-backdrop w-2/5 p-4 rounded-sm"
    >
      <p className="text-xl text-primary-dark font-bold mb-3">Checkout</p>
      <p className="mb-3">Total Amount: ${getTotalCartAmount()}</p>

      <form action={formAction}>
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-primary-dark font-bold text-base">
            Full Name
          </label>
          <input
            required
            className="w-2/4 focus:outline-blue-700 bg-white rounded-sm"
            name="fullname"
          />
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label className="text-primary-dark font-bold text-base">
            E-mail Address
          </label>
          <input
            required
            type="email"
            className="w-2/4 focus:outline-blue-700 bg-white rounded-sm"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label className="text-primary-dark font-bold text-base">
            Street
          </label>
          <input
            required
            className="w-2/4 focus:outline-blue-700 bg-white rounded-sm"
            name="street"
          />
        </div>

        <div className="flex w-3/4 gap-3">
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-primary-dark font-bold text-base">
              Postal Code
            </label>
            <input
              required
              className="focus:outline-blue-700 bg-white rounded-sm"
              name="postal-code"
            />
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <label className="text-primary-dark font-bold text-base">
              City
            </label>
            <input
              required
              className="focus:outline-blue-700 bg-white rounded-sm"
              name="city"
            />
          </div>
        </div>

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
            type="submit"
          >
            Submit Order
          </button>
        </div>
      </form>
    </dialog>
  );
}
