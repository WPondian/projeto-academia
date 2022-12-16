<?php
    require_once('../model/login.php');

    $user = $_POST["usuario"];
    $senha = $_POST["senha"];

    $usuario = new Login;

    $infor = $usuario->Valida($user,$senha);
?>