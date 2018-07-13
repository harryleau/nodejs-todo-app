import React from 'react';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(props) {
    if(props.errors) {
      this.setState({ errors: props.errors });
    }
  }

  onChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value, 
      errors: {
        ...this.state.errors,
        [e.target.name]: e.target.value ? '' : this.state.errors[e.target.value]
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user, this.props.history);
  }

  render() {

    const { errors } = this.state

    return (
      <div className="pt-5 pb-5 row">
        <div className="col-lg-8 col-md-10 mx-auto card bg-light text-center card-form">
          <div className="card-body">
            <h3 className="text-info mb-3">Login</h3>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.email
                  })}
                  name="email" 
                  onChange={this.onChange}
                />
                {errors.email && <small className="invalid-feedback">{errors.email}</small>}
              </div>

              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.password || errors.noUser
                  })}
                  name="password"
                  onChange={this.onChange} 
                />
                {errors.password && <small className="invalid-feedback">{errors.password}</small>}
                {errors.noUser && <small className="invalid-feedback">{errors.noUser}</small>}
              </div>

              <input type="submit" className="btn btn-info btn-block" />
              <Link className="text-info" to="/login"><small>Not a member yet? Register Here</small></Link>
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

export default connect(mapStateToProps, { loginUser })(withRouter(Login));