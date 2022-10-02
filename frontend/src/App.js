import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);

  const getProdutos = async () => {
    fetch("http://localhost:8080/index.php")
    .then((response) => response.json())
    .then((responseJson) =>(
      // console.log(responseJson)
      setData(responseJson.records)
    ));
  }

  useEffect(() => {
    getProdutos();
  },[])

  return (
    <div>
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
          {Object.values(data).map(produto =>(
            <tr>
              <td>{produto.id}</td>
              <td>{produto.titulo}</td>
              <td>{produto.descricao}</td>
              <td>Vizualizar|Editar|Deletar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
