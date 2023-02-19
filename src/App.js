import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            Home Page
          </Route>
          <Route path="/blogs">
            <BlogForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
