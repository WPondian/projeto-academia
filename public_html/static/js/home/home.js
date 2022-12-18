
let btnTelaPerfil = document.querySelector('#btnTelaPerfil');
let btnTelaAlunos = document.querySelector('#btnTelaAlunos');
let btnTelaTreinos = document.querySelector('#btnTelaTreinos');
let btnTelaRelatorios = document.querySelector('#btnTelaRelatorios');
let btnAbrirModalSair = document.querySelector('#btnAbrirModalSair');
let btnAbrirModalAtualizarImc = document.querySelector('#btnAbrirModalAtualizarImc');
let btnAtualizarImc = document.querySelector('#btnAtualizarImc');
let btnDeslogar = document.querySelector('#btnDeslogar');
let campoIMCAtual = document.querySelector('#homeImc');
let campoPeso = document.querySelector('#homePeso');
let campoAltura = document.querySelector('#homeAltura');

buscarDadosCliente();

btnTelaPerfil.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/perfil/perfil.html';

btnTelaAlunos.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/alunos/alunos.html';

btnTelaTreinos.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/treinos/treinos.html';

btnTelaRelatorios.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/relatorios/relatorios.html';

btnDeslogar.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/index.html';

btnAbrirModalAtualizarImc.onclick = () => {
    const modalBootstrap = new bootstrap.Modal('#modalAtualizarImc', {keyboard: false})
    const modalAtualizarImc = document.getElementById('modalAtualizarImc'); 
    modalBootstrap.show(modalAtualizarImc);
}
btnAbrirModalSair.onclick = () => {
    const modalBootstrap = new bootstrap.Modal('#modalSair', {keyboard: false})
    const modalSair = document.getElementById('modalSair'); 
    modalBootstrap.show(modalSair);
}


async function buscarDadosCliente () {
    const requestInfo = new Request('http://localhost/projeto-academia/controller/consultar-imc.php');
    const init = prepararRequisicao('POST', {});
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            Toast.fire({
                icon: 'error',
                title: retorno.message
            })
            return retorno;
        }

        campoIMCAtual.value = retorno.list.imc.toFixed(2);
        campoPeso.value = retorno.list.peso;
        campoAltura.value = retorno.list.altura;
        

        return;

    } catch (error) {
        return false;
    }
}

