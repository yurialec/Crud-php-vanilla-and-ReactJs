import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {

  const [data, setData] = useState([]);

  const getProdutos = async () => {
    fetch("http://localhost:8080/index.php")
      .then((response) => response.json())
      .then((responseJson) => (
        // console.log(responseJson)
        setData(responseJson.records)
      ));
  }

  useEffect(() => {
    getProdutos();
  }, [])

  return (
    <div className="container">
      <h1>Listar</h1>
      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map(produto => (
            <tr>
              <td>{produto.id}</td>
              <td>{produto.titulo}</td>
              <td>{produto.descricao}</td>
              <td><Link>Vizualizar</Link>|<Link>Edita</Link>|<Link>Deletar</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <Link to="/cadastrar">
        <button className='btn btn-primary'>Cadastrar</button>
      </Link>
    </div>
  );
}
