import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import OrderSummary from "../components/OrderSummary";
import CustomerDetailsForm from "../components/CustomerDetailsForm";
import Button from "../components/Button";
import CartContext from "../contexts/CartContext";
import useApi from "../hooks/useApi";

const CheckoutPage = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { loading, error, postOrder } = useApi();

  const navigate = useNavigate();

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

    // Post the order to the API, empty the cart and redirect to the homepage
    try {
      const response = await postOrder(newOrder);
      if (response?.status === 201) {
        toast.success("Your order has been placed!");
        emptyCart();

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(
        error.message ?? "An error occurred while placing your order"
      );
    }
  }, [error]);

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 0, x: 1000, transition: { duration: 1.0 } }}
      animate={{ opacity: 1, x: 0, transition: { duration: 1.0 } }}
      exit={{ opacity: 0, x: 1000, transition: { duration: 0.5 } }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        <Link className="text-react-blue hover:text-fire-dark" to="/menu">
          <div className="flex items-center gap-2">
            <ChevronLeftIcon className="h-6 w-6" />
            <h1 className="text-xl">Back to menu</h1>
          </div>
        </Link>
        <h1 className="text-3xl">Checkout</h1>
      </div>
      <div className="mx-auto my-2 grid max-w-6xl grid-cols-1 gap-4 sm:md:grid-cols-[60%_40%]">
        <div className="order-2 max-h-[700px] rounded-lg bg-ocean-light p-4 sm:md:order-1">
          <h2 className="text-xl">Your details:</h2>
          <CustomerDetailsForm
            onSubmit={onFormSubmit}
            submitButtonElement={
              <Button type="submit" disabled={cart.items.length < 1}>
                {loading ? "Placing order..." : "Place order"}
              </Button>
            }
          />
        </div>
        <div className="order-1  rounded-lg bg-ocean-light p-4 sm:md:order-2">
          <OrderSummary title="Order summary" cart={cart} />
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
