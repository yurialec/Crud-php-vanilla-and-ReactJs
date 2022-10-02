<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "crud";
$port = "3306";

$conn = new PDO("mysql:host=$host;dbname=" . $dbname .";charset=utf8", $user, $pass);