import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";
import RecordPage from "./pages/record/record.component";
import SignInSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";

const RecordApp = ({ user }) => {
  let routes = useRoutes([
    { path: "/", element: user ? <RecordPage /> : <Navigate to='/login' /> },
    { path: "/login", element: user ? <Navigate to='/' /> : <SignInSignUp /> },
  ]);
  return routes;
};

function App({ user }) {
  useEffect(() => {}, []);

  return (
    <Router>
      <RecordApp user={user} />
    </Router>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
