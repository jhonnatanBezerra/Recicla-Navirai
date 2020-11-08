import React, { useState } from 'react'
import Header from '../../components/header';

import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io'
import { FiEdit, FiCheck } from 'react-icons/fi'
import './styles.css';

import { Dialog } from 'primereact/dialog';

export default function Acao() {

  const [hidden, setHidden] = useState(false);

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
        <button type="submit" > <FiCheck />Cadastrar</button>
      </div>
    );

  }

  function headerModal() {
    return (
      < div classNames="header-modal">
        <h1>Novo Registro</h1>
      </div>
    )
  }


  return (
    <>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={closeModal}>
        <div className="modal-container" >
          <form className="input-dialog">
            <input type="date" placeholder="" />
            <input type="text" placeholder="Titulo" />
            <textarea type="text" placeholder="Descrição" />
            <select >
              <option value="">Bairro</option>
            </select>
          </form>
        </div>
      </Dialog>
      <div className="home-container">
        <div className="content">
          <Header />


          <div className="header">
            <h1>Ações</h1>
            <button onClick={openModal} > <VscNewFile /></button>
          </div>
          <section className="grid">
            <ul>
              <li>
                <strong>Data</strong>
                <p>22/12/2020</p>

                <strong>Titulo</strong>
                <p>Multirão no Residencial Portinari</p>

                <strong>Bairro</strong>
                <p>Portinari II</p>

                <div className="icons">
                  <button>
                    <FiEdit />
                  </button>
                </div>
              </li>
            </ul>

          </section>

        </div>
      </div>
    </>
  )
}

