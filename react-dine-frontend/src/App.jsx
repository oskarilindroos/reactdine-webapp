import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MenuPage from "./pages/MenuPage";
import RootLayout from "./components/RootLayout";
import CartProvider from "./contexts/CartProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MenuPage /> },
      { path: "/order/checkout", element: <h1>Order checkout</h1> },
    ],
  },
]);

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
