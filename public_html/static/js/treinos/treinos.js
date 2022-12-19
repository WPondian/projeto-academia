
let campoAparelho = document.querySelector('#nomeAparelho');
let campoNumeroRepeticoes = document.querySelector('#numeroRepeticoes');
let btnCadastrarTreino = document.querySelector('#btnCadastrarTreino');

let dadosTabelaAluno;
buscarTreinos ();

btnCadastrarTreino.onclick = () => cadastrarTreinos(); 

async function buscarTreinos () {
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/consultar-treino.php');
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

        dadosTabelaAluno = retorno.list;
        inserirDadosTabela(dadosTabelaAluno);

    } catch (error) {
        return false;
    }
}

async function cadastrarTreinos() {
    const dados = {
        aparelho: campoAparelho.value,
        repeticoes: campoNumeroRepeticoes.value
    }

    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/cadastrar-treino.php');
    const init = prepararRequisicao('POST', dados);
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            Toast.fire({
                icon: 'error',
                title: retorno.message
            })
            return;
        }

        
        Toast.fire({
            icon: 'success',
            title: 'Cadastro realizado com sucesso!'
        })

        buscarTreinos ();

        return retorno;

    } catch (error) {
        return false;
    }
}

async function removerTreino(codigoTreino) {


    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/remover-treino.php');
    const init = prepararRequisicao('POST', {cod: codigoTreino});
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            Toast.fire({
                icon: 'error',
                title: retorno.message
            })
            return;
        }

        
        Toast.fire({
            icon: 'success',
            title: 'Treino removido com sucesso!'
        })

        buscarTreinos ();

        return retorno;

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
                <td class="text-center font-size-16">${element.cod}</td>
                <td class="text-center font-size-16">${element.aparelho}</td>
                <td class="text-center font-size-16">${element.repeticoes}</td>
                <td class="text-center"><em class="fa-solid fa-circle-xmark fa-lg text-danger" onclick="removerTreino(${element.cod})"></em></td>
            </tr>
        `;
        });
    }
    document.querySelector('#tabTreinos tbody').innerHTML = '';
    document.querySelector('#tabTreinos tbody').insertAdjacentHTML('afterbegin', tbodyTable);
}

