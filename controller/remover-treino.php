<?php
    require_once('../model/treino.php');

    session_start();

    $cod = $_POST["cod"];
    $codUsuario = $_SESSION["cod_usuario"];

    $treino = new Treino;
    
    $treino->deletarTreino($cod,$codUsuario);
?>