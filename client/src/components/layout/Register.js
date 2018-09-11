import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

class Register extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(props) {
    if (props.errors) {
      this.setState({ errors: props.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {
        ...this.state.errors,
        [e.target.name]: e.target.value ? "" : this.state.errors[e.target.name]
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="pt-5 pb-5 mt-5 row register">
        <div className="col-lg-6 col-md-8 mx-auto text-center">
          <div className="register-form">
            <h3 className="text-gold">Sign Up Today</h3>
            <p className="text-white">Please fill out this form to register</p>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  onChange={this.onChange}
                />
                {errors.email && (
                  <small className="invalid-feedback">{errors.email}</small>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  name="name"
                  onChange={this.onChange}
                />
                {errors.name && (
                  <small className="invalid-feedback">{errors.name}</small>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  name="password"
                  onChange={this.onChange}
                />
                {errors.password && (
                  <small className="invalid-feedback">{errors.password}</small>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Your Password"
                  className={classnames("form-control", {
                    "is-invalid": errors.password2
                  })}
                  name="password2"
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <small className="invalid-feedback">{errors.password2}</small>
                )}
              </div>

              <input
                type="submit"
                value="Sign Up"
                className="btn btn-gold btn-block"
              />
              <Link className="text-gold" to="/">
                <small>Has an account already? Sign in here</small>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
