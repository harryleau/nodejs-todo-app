import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onClick = e => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuth } = this.props.auth;
    console.log(this.props.location.pathname === "/");

    return (
      <nav className="navbar navbar-expand-sm bg-none navbar-dark p-1">
        <div className="container">
          <NavLink to={isAuth ? "/dashboard" : "/"} className="navbar-brand">
            Tasks Planner
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
                  <button
                    onClick={this.onClick}
                    className="nav-link text-gold"
                    style={{ background: "none", border: "none" }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link text-white" exact>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item btn btn-gold" style={{ padding: 0 }}>
                  <NavLink to="/register" className="nav-link text-dark">
                    Sign Up
                  </NavLink>
                </li>
                )}
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
