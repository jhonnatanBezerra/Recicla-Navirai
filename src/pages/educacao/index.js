import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/header';
import api from '../../services/ApiSwagger';

import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io'
import { FiEdit, FiCheck } from 'react-icons/fi'
import './styles.css';

import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';



export default function Educacao() {

  const tost = useRef(null);
  const [hidden, setHidden] = useState(false);

  const usuarioID = localStorage.getItem('id');

  const [listEducacao, setListEducacao] = useState([]);


  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [file, setFile] = useState([]);
  const [titulo, setTitulo] = useState('');

  useEffect(() => {

    buscarEdu();
  }, []);

  async function buscarEdu() {
    const response = await api.get('educacoes');
    setListEducacao(response.data);
  }

  async function handleRegister(e) {
    e.preventDefault();

    const dados = {
      data,
      titulo,
      descricao,
      gestor: {
        id: usuarioID,
      },

      fotos: [
        file
      ]
    };

    try {
      await api.post('educacoes', dados);
      showTost('success', 'Informativo salvo com sucesso !!!', 'Maravilha !')
      buscarEdu();
      closeModal();

    } catch (err) {
      showTost('error', err.response.data, 'Falha');
    }

  }

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
        <button onClick={closeModal}> <IoMdClose />Cancelar</button>
        <button type="submit" onClick={handleRegister} > <FiCheck />Cadastrar</button>
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

  function resetStats() {
    setData('');
    setDescricao('');
    setFile([]);
    setTitulo('');
  }

  function showTost(type, msg, title) {
    tost.current.show({ severity: type, summary: title, detail: msg, life: 3000 });
  }


  return (
    <>
      <Toast ref={tost}></Toast>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={closeModal}>
        <div className="modal-container" >
          <form className="input-dialog">

            <input type="date" onChange={e => setData(e.target.value)} />

            <input type="text" onChange={e => setTitulo(e.target.value)} placeholder="Titulo da materia" />

            <textarea type="text" onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />

            <input type="file" onChange={e => setFile(e.target.value)} placeholder="" />

          </form>
        </div>
      </Dialog>
      <div className="home-container">
        <div className="content">
          <Header />


          <div className="header">
            <h1>Educação Ambiental</h1>
            <button onClick={openModal} > <VscNewFile /></button>
          </div>
          <section className="grid">
            <ul>
              {listEducacao.map(edu => (


                <li key={edu.id}>
                  <strong>Data</strong>
                  <p>{edu.data}</p>

                  <strong>Titulo</strong>
                  <p>{edu.titulo}</p>
                  <strong>Autor</strong>
                  <p>{edu.gestor.departamento.nome}</p>
                  <div className="icons">
                    <button>
                      <FiEdit />
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
