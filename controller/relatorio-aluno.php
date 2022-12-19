<?php
require_once('../model/relatorio.php');

session_start();


$cod = $_SESSION["cod_usuario"];

$relatorio = new Relatorio;

$result = $relatorio->consultarRelatorioAluno($cod);
