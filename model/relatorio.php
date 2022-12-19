<?php
include_once 'conexao.php'; 
include_once 'comumFuncoes.php'; 
class Relatorio{
    function consultarRelatorioImcTodosAlunos(){
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("
        SELECT (SELECT COUNT(cod_usuario) FROM `tb_imc` WHERE imc < 18.5 AND imc_atual=1) AS 'baixoPeso',(SELECT COUNT(cod_usuario) FROM `tb_imc` WHERE imc > 18.5 AND imc <= 24.9 AND imc_atual=1) AS 'normal',(SELECT COUNT(cod_usuario) FROM `tb_imc` WHERE imc > 24.9 AND imc <= 30 AND imc_atual=1) AS 'sobrepeso',(SELECT COUNT(cod_usuario) FROM `tb_imc` WHERE imc > 30 AND imc_atual=1) AS 'obesidade'  from `tb_imc` LIMIT 1");
        $stmt->execute();
        $result = $stmt->fetch();
        $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            
        echo json_encode($resposta);
    }
    
    function consultarRelatorioAluno($codUsuario){
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT imc,data_cadastro FROM `tb_imc` WHERE cod_usuario =:codUsuario ORDER BY data_cadastro DESC LIMIT 10");
        $stmt->execute(['codUsuario' => $codUsuario]);
        $result = $stmt->fetchAll();
        $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            
        echo json_encode($resposta);
    }
}
?>
