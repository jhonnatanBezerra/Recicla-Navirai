import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Agendamentos from './pages/agendamentos';
import Registro from './pages/register';




export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/agendamentos" component={Agendamentos} />
        <Route path="/register" component={Registro} />
      </Switch>
    </BrowserRouter>
  )
}
