<?php
include_once 'conexao.php'; 
include_once 'comumFuncoes.php'; 
class ImcUsuario{

    public static function cadastrarImc($altura, $peso, $codUsuario, $categoria, $interno = false){
        try{
        $imc = ComumFuncoes::calcularImc($altura,$peso);
        $pdo = Conexao::getInstance();
        $stmt = $pdo->prepare('INSERT INTO tb_imc (altura,peso,imc,cod_usuario,categoria,imc_atual) VALUES(:altura,:peso,:imc,:cod,:categoria,:imcAtual)');
        $stmt->execute(array(
            ':altura' => $altura,
            ':peso' => $peso,
            ':imc' => $imc,
            ':cod'=> $codUsuario,
            ':categoria' => $categoria,
            ':imcAtual' => 1
        ));
        $result = $stmt;
        
        if(!$interno){
            $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            echo json_encode($resposta);
        }
            
        }
        catch(Exception $e){
            $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao cadastrar o IMC do usuário!',true);
            echo json_encode($e);
        }
    }
    
    function listarRelatorioImcTodosAlunos($altura,$peso,$imc){
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT * FROM tb_imc WHERE categoria='A'");
        $stmt->execute();
        $result = $stmt->fetchAll();
        $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            
        echo json_encode($resposta);
    }

    function listarRelatorioImcAluno($cod){
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT * FROM tb_imc WHERE usuario=:codUsuario");
        $stmt->execute(['codUsuario' => $cod]);
        $result = $stmt->fetch();
        $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            
        echo json_encode($resposta);
    }

    function consultarImcAtual($cod, $interno=false){
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT * FROM tb_imc WHERE cod_usuario=:codUsuario AND imc_atual=1");
        $stmt->execute(['codUsuario' => $cod]);
        $result = $stmt->fetch();

        if(!$interno){
            $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            echo json_encode($resposta);
            return;
        }

        return $result;
            
    }

    function deletarImc($cod,$associado){
       try {
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("DELETE  FROM tb_imc WHERE cod=:cod");
        $stmt->bindParam(':cod', $cod);
        $stmt->execute();
        $resposta = ComumFuncoes::formataResposta('','sucesso!',false);
            
        echo json_encode($resposta);
       } catch (Exception $e) {
        $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao tentar excluir o IMC do usuário!',true);
        echo json_encode($resposta);
       }
        
    }

    function editarImc($cod,$altura,$peso,$imc){
        try {
            $conexao = Conexao::getInstance();
            $stmt = $conexao->prepare('UPDATE tb_imc SET altura = :altura , peso = :peso , imc = :imc WHERE cod = :cod');
            $result = $stmt->execute(array(
                ':altura' => $altura,
                ':peso' => $peso,
                ':imc' => $imc,
                ':cod'=> $cod
            ));
            $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
            
            echo json_encode($resposta);
        } catch (Exception $e) {
            $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao tentar editar o IMC do usuário!',true);
            echo json_encode($resposta);
        }
    }

    function trocarImcAtual($cod){
        try {
            $conexao = Conexao::getInstance();
            $stmt = $conexao->prepare('UPDATE tb_imc SET imc_atual = :imc WHERE cod = :cod');
            $result = $stmt->execute(array(
                ':imc' => 0,
                ':cod'=> $cod
            ));
            
            echo json_encode($result);
        } catch (Exception $e) {
            echo json_encode($e);
        }
    }

}


?>