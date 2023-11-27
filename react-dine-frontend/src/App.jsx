import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import RootLayout from "./components/RootLayout";
import CartProvider from "./contexts/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MenuPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
};

export default App;
