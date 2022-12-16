<?php

class ComumFuncoes{

    public static function formataResposta($resp,$msg,$error){

        $respostaFormatada = new stdClass();
        $respostaFormatada->error = $error;
        $respostaFormatada->list = !$error ? $resp : array();
        $respostaFormatada->message = $error ? $msg : '';
        return $respostaFormatada;
    }
}

?>