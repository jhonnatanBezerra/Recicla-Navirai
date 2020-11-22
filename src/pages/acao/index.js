import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/header';
import api from '../../services/ApiSwagger';
import { Toast } from 'primereact/toast';

import { VscNewFile } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io'
import { FiEdit, FiCheck, FiTrash2 } from 'react-icons/fi'
import './styles.css';

import { Dialog } from 'primereact/dialog';

export default function Acao() {

  const tost = useRef(null);
  const [hidden, setHidden] = useState(false);

  const [listBairros, setListBairros] = useState([]);
  const [listAcoes, setListAcoes] = useState([]);

  const usuarioID = localStorage.getItem('id');

  const [acaoID, setAcaoID] = useState('');
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bairroID, setBairroID] = useState('');
  const [file, setFile] = useState([]);
  const [bairroNome, setBairroNome] = useState('');

  async function buscarAcoes() {
    const response = await api.get('acoes');
    setListAcoes(response.data);
  }

  useEffect(() => {

    api.get('bairros').then(response => {
      setListBairros(response.data);
    }, []);
    buscarAcoes();
  }, []);

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
        <button type="submit" onClick={acaoID ? handleUpdate : handleCreate}> <FiCheck />{acaoID ? 'Atualizar' : 'Cadastrar'}</button>
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

      fotos: [
        file,
      ]

    };

    try {
      await api.post('acoes', dados);
      
      buscarAcoes();
      showTost('success', 'Ação salva com sucesso !!!', 'Maravilha !')
      closeModal();

    } catch (err) {      
      showTost('error', err.response.data, 'Falha');
    }

  }

  async function handlerDelete(id) {
    try {
      await api.delete(`acoes/${id}`);
      showTost('success', 'Ação deletada com sucesso !!!', 'Maravilha !')
      buscarAcoes();
    } catch (err) {
      showTost('error', err.response.data, 'Falha');
    }
  }

  async function buscarAcao(id) {
    const response = await api.get(`acoes/${id}`);
    setAcaoID(response.data.id);
    setData(response.data.date);
    setTitle(response.data.titulo);
    setDescription(response.data.descricao);
    setBairroID(response.data.bairro.id);
    setBairroNome(response.data.bairro.nome);
    setFile(response.data.foto);



    openModal();

  }

  async function handleUpdate(e) {
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

    try {
      await api.put(`acoes/${acaoID}`, dados);
      showTost('success', 'Ação atualizada com sucesso !!!', 'Maravilha !')
      buscarAcoes();
      closeModal();

    } catch (err) {
      showTost('error', err.response.data, 'Falha');

    }

  }

  function showTost(type, msg, title) {
    tost.current.show({ severity: type, summary: title, detail: msg, life: 3000 });
  }


  function resetStats() {
    setAcaoID('');
    setData('');
    setTitle('');
    setDescription('');
    setBairroID('');
    setFile([]);
    setBairroNome('');
  }

  return (
    <>
      <Toast ref={tost}></Toast>
      <Dialog visible={hidden} header={headerModal()} footer={footerModalButtons()} style={{ width: '45vw' }} onHide={closeModal}>
        <div className="modal-container" >
          <form className="input-dialog">

            <input type="date" value={data ? data : ''} onChange={e => setData(e.target.value)} />

            <select onChange={e => setBairroID(e.target.value)}>

              <option value={bairroID ? bairroID : ''}>{bairroNome ? bairroNome : 'Selecione o Bairro'}</option>
              {listBairros.map(bairro => (
                <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
              ))}
            </select>

            <input type="text" value={title ? title : ''} placeholder="Titulo" onChange={e => setTitle(e.target.value)} />

            <textarea type="text" value={description ? description : ''} placeholder="Descrição" onChange={e => setDescription(e.target.value)} />

            <input type="file" onChange={e => setFile(e.target.value)} />

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
              {listAcoes.map(acao => (
                <li key={acao.id}>
                  <strong>Data</strong>
                  <p>{acao.date}</p>

                  <strong>Titulo</strong>
                  <p>{acao.titulo}</p>

                  <strong>Bairro</strong>
                  <p>{acao.bairro.nome}</p>

                  <div className="icons">
                    <button onClick={() => buscarAcao(acao.id)} >
                      <FiEdit />
                    </button>
                    <button onClick={() => handlerDelete(acao.id)}>
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

