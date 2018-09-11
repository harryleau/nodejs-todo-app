import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import setToken from "./utils/setToken";

import { getTodos, getTodosByFilters } from "./actions/todoActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import Dashboard from "./components/dashboard/Dashboard";

if (localStorage.jwt_token) {
  const token = localStorage.getItem("jwt_token");
  const user = JSON.parse(localStorage.getItem("user"));

  setToken(token);
  store.dispatch({
    type: "SET_CURRENT_USER",
    user
  });
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <div className="container main-content">
              <Route path="/" component={Landing} exact />
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
