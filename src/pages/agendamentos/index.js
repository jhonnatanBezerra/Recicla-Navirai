import React, { useState } from 'react'
import Header from '../../components/header'

import { FiTrash2, FiCheck } from 'react-icons/fi'
import { BiAddToQueue } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

import { Dialog } from 'primereact/dialog';

import './styles.css';

export default function Agendametos() {

  const [hidden, setHidden] = useState(false);

  function openModal() {
    setHidden(true);
    console.log(hidden);
  }

  function closeModal() {
    setHidden(false);
    console.log(hidden);
  }

  function footerModalButtons() {
    return (

      <div className="modal-buttons">
        <button onClick={closeModal}> <IoMdClose />Cancelar</button>
        <button> <FiCheck />Agendar</button>

      </div>
    )
  }

  function headerModal() {
    return (
      < div classNames="header-modal">
        <h1>Novo Agendamento</h1>
      </div>
    )
  }


  return (
    <>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={closeModal}>
        <div className="modal-container">
          <form className="input-dialog">
            <label >Dia da Coleta</label>
            <select >
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
              <input type="time" />
              <label>Ás</label>
              <input type="time" />
            </div>

            <label >Bairro da Coleta</label>
            <select name="bairro" >
              <option value="">Selecione o bairro</option>
            </select>

            <label >Tipo de coleta</label>
            <select name="coleta">
              <option value="">Tipo de coleta</option>
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

              <li>
                <strong>Dia de Coleta</strong>
                <p>Terça-Feira</p>

                <strong>Horario da Coleta</strong>
                <p>Das 12:00 as 18:00</p>

                <strong>Bairro</strong>
                <p>Harry Amorim</p>

                <strong>Tipo de Coleta</strong>
                <p>Coleta Comum</p>

                <button>
                  <FiTrash2 />
                </button>
              </li>

              <li>
                <strong>Dia de Coleta</strong>
                <p>Terça-Feira</p>

                <strong>Horario da Coleta</strong>
                <p>Das 12:00 as 18:00</p>

                <strong>Bairro</strong>
                <p>Harry Amorim</p>

                <strong>Tipo de Coleta</strong>
                <p>Coleta Comum</p>

                <button>
                  <FiTrash2 />
                </button>
              </li>

              <li>
                <strong>Dia de Coleta</strong>
                <p>Terça-Feira</p>

                <strong>Horario da Coleta</strong>
                <p>Das 12:00 as 18:00</p>

                <strong>Bairro</strong>
                <p>Harry Amorim</p>

                <strong>Tipo de Coleta</strong>
                <p>Coleta Comum</p>

                <button>
                  <FiTrash2 />
                </button>
              </li>

              <li>
                <strong>Dia de Coleta</strong>
                <p>Terça-Feira</p>

                <strong>Horario da Coleta</strong>
                <p>Das 12:00 as 18:00</p>

                <strong>Bairro</strong>
                <p>Harry Amorim</p>

                <strong>Tipo de Coleta</strong>
                <p>Coleta Comum</p>

                <button>
                  <FiTrash2 />
                </button>
              </li>

              <li>
                <strong>Dia de Coleta</strong>
                <p>Terça-Feira</p>

                <strong>Horario da Coleta</strong>
                <p>Das 12:00 as 18:00</p>

                <strong>Bairro</strong>
                <p>Harry Amorim</p>

                <strong>Tipo de Coleta</strong>
                <p>Coleta Comum</p>

                <button>
                  <FiTrash2 />
                </button>
              </li>

              <li>
                <strong>Dia de Coleta</strong>
                <p>Terça-Feira</p>

                <strong>Horario da Coleta</strong>
                <p>Das 12:00 as 18:00</p>

                <strong>Bairro</strong>
                <p>Harry Amorim</p>

                <strong>Tipo de Coleta</strong>
                <p>Coleta Comum</p>

                <button>
                  <FiTrash2 />
                </button>
              </li>

            </ul>

          </section>

        </div>
      </div>
    </>

  )
}
