<?php
    require_once('../model/imcUsuario.php');

    $peso = $_POST["peso"];
    $altura = $_POST["altura"];
    $cod = $_SESSION["cod_usuario"];

    $imcUsuario = new ImcUsuario;
    
    $result = $imcUsuario->consultarImcAtual($user, true);
    $imcUsuario->trocarImcAtual($result['cod']);
    $imcUsuario->cadastrarImc($altura, $peso, $cod, $categoria);
?>