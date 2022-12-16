<?php
include_once 'conexao.php'; 
include_once 'comumFuncoes.php'; 
class Usuario{
    public $nome;
    public $cod;

    public function Getcod(){
        return $this->cod;
    }

    public function Setcod($cod){
        $this->cod=$cod;
    }

    public function Getnome(){
        return $this->nome;
    }
    
    public function Setnome($nome){
        $this->nome=$nome;
    }

    public function Valida($usuario,$sen)
    {
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT * FROM tb_usuario WHERE usuario=:usuario");
        $stmt->execute(['usuario' => $usuario]); 
        $result = $stmt->fetch();
        if ($result['usuario'] == $usuario) {
            if ($sen==$result['senha']){
                Usuario::Setcod($result['cod']);
                Usuario::Setnome($result['nome']);
            }else{
                echo("0");
            }
            
        }else{
            return false;
        }
    }

    function Cadastrar($usuario,$senha,$nome,$telefone,$endereco,$categoria){
        try{
            $pdo = Conexao::getInstance();
            $stmt = $pdo->prepare('INSERT INTO tb_usuario (usuario,senha,nome,telefone,endereco,categoria) VALUES(:usuario,:senha,:nome,:telefone,:endereco,:categoria)');
            $stmt->bindParam(':usuario', $usuario);
            $stmt->bindParam(':senha', $senha);
            $stmt->bindParam(':nome', $nome);
            $stmt->bindParam(':telefone', $telefone);
            $stmt->bindParam(':endereco', $endereco);
            $stmt->bindParam(':categoria', $categoria);

            $result = $stmt->execute();
            $resposta = ComumFuncoes::formataResposta($result,'',false);
            
            return json_encode($resposta);
        }
        catch(Exception $e){
            $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao cadastrar o usuário!',true);
            return $resposta;
        }
    }

}
?>