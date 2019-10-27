import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import CreateProfile from "./components/createProfile/CreateProfile";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import MessagesHomePage from "./components/messagesHomePage/MessagesHomePage";
import MessagesPage from "./components/messagesHomePage/MessagesPage";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./components/context/UserContext";
import NotificationContainer from "./components/notificationContainer/NotificationContainer";
import io from "socket.io-client";

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Cookies.get("token") ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const ProtectedRoute = ({ component: Component, socket, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Cookies.get("token") ? (
          <Component socket={socket} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const App = () => {
  const socket = io.connect("http://localhost:5000", { secure: true });
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <NotificationContainer socket={socket}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/homepage" component={Homepage} />
              <LoggedInRoute exact path="/login" component={Login} />
              <LoggedInRoute
                exact
                path="/new-profile"
                component={CreateProfile}
              />
              <ProtectedRoute
                exact
                path="/messages"
                component={MessagesHomePage}
              />
              <ProtectedRoute
                exact
                path="/messages/:id"
                component={MessagesPage}
                socket={socket}
              />
            </Switch>{" "}
            <ToastContainer
              position="top-right"
              autoClose={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              draggablePercent={60}
            />
          </NotificationContainer>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
