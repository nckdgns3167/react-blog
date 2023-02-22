import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
            return (
              <Route
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            );
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
