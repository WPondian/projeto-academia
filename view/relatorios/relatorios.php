<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public_html/static/css/bootstrap/bootstrap-grid.min.css">
    <link rel="stylesheet" href="../../public_html/static/css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../../public_html/static/css/global/fonts.css">
    <link rel="stylesheet" href="../../public_html/static/css/global/reset.css">
    <link rel="stylesheet" href="../../public_html/static/css/global/style.css">
    <link rel="stylesheet" href="../../public_html/static/css/relatorios/relatorios.css">
    <title>Academia Cadastro</title>
</head>

<?php 
    session_start();
?>

<body>
    <input type="hidden" id="sessaoCategoria" value="<?= $_SESSION['categoria'] ?>">
    <header>
        <nav class="navbar">
            <div class="container-fluid">
                <div class="row w-100">
                    <div class="col-auto px-0">
                        <button type="button" id="btnVoltarTelaHome"><em class="fa-solid fa-arrow-left fa-2xl text-white"></em></button>
                    </div>
                    <div class="col-auto ms-auto me-auto text-center">
                        <span class="navbar-brand mb-0 me-3 h1 montserrat-bold-italic font-size-30 text-white text-center w-100">Relatorios</span>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <section id="sectionRelatorioProfessor" class="container-fluid bg-white d-none">
        <div class="row justify-content-center">
            <div class="col-auto text-center mt-4">
                <h4 class="montserrat-bold cor-principal font-size-20">Porcentagem de alunos nas classificações do IMC</h4>
            </div>
        </div>
        <div class="row justify-content-center mt-5">
            <div id="divGraficoImcAlunos">
        </div>
        <div class="row justify-content-center mt-5">
            <div id="" class="text-center">
        </div>
    </section>

    <section id="sectionRelatorioAluno" class="container-fluid bg-white d-none">
        <div class="row justify-content-center">
            <div class="col-auto text-center mt-5">
                <h4 class="montserrat-bold cor-principal font-size-20">Relatório Imc</h4>
            </div>
        </div>
        <div class="row justify-content-center">
            <div id="divGraficoRelatorioImc">
        </div>
    </section>

    <script src="../../public_html/static/js/global/moment.js"></script>
    <script src="../../public_html/static/js/bootstrap/bootstrap.min.js"></script>
    <script src="../../public_html/static/js/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="../../public_html/static/js/fontawesome/js/all.min.js"></script>
    <script src="../../public_html/static/js/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="../../public_html/static/js/global/charts.js"></script>
    <script src="../../public_html/static/js/global/funcoes.js"></script>
    <script src="../../public_html/static/js/relatorios/relatorios.js"></script>
</body>

</html>