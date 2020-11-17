import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/ApiSwagger';

import './styles.css';
import { RiRecycleFill } from 'react-icons/ri';
import { FiArrowLeft } from 'react-icons/fi';



export default function Register() {

  const history = useHistory();

  const [departamentos, setDepartamentos] = useState([]);

  const [gerencia, setGerencia] = useState();
  const [user, setUser] = useState();
  const [senha, setSenha] = useState();
  const [email, setEmail] = useState();
  const [cargo, setCargo] = useState();




  useEffect(() => {
    api.get('departamentos').then(response => {
      setDepartamentos(response.data);
    });
  }, []);

  async function handleRegister(e) {
    e.preventDefault(e);
    const data = {
      departamento: {
        id: gerencia
      },
      nome: user,
      email,
      senha,
      cargo,

    }
    try {
      await api.post('gestores', data);
      alert('deu certo');
      history.push('/');

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="register-container">

      <div className="content">
        <section>
          <strong>RECICLA</strong>
          <strong> NAVIR<RiRecycleFill size={16} color="#008000" />Í</strong>
          <h1>Novo gestor</h1>
          <p>Somos a Recicla Naviraí. Uma organização que assessora a prefeitura municipal na
          implementação da coleta seletiva inteligente e oferece ao setor empresarial
          resultados certificados de logística reversa de embalagens pós-consumo com responsabilidade
          socioambiental
          e conformidade com a Política Nacional de Resíduos Sólidos – PNRS (Lei nº 12.305/2010).
          </p>
          <Link to="/" > <FiArrowLeft size={26} /> Fazer login</Link>
        </section>

        <form>
          <input placeholder="Nome de usuario" onChange={e => setUser(e.target.value)} />
          <input type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
          <select onChange={e => setGerencia(e.target.value)}>
            <option value="">Selecione uma Gerência</option>
            {departamentos.map(gerencia => (
              <option key={gerencia.id} value={gerencia.id}>{gerencia.nome}</option>
            ))}
          </select>
          <input placeholder="Cargo exercido" onChange={e => setCargo(e.target.value)} />
          <button type="submit" onClick={handleRegister}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
