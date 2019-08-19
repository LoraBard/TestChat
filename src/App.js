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
        <Redirect exact from={process.env.PUBLIC_URL + '/'} to={process.env.PUBLIC_URL + '/login'} />
        <Route path={process.env.PUBLIC_URL + '/login'} component={Login} />
        <Route path={process.env.PUBLIC_URL + '/chat'} component={Chat} />
      </Switch>
    );
  }
}

export default App;