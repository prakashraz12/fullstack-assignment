import React from "react";
import Header from "../../module/header";
import { Outlet } from "react-router-dom";

const UserRouter = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default UserRouter;
