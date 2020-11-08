import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Agendamentos from './pages/agendamentos';
import Registro from './pages/register';
import Educacao from './pages/educacao';
import Denuncias from './pages/denuncias';
import Acao from './pages/acao';




export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/agendamentos" component={Agendamentos} />
        <Route path="/register" component={Registro} />
        <Route path="/edu-ambiental" component={Educacao} />
        <Route path="/denuncias" component={Denuncias} />
        <Route path="/acoes" component={Acao} />
      </Switch>
    </BrowserRouter>
  )
}
