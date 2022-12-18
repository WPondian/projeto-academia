<?php
    require_once('../model/usuario.php');

    $user = $_POST["usuario"];
    $senha = $_POST["senha"];
    $nome = $_POST["nome"];
    $telefone = $_POST["telefone"];
    $endereco = $_POST["endereco"];
    $categoria = $_POST["categoria"];
    $peso = $_POST["peso"];
    $altura = $_POST["altura"];

    $usuario = new Usuario;
    
    $result = $usuario->Cadastrar($user,$senha,$nome,$telefone,$endereco,$categoria,$peso,$altura);
?>