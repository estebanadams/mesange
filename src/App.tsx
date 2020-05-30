import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { message } from "antd";

import Home from "./pages/Home";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import "./App.scss";
import { auth } from "./services/firebase";

const success = () => {
  return message.loading("Checking Auth Status", 0);
};

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [AuthUser, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (localStorage.getItem("signIn") === "true") setIsAuth(true);
    const hide = success();
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setIsAuth(true);
        localStorage.setItem("signIn", "true");
      } else {
        setIsAuth(false);
        localStorage.removeItem("signIn");
      }
      setLoading(false);
      hide();
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          user={AuthUser}
          path="/chat"
          authenticated={isAuth}
          Component={Chat}
        ></PrivateRoute>
        <PublicRoute
          path="/signup"
          authenticated={isAuth}
          Component={Signup}
        ></PublicRoute>
        <PublicRoute
          path="/login"
          authenticated={isAuth}
          Component={Login}
        ></PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
