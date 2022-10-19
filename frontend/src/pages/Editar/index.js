import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const Editar = (props) => {

    const [id] = useState(props.match.params.id)
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    let history = useHistory();
    
    const editProduto = async e =>{
        e.preventDefault();
        
        await fetch("http://localhost:8080/editar.php",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, titulo, descricao})
        }).then((response) => response.json())
        .then((responseJson) =>{
            console.log(responseJson);
            history.push("/");
        })
    }

    useEffect(() => {
        const getProduto = async () => {
            await fetch("http://localhost:8080/visualizar.php?id=" + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('responseJson',responseJson);
                    setTitulo(responseJson.produto.titulo)
                    setDescricao(responseJson.produto.descricao)
                })
        }

        getProduto();
    }, [id]);

    return (
        <div className="container">
            <h1>Editar</h1>
            <form onSubmit={editProduto}>
                <div class="form-group">
                    <label>Título</label>
                    <input type="titulo" class="form-control" required id="titulo" name="titulo" value={titulo} onChange={e => setTitulo(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label>Descrição</label>
                    <textarea type="descricao" class="form-control" required id="descricao" name="descricao" value={descricao}  onChange={e => setDescricao(e.target.value)}></textarea>
                </div>
                <button type="submit" class="btn btn-warning">Editar</button>
                <br />
                <br />
                <Link to="/">
                    <button type="button" class="btn btn-primary">Listar</button>
                </Link>
            </form>
        </div >
    );
}