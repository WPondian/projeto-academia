<?php
    require_once('../model/treino.php');

    session_start();

    $cod = $_SESSION["cod_usuario"];

    $treino = new Treino;
    
    $treino->listarTreino($cod);
?>