import React from "react";
import "../styles/footer.css";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date()?.getFullYear();
  return (
    <footer className="footer">
      <div className="footer-left">
        <p> Made with 💘 by Rajesh Khadka &copy; {year} </p>
      </div>
      <div className="footer-right">
        <a
          href="https://github.com/rajeshkhadka200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>

        <a
          href="https://twitter.com/rajeshkhadka200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter />
        </a>

        <a
          href="https://instagram.com/rajeshkhadka200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
