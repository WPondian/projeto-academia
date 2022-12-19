<?php
    require_once('../model/treino.php');

    session_start();

    $aparelho = $_POST["aparelho"];
    $repeticoes = $_POST["repeticoes"];
    $cod = $_SESSION["cod_usuario"];

    $treino = new Treino;
    
    $treino->cadastrarTreino($aparelho,$repeticoes,$cod);
?>