import React from "react";
import "../styles/hero.css";
import Footer from "../components/Footer";
// import Navlink
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Just Draw your problem, CEO will solve it.</h1>
          <p>
            An AI-powered CEO capable of solving any problem you present,
            whether it's a business challenge, a mathematical equation, or a
            finance-related issue.
          </p>
          <div className="hero-buttons">
            <a href="https://github.com/rajeshkhadka200/CEO" target="_blank">
              <button className="btn-primary">GitHUb</button>
            </a>
            <NavLink to="/ceo">
              <button className="btn-secondary">Try CEO</button>
            </NavLink>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
