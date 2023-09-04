import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

const Home = () => {
  return (
    <React.Fragment>
      {/*<HeroBanner />
      <Product />
      <Footer />*/}
    </React.Fragment>
  );
};

export default App;
