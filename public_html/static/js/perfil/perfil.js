
let campoNome = document.querySelector('#nome');
let campoEndereco = document.querySelector('#endereco');
let campoTelefone = document.querySelector('#telefone');

let btnAlterarPerfil = document.querySelector('#btnAlterarPerfil');

buscarDadosCliente();

btnAlterarPerfil.onclick = () => alterarPerfil(); 

async function buscarDadosCliente () {
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/consultar-dados-perfil.php');
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

        campoNome.value = retorno.list.nome;
        campoEndereco.value = retorno.list.endereco;
        campoTelefone.value = retorno.list.telefone;

        return;

    } catch (error) {
        return false;
    }
}

async function alterarPerfil () {
    const dados = {
        nome: campoNome.value, 
        endereco: campoEndereco.value,
        telefone: campoTelefone.value
    };
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/editar-dados-perfil.php');
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
            title: 'Perfil atualizado com sucesso!'
        })

        setTimeout(() => { window.location.href = window.location.origin + '/projeto-academia/view/home/home.html' }, 3000)
        
        return;

    } catch (error) {
        return false;
    }
}
