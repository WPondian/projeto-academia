<?php
include_once 'conexao.php'; 
include_once 'comumFuncoes.php'; 
class Treino{

    public static function listarTreino($codUsuario,$interno=false){
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT cod,aparelho,repeticoes FROM `tb_treino` WHERE cod_usuario =:codUsuario");
        $stmt->execute(['codUsuario' => $codUsuario]);
        $result = $stmt->fetchAll();

        if(!$interno){
        $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
        echo json_encode($resposta);
        return;
        }

        return count($result);
    }

    function deletarTreino($cod,$codUsuario){
        try {
         $conexao = Conexao::getInstance();
         $stmt = $conexao->prepare("DELETE  FROM tb_treino WHERE cod=:cod AND cod_usuario=:codUsuario");
         $stmt->bindParam(':cod', $cod);
         $stmt->bindParam(':codUsuario', $codUsuario);
         $stmt->execute();
         $resposta = ComumFuncoes::formataResposta('','sucesso!',false);
             
         echo json_encode($resposta);
        } catch (Exception $e) {
         $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao tentar excluir o treino do usuário!',true);
         echo json_encode($resposta);
        }
         
     }

     public static function cadastrarTreino($aparelho, $repeticoes, $codUsuario){
         $limite = Treino::listarTreino($codUsuario,true);
         if ($limite >= 10) {
            $resposta = ComumFuncoes::formataResposta('','Você atingiu o máximo de treinos que pode cadastrar!',true);
            echo json_encode($resposta);
            return;
         }
        try{
        $pdo = Conexao::getInstance();
        $stmt = $pdo->prepare('INSERT INTO tb_treino (aparelho,repeticoes,cod_usuario) VALUES(:aparelho,:repeticoes,:cod)');
        $result = $stmt->execute(array(
            ':aparelho' => $aparelho,
            ':repeticoes' => $repeticoes,
            ':cod'=> $codUsuario
        ));
        
        $resposta = ComumFuncoes::formataResposta($result,'sucesso!',false);
        echo json_encode($resposta);
            
        }
        catch(Exception $e){
            $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao cadastrar o treino do usuário!',true);
            echo json_encode($e);
        }
    }
}
?>