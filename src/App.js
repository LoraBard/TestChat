import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

class App extends React.Component {
  constructor(props) {
    super(props);

  }
render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    );
  }
}

export default App;