<?php
    require_once('../model/relatorio.php');

    $relatorio = new Relatorio;
    
    $result = $relatorio->consultarRelatorioImcTodosAlunos();
?>