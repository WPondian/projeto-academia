<?php
    require_once('../model/usuario.php');

    $user = $_POST["usuario"];

    $usuario = new Usuario;
    
    $result = $usuario->UsuarioExiste($user);
?>