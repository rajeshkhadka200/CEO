import React from "react";
import "../styles/hero.css";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>AI powered CEO to solve a Problem</h1>
          <p>
            A CEO an AI powered problem solver that can solve any problem you
            throw at it.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">GitHUb</button>
            <button className="btn-secondary">Try CEO</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
