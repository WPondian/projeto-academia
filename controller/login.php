<?php
    require_once('../model/usuario.php');

    $user = $_POST["usuario"];
    $senha = $_POST["senha"];

    $usuario = new Usuario;

    $infor = $usuario->Valida($user,$senha);
?>