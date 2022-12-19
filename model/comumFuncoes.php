<?php

class ComumFuncoes{

    public static function formataResposta($resp,$msg,$error){

        $respostaFormatada = new stdClass();
        $respostaFormatada->erro = $error;
        $respostaFormatada->list = !$error ? $resp : array();
        $respostaFormatada->message = $error ? $msg : '';
        return $respostaFormatada;
    }

    public static function calcularImc($altura,$peso){
        $altura = floatval($altura);
        $peso = floatval($peso);
        $imc = $peso / ($altura*$altura);
        return number_format($imc, 2, '.', '');
    }
}

?>