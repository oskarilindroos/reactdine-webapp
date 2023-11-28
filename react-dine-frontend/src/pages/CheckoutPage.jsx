import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import OrderSummary from "../components/OrderSummary";
import CustomerDetailsForm from "../components/CustomerDetailsForm";
import Button from "../components/Button";
import CartContext from "../contexts/CartContext";
import useApi from "../hooks/useApi";

const CheckoutPage = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { loading, postOrder } = useApi();

  const onFormSubmit = async (formData) => {
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

    try {
      const response = await postOrder(newOrder);
      if (response.status === 201) {
        toast.success(response.data.message ?? "Order placed successfully!");
        emptyCart();
      } else {
        toast.error(response.data.message ?? "An error occured.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, transition: { duration: 0.5 } }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, x: 1000, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col gap-2 mx-auto py-4 max-w-6xl ">
        <Link className="hover:text-fire-dark text-react-blue" to="/menu">
          <div className="flex items-center gap-2">
            <ChevronLeftIcon className="h-6 w-6" />
            <h1 className="text-xl">Back to menu</h1>
          </div>
        </Link>
        <h1 className="text-3xl">Checkout</h1>
      </div>
      <div className="flex flex-row gap-4 mx-auto my-4 max-w-6xl">
        <div className="w-3/4 bg-ocean-light p-4 rounded-lg">
          <h2 className="text-xl">Your details:</h2>
          <CustomerDetailsForm
            onSubmit={onFormSubmit}
            submitButtonElement={
              <Button type="submit" disabled={cart.items.length < 1}>
                Place order
              </Button>
            }
          />
          {Boolean(loading) && <p>Placing order...</p>}
        </div>
        <div className="flex min-h-full w-1/4 bg-ocean-light p-4 rounded-lg">
          <OrderSummary title="Order summary" cart={cart} />
        </div>
      </div>
    </motion.div>
  );
};

/* <div className="flex flex-wrap gap-4">
        <div className="flex bg-ocean-light shadow-lg rounded-lg p-4">
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
        <div className="flex">
          <div className="bg-ocean-light shadow-lg rounded-lg p-4">
            <OrderSummary title="Order summary" cart={cart} />
          </div>
        </div>
      </div> */

export default CheckoutPage;
