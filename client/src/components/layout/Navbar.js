import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onClick = (e) => {
    this.props.logoutUser(this.props.history);
  }
  
  render() {
    const { isAuth, user } = this.props.auth; 

    return (
      <nav className="navbar navbar-expand-sm bg-info navbar-dark">
        <div className="container">
          
          <NavLink to={isAuth ? "/dashboard" : "/"} className="navbar-brand">
            Todo App
          </NavLink>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {isAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link" exact>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={this.onClick} className="nav-link" style={{background: "none", border: "none"}}>
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" exact>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
