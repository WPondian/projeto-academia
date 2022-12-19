
let campoNomeAluno = document.querySelector('#nomeAluno');

let btnFiltrarAlunos = document.querySelector('#btnFiltrarAlunos');

let dadosTabelaAluno;

buscarAlunos();

btnFiltrarAlunos.onclick = () => buscarAlunos(); 

async function buscarAlunos () {
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/consultar-alunos.php');
    const init = prepararRequisicao('POST', {nome:campoNomeAluno.value});
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            Toast.fire({
                icon: 'error',
                title: retorno.message
            })
            return retorno;
        }

        dadosTabelaAluno = retorno.list;
        inserirDadosTabela(dadosTabelaAluno);

    } catch (error) {
        return false;
    }
}


function inserirDadosTabela(array) {
    let tbodyTable = '';
    if (!array.length) {
        tbodyTable = `
            <tr class="font-size-20 text-center">
                <td colspan="12">
                    Consulta sem registro!
                </td>
            </tr>
        `;
    } else {
        array.forEach(element => {
            tbodyTable += `
            <tr class="font-size-12 text-muted">
                <td>${element.nome}</td>
                <td>${element.imc}</td>
            </tr>
        `;
        });
    }
    document.querySelector('#tabAlunos tbody').innerHTML = '';
    document.querySelector('#tabAlunos tbody').insertAdjacentHTML('afterbegin', tbodyTable);
}


