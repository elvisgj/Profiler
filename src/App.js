import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import UserHome from "./UserHome";
import LoggedWrapper from "./LoggedWrapper";
import { ProtectedRoute } from "./ProtectedRoute";
import AllUsers from "./AllUsers";
import NavBar from "./Navbar";
import SpecificUser from "./SpecificUser";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div>
          <LoggedWrapper>
            <Route path="/" exact component={SignIn} />
            <Route path="/login" component={LogIn} />
            <ProtectedRoute path="/home" component={UserHome} />
            <ProtectedRoute path="/users" exact component={AllUsers} />
            <ProtectedRoute path="/users/:id" component={SpecificUser} />
          </LoggedWrapper>
        </div>
      </div>
    </Router>
  );
}

export default App;
