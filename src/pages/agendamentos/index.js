import React, { useState, useEffect } from 'react'
import Header from '../../components/header'
import api from '../../services/ApiSwagger';

import { FiTrash2, FiCheck, FiEdit } from 'react-icons/fi'
import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io'


import { Dialog } from 'primereact/dialog';

import './styles.css';

export default function Agendametos() {

  const [hidden, setHidden] = useState(false);

  const [listBairros, setListBairros] = useState([]);
  const [listAgendamentos, setListAgendamentos] = useState([]);

  const [agendamentoID, setAgendamentoID] = useState();

  const [diaSemana, setDiaSemana] = useState('');
  const [bairroID, setBairroID] = useState('');
  const [bairroNome, setBairroNome] = useState('');
  const [horario, setHorario] = useState('');
  const [tipoColeta, setTipoColeta] = useState('');


  async function buscaAgendamentos() {
    const response = await api.get('agendamentos')
    setListAgendamentos(response.data);
  }

  useEffect(() => {

    api.get('bairros').then(response => {
      setListBairros(response.data);
    }, []);
    buscaAgendamentos();
  }, []);


  // Funções do Modal

  function openModal() {
    setHidden(true);
  }

  function closeModal() {
    setHidden(false);
    resetStats();
  }



  function footerModalButtons() {
    return (

      <div className="modal-buttons">
        <button onClick={() => closeModal()}> <IoMdClose />Cancelar</button>
        <button type="submit" onClick={agendamentoID ? handleUpdate : handleRegister} > <FiCheck />{agendamentoID ? 'Atualizar' : 'Agendar'}</button>
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
        id: bairroID
      },
      diaSemana,
      horario,
      tipoColeta,
    };

    try {
      await api.post('agendamentos', data);
      alert('Novo agendamento cadastrado com sucesso');
      buscaAgendamentos();
      closeModal();

    } catch (err) {
      alert('Aconteceu um erro');

    }

  }

  async function handleUpdate(e) {
    e.preventDefault();

    const data = {
      bairro: {
        id: bairroID
      },
      diaSemana,
      horario,
      tipoColeta,
    };

    try {
      await api.put(`agendamentos/${agendamentoID}`, data);
      alert('Agendamento Atualizado com sucesso');
      buscaAgendamentos();
      closeModal();

    } catch (err) {
      alert('Aconteceu um erro');
      console.log('Arquivos : ', data);
    }
    buscaAgendamentos();

  }

  async function buscarAgendamento(id) {
    const response = await api.get(`agendamentos/${id}`);
    setAgendamentoID(response.data.id);
    setDiaSemana(response.data.diaSemana);
    setBairroNome(response.data.bairro.nome);
    setBairroID(response.data.bairro.id);
    setHorario(response.data.horario);
    setTipoColeta(response.data.tipoColeta);

    console.log(diaSemana);

    openModal();

  }


  async function handlerDelete(id) {
    try {
      await api.delete(`agendamentos/${id}`);
      alert('Agendamento deletado com sucesso');
      buscaAgendamentos();
    } catch (err) {
      alert('Erro ao deletar, tente novamente mais tarde');
    }
  }

  function resetStats() {
    setAgendamentoID('');
    setDiaSemana('');
    setBairroID('');
    setBairroNome('');
    setHorario('');
    setTipoColeta('');
  }

  return (
    <>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={() => closeModal()}>
        <div className="modal-container" >
          <form className="input-dialog" >
            <label >Dia da Coleta</label>

            <select name="dia" onChange={e => setDiaSemana(e.target.value)}>
              <option value={diaSemana.value} >{diaSemana ? diaSemana : 'Dia da semana'}</option>
              <option value="SEGUNDA">Segunda-Feira</option>
              <option value="TERCA">Terça-Feira</option>
              <option value="QUARTA">Quarta-Feira</option>
              <option value="QUINTA">Quinta-Feira</option>
              <option value="SEXTA">Sexta-Feira</option>
              <option value="SABADO">Sabado</option>
              <option value="DOMINGO">Domingo</option>
            </select>


            <label>Horario de Coleta</label>
            <input type="text" value={horario ? horario : ''} placeholder="Informe o horario de coleta" onChange={e => setHorario(e.target.value)} />


            <label >Bairro da Coleta</label>
            <select name="bairro" onChange={e => setBairroID(e.target.value)}>
              <option value={bairroID}>{bairroNome ? bairroNome : 'Selecione o Bairro'}</option>
              {listBairros.map(bairro => (
                <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
              ))}
            </select>

            <label >Tipo de coleta</label>
            <select name="coleta" onChange={e => setTipoColeta(e.target.value)}>
              <option value={tipoColeta}>{tipoColeta ? tipoColeta : 'Selecione o Tipo de Coleta'}</option>
              <option value="COLETACOMUM">Coleta comum</option>
              <option value="COLETASELETIVA">Coleta seletiva</option>
            </select>

          </form>
        </div>
      </Dialog>

      <div className="home-container">
        <div className="content">
          <Header />

          <div className="header">
            <h1>AGENDAMENTOS</h1>
            <button onClick={() => openModal()}><VscNewFile /></button>
          </div>
          <section className="grid">
            <ul>

              {listAgendamentos.map(agendamento => (
                <li key={agendamento.id}>
                  <strong>Dia de Coleta</strong>
                  <p>{agendamento.diaSemana}</p>

                  <strong>Horario da Coleta</strong>
                  <p>{agendamento.horario}</p>

                  <strong>Bairro</strong>
                  <p>{agendamento.bairro.nome}</p>

                  <strong>Tipo de Coleta</strong>
                  <p>{agendamento.tipoColeta}</p>

                  <div className="icons">
                    <button onClick={() => buscarAgendamento(agendamento.id)}>
                      <FiEdit />
                    </button>

                    <button onClick={() => handlerDelete(agendamento.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}

            </ul>

          </section>

        </div>
      </div>
    </>

  )
}