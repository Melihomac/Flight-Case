import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
