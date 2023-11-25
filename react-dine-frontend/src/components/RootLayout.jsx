import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import ShoppingCartMenu from "./ShoppingCartMenu";

const RootLayout = () => {
  return (
    <Fragment>
      <ShoppingCartMenu />
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
