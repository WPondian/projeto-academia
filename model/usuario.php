<?php
include_once 'conexao.php'; 
include_once 'comumFuncoes.php'; 
include_once 'imcUsuario.php'; 
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
        if (!empty($result)) {
            if ($sen==$result['senha']){
                session_start();
                $_SESSION['cod_usuario'] = $result['cod'];
                $_SESSION['nome_usuario'] = $result['nome'];
                $resposta = ComumFuncoes::formataResposta(false,'sucesso',false);
                echo json_encode($resposta);
            }else{
                $resposta = ComumFuncoes::formataResposta(true,'Senha incorreta!',true);
                echo json_encode($resposta);
            }
            
        }else{
            $resposta = ComumFuncoes::formataResposta(true,'Usuario não encontrado!',true);
            echo json_encode($resposta);
        }
    }

    public function UsuarioExiste($usuario)
    {
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT * FROM tb_usuario WHERE usuario=:usuario");
        $stmt->execute(['usuario' => $usuario]); 
        $result = $stmt->fetch();
        if (!empty($result)) {
            $resposta = ComumFuncoes::formataResposta(true,'Nome de usuario já existe!',true);
            echo json_encode($resposta);
        }else{
            $resposta = ComumFuncoes::formataResposta(false,'',false);
            echo json_encode($resposta);
        }
    }

    public function capturarCodUsuario($usuario)
    {
        $conexao = Conexao::getInstance();
        $stmt = $conexao->prepare("SELECT * FROM tb_usuario WHERE usuario=:usuario");
        $stmt->execute(['usuario' => $usuario]); 
        $result = $stmt->fetch();
        return $result['cod'];
    }

    function Cadastrar($usuario,$senha,$nome,$telefone,$endereco,$categoria,$peso,$altura){
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
            $respostaUsuario = ComumFuncoes::formataResposta($result,'',false);

            $codUsuario = Usuario::capturarCodUsuario($usuario);
            
            $respostaImc = ImcUsuario::cadastrarImc($altura, $peso, $codUsuario, $categoria, true);
            
            echo json_encode($respostaUsuario);
        }
        catch(Exception $e){
            $resposta = ComumFuncoes::formataResposta($e,'Houve uma falha ao cadastrar o usuário!',true);
            echo json_encode($resposta);
        }
    }

}
?>