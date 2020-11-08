import React from 'react'
import Header from '../../components/header';


export default function Denuncias() {


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
              <li>
                <strong>Data</strong>
                <p>22/12/2020</p>

                <strong>Denuncia</strong>
                <p>Descarte Ilegal</p>

                <strong>Imagem / Prova</strong>
                <p>Imagem aqui</p>

                <strong>Bairro</strong>
                <p>Sol Nascente</p>
              </li>
            </ul>

          </section>

        </div>
      </div>
    </>
  )
}
