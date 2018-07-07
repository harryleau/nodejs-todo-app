import React from 'react';

class Register extends React.Component {
  state = {
    email: '',
    name: '',
    password: '',
    password2: ''
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('submited');
  }

  render() {
    return (
      <div className="pt-5 pb-5 row">
        <div className="col-lg-8 mx-auto card bg-light text-center card-form">
          <div className="card-body">
            <h3 className="text-info">Sign Up Today</h3>
            <p className="text-secondary">Please fill out this form to register</p>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="form-control form-control-lg"
                  name="email" 
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="form-control form-control-lg"
                  name="name"
                  onChange={this.onChange} 
                  />
              </div>

              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="form-control form-control-lg"
                  name="password"
                  onChange={this.onChange} 
                  />
              </div>

              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Confirm Your Password" 
                  className="form-control form-control-lg"
                  name="password2"
                  onChange={this.onChange}   
                />
              </div>

              <input type="submit" className="btn btn-info btn-block" />
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default Register;
