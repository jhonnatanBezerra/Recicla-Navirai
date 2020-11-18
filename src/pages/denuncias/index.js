import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import api from '../../services/ApiSwagger';


export default function Denuncias() {

  const [listDenuncias, setListDenuncias] = useState([]);


  useEffect(() => {

    api.get('denuncias').then(response => {
      setListDenuncias(response.data);
    }, []);
  }, []);


  return (
    <>
      <div className="home-container">
        <div className="content">
          <Header />


          <div className="header">
            <h1>Denuncias</h1>
          </div>
          <section className="grid">
            <ul>
              {listDenuncias.map(denuncia => (

                <li>
                  <strong>Denuncia ID</strong>
                  <p>{denuncia.id}</p>

                  <strong>Denuncia</strong>
                  <p>{denuncia.descricao}</p>

                  <strong>Imagem / Prova</strong>
                  <p>{denuncia.fotos}</p>

                  <strong>Bairro</strong>
                  <p>{denuncia.bairro.nome}</p>
                </li>

              ))}
            </ul>

          </section>

        </div>
      </div>
    </>
  )
}
