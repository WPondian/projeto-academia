const modalAtualizarImc = new bootstrap.Modal(document.getElementById('modalAtualizarImc'), {keyboard: false});

const modalSair = new bootstrap.Modal(document.getElementById('modalSair'), {keyboard: false});

let btnTelaPerfil = document.querySelector('#btnTelaPerfil');
let btnTelaAlunos = document.querySelector('#btnTelaAlunos');
let btnTelaTreinos = document.querySelector('#btnTelaTreinos');
let btnTelaRelatorios = document.querySelector('#btnTelaRelatorios');
let btnAbrirModalSair = document.querySelector('#btnAbrirModalSair');
let btnAbrirModalAtualizarImc = document.querySelector('#btnAbrirModalAtualizarImc');
let btnAtualizarImc = document.querySelector('#btnAtualizarImc');
let btnDeslogar = document.querySelector('#btnDeslogar');
let divBtnAlunos = document.querySelector('#divBtnAlunos');
let campoIMCAtual = document.querySelector('#homeImc');
let campoPeso = document.querySelector('#homePeso');
let campoAltura = document.querySelector('#homeAltura');
let campoPesoModal = document.querySelector('#modalPeso');
let campoAlturaModal = document.querySelector('#modalAltura');

buscarDadosCliente();

btnTelaPerfil.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/perfil/perfil.html';

btnTelaAlunos.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/alunos/alunos.html';

btnTelaTreinos.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/treinos/treinos.html';

btnTelaRelatorios.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/view/relatorios/relatorios.php';

btnDeslogar.onclick = () => window.location.href = window.location.origin  + '/projeto-academia/index.html';

btnAbrirModalAtualizarImc.onclick = () =>{
    campoPesoModal.value = '';
    campoAlturaModal.value = '';
    modalAtualizarImc.show();
} 

btnAbrirModalSair.onclick = () => modalSair.show();

btnAtualizarImc.onclick = () => atualizarImc();


async function buscarDadosCliente () {
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/consultar-imc.php');
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

        campoIMCAtual.value = retorno.list.imc.toFixed(2).replace('.',',');
        campoPeso.value = retorno.list.peso;
        campoAltura.value = retorno.list.altura;
        divBtnAlunos.classList.remove('d-none');

        if(retorno.list.categoria === 'A'){
            divBtnAlunos.classList.add('d-none');
        }
        

        return;

    } catch (error) {
        return false;
    }
}

async function atualizarImc () {
    const dados = {
        altura: campoAlturaModal.value ? parseFloat(campoAlturaModal.value.replace(',', '.')) : '', 
        peso: campoPesoModal.value
    };
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/novo-imc.php');
    const init = prepararRequisicao('POST', dados);
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            Toast.fire({
                icon: 'error',
                title: retorno.message
            })
            return retorno;
        }

        Toast.fire({
            icon: 'success',
            title: 'Imc atualizado com sucesso!'
        })
        
        modalAtualizarImc.hide();
        await buscarDadosCliente();

        return;

    } catch (error) {
        return false;
    }
}

