import React from 'react';

const Login = () => (
  <div className="col-lg-4">
    <div className="card bg-primary text-center card-form">
      <div className="card-body">
        <form>
          <div className="form-group">
            <input type="text" placeholder="Username" className="form-control form-control-lg" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" className="form-control form-control-lg" />
          </div>
          <input type="submit" className="btn btn-outline-light btn-block" />
        </form>
      </div>
    </div>
  </div>
);

export default Login;