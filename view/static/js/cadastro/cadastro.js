const camposFormCadastraUsuario = document.querySelectorAll('#cadastrarUsuario input');
const btnCadastrar = document.querySelector('#btnCadastrar');

let dados = {};

btnCadastrar.onclick = () => {

    camposFormCadastraUsuario.forEach((elemente) => {
        
        if (elemente.id === 'cadastroAltura' || elemente.id === 'cadastroPeso') {
            return;
        }

        if (elemente.id === 'cadastroProfessor') {
            dados.categoria = elemente.checked ? 'P' : 'A';
            return;
        }

        if (elemente.id === 'cadastroAluno') {
            dados.categoria = elemente.checked ? 'A' : 'P';
            return;
        }

        dados[`${elemente.id}`] = elemente.value;
    })

    cadastrarUsuario(dados);
}

async function cadastrarUsuario(dados) {
    const requestInfo = new Request('http://localhost/projeto-academia/controller/usuario-cadastrar.php');
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