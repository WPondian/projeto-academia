<?php
    require_once('../model/usuario.php');

    session_start();

    $endereco = $_POST["endereco"];
    $telefone = $_POST["telefone"];
    $nome = $_POST["nome"];
    $cod = $_SESSION["cod_usuario"];

    $usuario = new Usuario;
    
    $result = $usuario->editarDadosPerfil($cod,$endereco,$telefone,$nome);
?>