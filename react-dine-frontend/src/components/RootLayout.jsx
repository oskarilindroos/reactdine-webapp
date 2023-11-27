import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <Fragment>
      <Outlet />
      <ToastContainer
        theme="dark"
        hideProgressBar
        position="bottom-left"
        autoClose={1000}
        toastClassName={"bg-ocean-light text-white"}
        bodyClassName={"bg-ocean-light text-white "}
      />
    </Fragment>
  );
};

export default RootLayout;
