import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register';
import Login from './components/layout/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div className="container main-content">
            <Route path="/" component={Landing} exact />
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


