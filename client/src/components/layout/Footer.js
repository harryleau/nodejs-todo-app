import React from 'react';


const Footer = () => (
  <footer className="bg-info">
    <div className="container">
      <div className="row">
        <div className="col text-center text-white">
          <p className="my-auto py-3">Copyright &copy; {new Date().getFullYear()} by Harry Le</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
