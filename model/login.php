<?php
    include_once 'conexao.php'; 
    class Login{
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
            $stmt = $conexao->prepare("SELECT * FROM tb_login WHERE usuario = :usuario");
            $stmt->execute(['usuario' => $usuario]); 
            $result = $stmt->fetch();
            if ($result['usuario'] == $usuario) {
                if ($sen==$result['senha']){
                    Login::Setcod($result['cod']);
                    Login::Setnome($result['nome']);
                }else{
                    echo("0");
                }
                
            }else{
                return false;
            }
        }
    }
?>