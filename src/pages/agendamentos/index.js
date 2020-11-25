import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/header'
import api from '../../services/ApiSwagger';
import { Toast } from 'primereact/toast';

import { FiTrash2, FiCheck, FiEdit } from 'react-icons/fi'
import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io'


import { Dialog } from 'primereact/dialog';

import './styles.css';

export default function Agendametos() {

  const tost = useRef(null);
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
      showTost('success', 'Agendamento salvo com sucesso !!!', 'Maravilha !')
      buscaAgendamentos();
      closeModal();

    } catch (err) {
      showTost('error', err.response.data, 'Falha');
    }
  }

  function showTost(type, msg, title) {
    tost.current.show({ severity: type, summary: title, detail: msg, life: 3000 });
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
      showTost('success', 'Agendamento atualizado com sucesso !!!', 'Maravilha !')
      buscaAgendamentos();
      closeModal();

    } catch (err) {
      showTost('error', err.response.data, 'Falha');

    }

  }


  async function buscarAgendamento(id) {
    const response = await api.get(`agendamentos/${id}`);
    setAgendamentoID(response.data.id);
    setDiaSemana(response.data.diaSemana);
    setBairroNome(response.data.bairro.nome);
    setBairroID(response.data.bairro.id);
    setHorario(response.data.horario);
    setTipoColeta(response.data.tipoColeta);
    openModal();

  }


  async function handlerDelete(id) {
    try {
      await api.delete(`agendamentos/${id}`);
      showTost('success', 'Agendamento deletado com sucesso !!!', 'Maravilha !')
      buscaAgendamentos();
    } catch (err) {
      showTost('error', err.response.data, 'Falha');
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
      <Toast ref={tost}></Toast>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={() => closeModal()}>
        <div className="modal-container" >
          <form className="input-dialog" >
            <label >Dia da Coleta</label>

            <select name="diaSemana" onChange={e => setDiaSemana(e.target.value)}>
              <option value={diaSemana ? diaSemana : ''}>{diaSemana ? diaSemana : 'Selecione o dia da semana'}</option>
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>


            <label>Horario de Coleta</label>
            <input type="text" value={horario ? horario : ''} placeholder="Ex: das 00:00 as 13:30" onChange={e => setHorario(e.target.value)} />


            <label >Bairro da Coleta</label>
            <select name="bairro" onChange={e => setBairroID(e.target.value)}>
              <option value={bairroID ? bairroID : ''}>{bairroNome ? bairroNome : 'Selecione o Bairro'}</option>
              {listBairros.map(bairro => (
                <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
              ))}
            </select>

            <label >Tipo de coleta</label>
            <select name="coleta" onChange={e => setTipoColeta(e.target.value)}>
              <option value={tipoColeta.value ? tipoColeta.value : ''}>{tipoColeta ? tipoColeta : 'Selecione o Tipo de Coleta'}</option>
              <option value="Coleta Comum">Coleta comum</option>
              <option value="Coleta Seletiva">Coleta seletiva</option>
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