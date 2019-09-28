import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import CreateProfile from "./components/createProfile/CreateProfile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Cookies.get("token") ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get("/users/userList");
  //   };
  //   fetchData();
  // }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/homepage" component={Homepage} />
          <LoggedInRoute exact path="/login" component={Login} />
          <LoggedInRoute exact path="/new-profile" component={CreateProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
