import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Main from '../src/pages/main';
import Signup from '../src/pages/signup';
import Login from '../src/pages/login';
import Order from '../src/pages/order';
import Result from '../src/pages/result';
import Thankyou from '../src/pages/thankyou';
import PrivateRoute from '../src/components/privateRoute';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/order" component={Order} exact/>
                  <PrivateRoute path="/result" component={Result} exact/>
                  <PrivateRoute path="/thankyou" component={Thankyou} exact/>
              </Switch>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
