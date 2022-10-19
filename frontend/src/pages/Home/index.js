import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const getProdutos = async () => {
    fetch("http://localhost:8080/index.php")
      .then((response) => response.json())
      .then((responseJson) => (
        // console.log(responseJson)
        setData(responseJson.records)
      ));
  }

  const apagarProduto = async (idProduto) => {
    // console.log("idProduto", idProduto);
    await fetch("http://localhost:8080/apagar.php?id=" + idProduto)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
          getProdutos();
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Erro ao pagar produto'
        });
      });
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
              <td>
                <button className='btn btn-primary'>
                  <Link style={{ color: 'white' }} to={"/visualizar/" + produto.id}>Vizualizar</Link>
                </button>
                <button className='btn btn-warning'>
                  <Link style={{ color: 'white' }} to={"/editar/" + produto.id}>Editar</Link>
                </button>
                <button className='btn btn-danger'>
                  <Link onClick={() => apagarProduto(produto.id)} style={{ color: 'white' }}>Deletar</Link>
                </button>
              </td>
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
