import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

class Register extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: '',
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
        [e.target.name]: e.target.value ? '' : this.state.errors[e.target.name]
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    
    const newUser = ({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    });

    this.props.registerUser(newUser, this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="pt-5 pb-5 row">
        <div className="col-lg-8 mx-auto card bg-light text-center card-form">
          <div className="card-body">
            <h3 className="text-info">Sign Up Today</h3>
            <p className="text-secondary">Please fill out this form to register</p>

            <form noValidate onSubmit={this.onSubmit}>
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
                  type="text" 
                  placeholder="Your Name" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.name
                  })}
                  name="name"
                  onChange={this.onChange} 
                />
                {errors.name && <small className="invalid-feedback">{errors.name}</small>}
              </div>

              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.password
                  })}
                  name="password"
                  onChange={this.onChange} 
                />
                {errors.password && <small className="invalid-feedback">{errors.password}</small>}
              </div>

              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Confirm Your Password" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.password2
                  })}
                  name="password2"
                  onChange={this.onChange}   
                />
                {errors.password2 && <small className="invalid-feedback">{errors.password2}</small>}
              </div>

              <input type="submit" className="btn btn-info btn-block" />
            </form>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
