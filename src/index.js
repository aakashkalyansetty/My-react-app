import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import UserForm from "./Components/Users/UserForm/UserForm";
import UserIndex from "./Components/Users/UserIndex/UserIndex";
import UserDetail from "./Components/Users/UserDetail/UserDetail";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProcessorIndex from "./Components/Processors/ProcessorIndex/ProcessorIndex";
import ProcessorForm from "./Components/Processors/ProcessorForm/ProcessorForm";
import BlacklistForm from "./Components/Validation/Blacklist/BlacklistForm/BlacklistForm";
import BlacklistIndex from "./Components/Validation/Blacklist/BlacklistIndex/BlacklistIndex";
import DuplicateCheckIndex from "./Components/Validation/Duplicate Check/DuplicateCheckIndex/DuplicateCheckIndex";
import DuplicateCheckForm from "./Components/Validation/Duplicate Check/DuplicateCheckForm/DuplicateCheckForm";
import ForteIndex from "./Components/Validation/Forte/ForteIndex/ForteIndex";
import ForteForm from "./Components/Validation/Forte/ForteForm/ForteForm";


/*const SecretRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (
      localStorage.getItem('token')
          ? <Component {...props} />
          : window.location.replace('/Login')
  )} />
};  */ 

ReactDOM.render(
  <BrowserRouter>
    <Route path="/Login" exact component={Login} />
    <Route path="/" exact component={App} />
    <Route path="/UserForm/:id" component={UserForm} />
    <Route path="/UserIndex" component={UserIndex} />
    <Route path="/UserDetail/:id" component={UserDetail} />
    <Route path="/Dashboard" exact component={Dashboard} />
    <Route path="/ProcessorIndex" component={ProcessorIndex} />
    <Route path="/ProcessorForm/:id" component={ProcessorForm} />
    <Route path="/BlacklistIndex" component={BlacklistIndex} />
    <Route path="/BlacklistForm" component={BlacklistForm} />
    <Route path="/DuplicateCheckIndex" component={DuplicateCheckIndex} />
    <Route path="/DuplicateCheckForm" component={DuplicateCheckForm} />
    <Route path="/ForteIndex" component={ForteIndex} />
    <Route path="/ForteForm" component={ForteForm} />
 </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
