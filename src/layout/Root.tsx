import { Outlet } from "react-router";
import Navbar from "../lib/components/Navbar";

const Root = () => {
  return (
    <div className="appLayout">
      <Navbar />
      <main className="pageContainer">
        <Outlet />
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default Root;
