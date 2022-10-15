<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Incluir a conexao
include_once 'conexao.php';

$id = 1;

$query_produto = "SELECT * FROM produtos WHERE id = :id";
$result_prouto = $conn->prepare($query_produto);
$result_prouto->bindParam(':id', $id, PDO::PARAM_INT);
$result_prouto->execute();
