import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
