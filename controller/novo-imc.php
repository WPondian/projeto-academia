<?php
    require_once('../model/imcUsuario.php');
    session_start();

    $peso = $_POST["peso"];
    $altura = $_POST["altura"];
    $cod = $_SESSION["cod_usuario"];
    $categoria = $_SESSION["categoria"];

    $imcUsuario = new ImcUsuario;
    
    $result = $imcUsuario->consultarImcAtual($cod, true);
    $imcUsuario->trocarImcAtual($result['cod']);
    $imcUsuario->cadastrarImc($altura, $peso, $cod, $categoria);
?>