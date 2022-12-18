<?php
    require_once('../model/imcUsuario.php');
    session_start();


    $cod = intval($_SESSION["cod_usuario"]);

    $imcUsuario = new ImcUsuario;
    
    $result = $imcUsuario->consultarImcAtual($cod);
?>