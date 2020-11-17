import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/ApiSwagger';
import { Toast } from 'primereact/toast';

import './styles.css';
import Fundo from '../../assets/pessoas.png';

import { RiRecycleFill } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();

  const tost = useRef(null);


  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      senha,
    }

    try {
      const response = await api.post('gestores/autenticar', data);
      localStorage.setItem('usuario', response.data.nome);
      history.push('/agendamentos');
    } catch (err) {
      showTost(err.response.data);
    }

  }

  function showTost(err) {
    tost.current.show({ severity: 'error', summary: 'Falha no login', detail: err, life: 3000 });
  }

  return (
    <>
      <Toast ref={tost}></Toast>
      <div className="login-container">
        <section className="form">
          <strong>RECICLA</strong>
          <strong> NAVIR<RiRecycleFill size={16} color="#008000" />Í</strong>
          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>
            <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
            <button type="submit">Entrar</button>
            <Link to="/register"> <FiLogIn size={26} /> Não tenho cadastro</Link>
          </form>
        </section>

        <img src={Fundo} alt="Recicla Naviraí" />
      </div>
    </>
  )
}
