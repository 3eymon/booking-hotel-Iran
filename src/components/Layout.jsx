import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import QuiqNav from "./QuiqNav";
import Modal from "./Modal";
import { useRef, useState } from "react";
import Footer from "./Footer/Footer";

function Layout() {
  const bgFade = useRef(null);
  const [onOpen, setOnOpen] = useState(false);
  return (
    <div className=" container min-h-screen pt-4 pb-10  font-PeydaMed">
      <Navbar />
      <QuiqNav bgFade={bgFade} setOnOpen={setOnOpen} onOpen={onOpen} />
      <div
        ref={bgFade}
        className="fixed inset-0 z-[9999] transition-all duration-300 bg-black/30 dark:bg-black/70 opacity-0 invisible"
      ></div>
      <Modal onOpen={onOpen} setOnOpen={setOnOpen} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
