import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends React.Component {
  componentDidMount() {
    if(this.props.auth.isAuth) {
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    return (
      <div className="text-center landing mt-5 mb-5">
        <h1 className="text-dark mb-5 pt-5 pb-5">Create And Organise All Your Tasks</h1>
        <h6 className="mb-3">This is just a practicing app. Feel free to login and check it out using email: <strong>test@test.com</strong> and password: <strong>123456</strong>, or you can register with any emails as there will be no email verification.</h6>
        <Link to="/register" className="btn btn-danger btn-large mr-2">Sign up</Link>
        <Link to="/login" className="btn btn-info btn-large">Login</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
