import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import OrderSummary from "../components/OrderSummary";
import CustomerDetailsForm from "../components/CustomerDetailsForm";
import Button from "../components/Button";
import CartContext from "../contexts/CartContext";
import useApi from "../hooks/useApi";

const CheckoutPage = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { data, loading, error, postOrder } = useApi();

  const onFormSubmit = (formData) => {
    // Create a new order object
    const newOrder = {
      order: {
        customer: {
          name: formData.name,
          email: formData.email,
          street: formData.street,
          "postal-code": formData.postalCode,
          city: formData.city,
        },
        items: cart.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      },
    };

    // Post the order to the backend
    postOrder(newOrder);
  };

  // Show toast message and empty cart when order is successfully placed
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    } else if (!loading && data.message) {
      toast.success(data.message);
      emptyCart();
    }
  }, [data, loading, error]);

  return (
    <div className="grid gap-4 px-4 mx-auto my-4 max-w-6xl">
      <Link
        className="hover:text-fire-dark text-react-blue"
        to=".."
        state={{ from: "checkout" }}
      >
        <div className="flex flex-row items-center gap-2">
          <ChevronLeftIcon className="h-6 w-6" />
          <h1 className="text-xl">Back to menu</h1>
        </div>
      </Link>
      <h1 className="text-3xl">Checkout</h1>
      <div className="grid lg:grid-cols-6 sm:grid-cols-1 gap-4">
        <div className="lg:col-span-4 ">
          <div className="bg-ocean-light shadow-lg rounded-lg p-4">
            <h2 className="text-xl">Your details:</h2>
            <CustomerDetailsForm
              onSubmit={onFormSubmit}
              submitButtonElement={
                <Button type="submit" disabled={cart.items.length < 1}>
                  Place order
                </Button>
              }
            />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-ocean-light shadow-lg rounded-lg p-4">
            <OrderSummary title="Order summary" cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
