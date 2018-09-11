import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="">
    <div className="container">
      <div className="row">
        <div className="col text-center text-light">
          <p className="my-auto py-3">
            Copyright &copy; {new Date().getFullYear()} by{" "}
            <a href="http://harryle.com" target="_blank" className="text-gold">
              Harry Le
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
