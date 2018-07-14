import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => (
  <footer className="bg-white">
    <div className="container">
      <div className="row">
        <div className="col text-center text-dark">
          <p className="my-auto py-3">Copyright &copy; {new Date().getFullYear()} by <a href="http://harryle.com" target="_blank" className="text-danger">Harry Le</a></p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
