import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="text-center landing mt-5 mb-5">
    <h1 className="text-dark mb-5 pt-5 pb-5">Create And Organise Your TaskList</h1>
    <Link to="/register" className="btn btn-danger btn-large mr-2">Sign up</Link>
    <Link to="/login" className="btn btn-info btn-large">Login</Link>
  </div>
);

export default Landing;
