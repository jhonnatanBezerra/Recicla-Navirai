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
  const [bairros, setBairros] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  const [diaSemana, setDia] = useState('');
  const [bairroID, setBairroID] = useState('');
  const [horario, setHorario] = useState('');
  const [tipoColeta, setTipoColeta] = useState('');

  const [agendamento, setAgendamento] = useState({
    bairro: {
      id: '',
      nome: 'Selecione o Bairro',
    },
    id: '',
    diaSemana: 'Dia semana',
    horario: horario,
    tipoColeta: 'Tipo de coleta'
  })


  async function atulizaCAmpos() {
    const response = await api.get('agendamentos')
    setAgendamentos(response.data);
  }

  useEffect(() => {

    api.get('bairros').then(response => {
      setBairros(response.data);
    }, []);
    atulizaCAmpos();
  }, []);


  // Funções do Modal

  function openModal() {
    setHidden(true);
  }

  function closeModal() {
    setHorario('');
    setAgendamento({
      bairro: {
        id: '',
        nome: 'Selecione o Bairro',
      },
      id: '',
      diaSemana: 'Dia semana',
      horario: horario,
      tipoColeta: 'Tipo de coleta'

    })
    setHidden(false);
  }



  function footerModalButtons() {
    return (

      <div className="modal-buttons">
        <button onClick={() => closeModal()}> <IoMdClose />Cancelar</button>
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
      atulizaCAmpos()
      closeModal();

    } catch (err) {
      alert('Aconteceu um erro');
      console.log(data);
    }

  }

  // useEffect(() => {
  //   async function update() {
  //     const response = await api.get(`agendamentos/39`);
  //     setAgendamento(response.data);
  //     console.log(response.data);
  //   }
  //   update();
  // }, [hidden])

  async function handleUptade(id) {

    openModal();
    const response = await api.get(`agendamentos/${id}`);
    setAgendamento(response.data)
    console.log(agendamento);
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
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={() => closeModal()}>
        <div className="modal-container" >
          <form className="input-dialog" >
            <label >Dia da Coleta</label>

            <select name="dia" onChange={e => setDia(e.target.value)}>
              <option value={agendamento.diaSemana} >{agendamento.diaSemana}</option>
              <option value="SEGUNDA">Segunda-Feira</option>
              <option value="TERCA">Terça-Feira</option>
              <option value="QUARTA">Quarta-Feira</option>
              <option value="QUINTA">Quinta-Feira</option>
              <option value="SEXTA">Sexta-Feira</option>
              <option value="SABADO">Sabado</option>
              <option value="DOMINGO">Domingo</option>
            </select>


            <label>Horario de Coleta</label>
            <input type="text" value={agendamento.horario} placeholder="Informe o horario de coleta" onChange={e => setAgendamento({ ...agendamento, horario: e.target.value })} />


            <label >Bairro da Coleta</label>
            <select name="bairro" onChange={e => setBairroID(e.target.value)}>
              <option value="">{agendamento.bairro.nome}</option>
              {bairros.map(bairro => (
                <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
              ))}
            </select>

            <label >Tipo de coleta</label>
            <select name="coleta" onChange={e => setTipoColeta(e.target.value)}>
              <option value={agendamento.tipoColeta}>{agendamento.tipoColeta}</option>
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

                  <div className="icons">
                    <button onClick={() => handleUptade(agendamento.id)}>
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
