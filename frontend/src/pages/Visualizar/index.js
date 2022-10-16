import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Visualizar = (props) => {

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id)

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost:8080/visualizar.php?id=" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log('responseJson',responseJson);
                    setData(responseJson.produto)
                })
        }

        getProduto();
    }, [id]);

    return (
        <div>
            <h1>Visualizar</h1>
            <br></br>
            <div>
                <div>
                    <label>#{data.id}</label>
                </div>
                <div>
                    <label>Título: {data.titulo}</label>
                </div>
                <div>
                    <label>Descrição: {data.descricao}</label>
                </div>
            </div>
            <div>
                <Link to="/">
                    <button type="button" class="btn btn-primary">Listar</button>
                </Link>
                <br />
                <br />
                <Link to="/cadastrar">
                    <button type="button" class="btn btn-primary">Cadastrar</button>
                </Link>
            </div>
        </div>
    );
}