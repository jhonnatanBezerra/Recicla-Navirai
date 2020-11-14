import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { RiRecycleFill } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';


export default function CompHeader() {

  const usuario = localStorage.getItem('usuario');

  const history = useHistory();

  async function handleLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <header className="header-principal">
      <div className="logo">
        <Link to="/agendamentos">
          <strong>RECICLA</strong>
          <strong> NAVIR<RiRecycleFill />Í</strong>
        </Link>
      </div>

      <nav className="nav-bar">
        <Link to="agendamentos">Agendamentos</Link>
        <Link to="acoes">Ações</Link>
        <Link to="denuncias">Denuncias</Link>
        <Link to="edu-ambiental">Educação Ambiental</Link>

      </nav>

      <div className="user-status">
        <Link to="agendamentos">{usuario}</Link>
        <button onClick={handleLogOut}><FiLogOut /></button>
      </div>
    </header>
  )
}