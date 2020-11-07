import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import api from '../../services/ApiSwagger';

import { FiTrash2, FiCheck } from 'react-icons/fi'
import { BiAddToQueue } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

import { Dialog } from 'primereact/dialog';

import './styles.css';

export default function Agendametos() {

  const [hidden, setHidden] = useState(false);
  const [bairros, setBairros] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  const [diaSemana, setDia] = useState([]);
  const [bairroID, setBairroID] = useState([]);
  const [horario, setHorario] = useState([]);
  const [tipoColeta, setTipoColeta] = useState([]);


  useEffect(() => {

    api.get('bairros').then(response => {
      setBairros(response.data);
    }, []);

    api.get('agendamentos').then(response => {
      setAgendamentos(response.data);
    })
  }, []);


  // Funções do Modal

  function openModal() {
    setHidden(true);
  }

  function closeModal() {
    setHidden(false);
  }

  function footerModalButtons() {
    return (

      <div className="modal-buttons">
        <button onClick={closeModal}> <IoMdClose />Cancelar</button>
        <button type="submit" onClick={handleRegister} > <FiCheck />Agendar</button>
      </div>
    );

  }

  function headerModal() {
    return (
      < div classNames="header-modal">
        <h1>Novo Agendamento</h1>
      </div>
    )
  }

  //  Funções para agendamentos

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      bairro: {
        "id": bairroID
      },
      diaSemana,
      horario,
      tipoColeta,
    };

    try {
      await api.post('agendamentos', data);
      alert('Novo agendamento cadastrado com sucesso');
      closeModal();
    } catch (err) {
      alert('Aconteceu um erro');
      console.log(data);
    }

  }

  async function handlerDelete(id) {
    try {
      await api.delete(`agendamentos/${id}`);
      alert('Agendamento deletado com sucesso');

      setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id)); // removendo em tempo real o que foi excluido
    } catch (err) {
      alert('Erro ao deletar, tente novamente mais tarde');
    }
  }

  return (
    <>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={closeModal}>
        <div className="modal-container" >
          <form className="input-dialog" >
            <label >Dia da Coleta</label>
            <select name="dia" onChange={e => setDia(e.target.value)}>
              <option value="" >Dia de semana</option>
              <option value="SEGUNDA">Segunda-Feira</option>
              <option value="TERCA">Terça-Feira</option>
              <option value="QUARTA">Quarta-Feira</option>
              <option value="QUINTA">Quinta-Feira</option>
              <option value="SEXTA">Sexta-Feira</option>
              <option value="SABADO">Sabado</option>
              <option value="DOMINGO">Domingo</option>
            </select>

            <div className="times">
              <label>Das</label>
              <input type="time" onChange={e => setHorario(e.target.value)} />
              <label>Ás</label>
              <input type="time" />
            </div>

            <label >Bairro da Coleta</label>
            <select name="bairro" onChange={e => setBairroID(e.target.value)}>
              <option value="">Selecione o bairro</option>
              {bairros.map(bairro => (
                <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
              ))}
            </select>

            <label >Tipo de coleta</label>
            <select name="coleta" onChange={e => setTipoColeta(e.target.value)}>
              <option value="">Tipo de coleta</option>
              <option value="COLETACOMUM">Coleta comum</option>
              <option value="COLETASELETIVA">Coleta seletiva</option>
            </select>

          </form>
        </div>
      </Dialog>

      <div className="home-container">
        <div className="content">
          <Header />

          <section className="grid">

            <div className="header">
              <h1>AGENDAMENTOS</h1>
              <button onClick={openModal}><BiAddToQueue /></button>
            </div>

            <ul>

              {agendamentos.map(agendamento => (
                <li key={agendamento.id}>
                  <strong>Dia de Coleta</strong>
                  <p>{agendamento.diaSemana}</p>

                  <strong>Horario da Coleta</strong>
                  <p>{agendamento.horario}</p>

                  <strong>Bairro</strong>
                  <p>{agendamento.bairro.nome}</p>

                  <strong>Tipo de Coleta</strong>
                  <p>{agendamento.tipoColeta}</p>

                  <button onClick={() => handlerDelete(agendamento.id)}>
                    <FiTrash2 />
                  </button>
                </li>
              ))}

            </ul>

          </section>

        </div>
      </div>
    </>

  )
}
