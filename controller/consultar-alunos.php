<?php
    require_once('../model/usuario.php');

    session_start();

    $nome = $_POST["nome"];

    $usuario = new Usuario;
    
    $result = $usuario->listarAluno($nome);
?>