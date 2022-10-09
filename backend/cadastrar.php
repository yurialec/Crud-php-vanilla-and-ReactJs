<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

//Incluir a conexao'
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if ($dados) {

    $query_produto = "INSERT INTO produtos (titulo, descricao) VALUES (:titulo, :descricao)";
    $cad_produto = $conn->prepare($query_produto);

    $cad_produto->bindParam(':titulo', $dados['produto']['titulo'], PDO::PARAM_STR);
    $cad_produto->bindParam(':descricao', $dados['produto']['descricao'], PDO::PARAM_STR);

    $cad_produto->execute();

    if ($cad_produto->rowCount()) {
        $response = [
            "erro" => false,
            "menssagem" => "Produto cadastrado com sucesso."
        ];
    } else {
        $response = [
            "erro" => true,
            "menssagem" => "Erro ao cadastrar."
        ];
    }
} else {
    $response = [
        "erro" => true,
        "menssagem" => "Erro ao cadastrar."
    ];
}

http_response_code(200);
echo json_encode($dados);
