import React from 'react';
import './global.css';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

import Routes from './routes';


export default function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

