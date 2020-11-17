import React, { useState, useEffect } from 'react'
import Header from '../../components/header';
import api from '../../services/ApiSwagger';

import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io'
import { FiEdit, FiCheck } from 'react-icons/fi'
import './styles.css';

import { Dialog } from 'primereact/dialog';

export default function Acao() {

  const [hidden, setHidden] = useState(false);

  const usuarioID = localStorage.getItem('id');
  const [listBairros, setListBairros] = useState([]);
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bairroID, setBairroID] = useState('');
  const [file, setFile] = useState([]);



  useEffect(() => {

    api.get('bairros').then(response => {
      setListBairros(response.data);
    }, []);
  }, []);

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
        <button type="submit" onClick={handleCreate}> <FiCheck />Cadastrar</button>
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

  async function handleCreate(e) {
    e.preventDefault();



    const dados = {
      gestor: {
        id: usuarioID
      },

      bairro: {
        id: bairroID
      },

      date: data,
      descricao: description,
      titulo: title,
      foto: file,

    };

    console.log(dados.foto);

    // try {
    //   await api.post('acoes', dados);
    //   alert('Sucesso');
    //   // showTost('success', 'Agendamento salvo com sucesso !!!', 'Maravilha !')
    //   closeModal();

    // } catch (err) {
    //   alert(err);
    // }

  }


  return (
    <>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={closeModal}>
        <div className="modal-container" >
          <form className="input-dialog">

            <input type="date" onChange={e => setData(e.target.value)} />

            <select onChange={e => setBairroID(e.target.value)}>
              <option value="">Bairro</option>
              {listBairros.map(bairro => (
                <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
              ))}
            </select>

            <input type="text" placeholder="Titulo" onChange={e => setTitle(e.target.value)} />

            <textarea type="text" placeholder="Descrição" onChange={e => setDescription(e.target.value)} />

            <input type="file" multiple onChange={e => setFile(e.target.value)} />

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

