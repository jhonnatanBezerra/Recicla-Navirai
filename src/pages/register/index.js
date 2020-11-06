import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import { RiRecycleFill } from 'react-icons/ri';
import { FiArrowLeft } from 'react-icons/fi';



export default function Register() {
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
          <input placeholder="Nome de usuario" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Senha" />
          <input placeholder="Departamento" />
          {/* <option value="">Gerências Municipais</option> */}
          <input placeholder="Cargo exercido" />
          <button type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
