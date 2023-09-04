import React, { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdHistoryEdu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import logo from "./R.png";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const clearCart = () => {
    console.log("Clearing cart");
    localStorage.removeItem("carrito"); // También borramos el carrito del localStorage
  };
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      clearCart();
      navigate("/#");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const checkUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    // Usamos Hub para suscribirnos a eventos de autenticación
    const authListener = (data) => {
      switch (data.payload.event) {
        case "signIn":
          checkUser();
          break;
        case "signOut":
          setUser(null);
          break;
        default:
          break;
      }
    };

    Hub.listen("auth", authListener);

    // Al limpiar el efecto, aseguramos que no haya fugas de memoria
    return () => Hub.remove("auth", authListener);
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <header className="header1">
      <a href="/#">
        <img src={logo} alt="" className="logo" />
      </a>
      <nav ref={navRef}>
        <Link to="/Productos" className="prod">
          Productos
        </Link>
        {user ? (
          <>
            <button className="icon2" onClick={handleSignOut}>
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to="/sign-up" className="icon1">
            <FaUser />
          </Link>
        )}
        {user ? (
          <>
            <Link to="/sign-up" className="icon3">
              <MdHistoryEdu />
            </Link>
          </>
        ) : null}
        <Link to="/cart" className="cart">
          <FaShoppingCart />
        </Link>
        <button
          className="nav-btn nav-close-btn"
          title="Close"
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" title="Barras" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
