<?php
    require_once('../model/usuario.php');
    
    session_start();

    $cod = $_SESSION["cod_usuario"];

    $usuario = new Usuario;
    
    $result = $usuario->consultarDadosPerfil($cod);
?>