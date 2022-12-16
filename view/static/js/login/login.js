
let btnRealizarLogin = document.querySelector('#btnRealizarLogin');
btnRealizarLogin.onclick = () => buscarDadosCliente();

let btnAbirCadastrar = document.querySelector('#btnAbirCadastrar');
btnAbirCadastrar.setAttribute('href', window.location.href + 'view/cadastro/cadastro.html')


async function buscarDadosCliente () {
    const dados = {
    usuario: document.querySelector('#loginUsuario').value,
    senha: document.querySelector('#loginSenha').value,
    }

    const requestInfo = new Request('http://localhost/projeto-academia/controller/login.php');
    const init = prepararRequisicao('POST', dados);
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            alert(retorno.message);
            return retorno;
        }

        return retorno;

    } catch (error) {
        return false;
    }
}

