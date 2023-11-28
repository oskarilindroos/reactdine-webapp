import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/RootLayout";
import CartProvider from "./contexts/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     //errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <MenuPage />,
//       },
//       {
//         path: "/checkout",
//         element: <CheckoutPage />,
//       },
//     ],
//   },
// ]);

const App = () => {
  const location = useLocation();

  const locationArr = location.pathname?.split("/") ?? [];

  return (
    <CartProvider>
      <AnimatePresence>
        <Routes location={location} key={locationArr[1]}>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </CartProvider>
  );
};

export default App;
