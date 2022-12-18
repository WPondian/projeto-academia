const camposFormCadastraUsuario = document.querySelectorAll('#cadastrarUsuario input');
const btnCadastrar = document.querySelector('#btnCadastrar');
const btnCancelarCadastrar = document.querySelector('#btnCancelarCadastrar');
const campoUsuario = document.querySelector('#usuario');
let dados = {};


campoUsuario.onchange = async () => {
    await exiteUsuario(campoUsuario.value);
};

btnCancelarCadastrar.onclick = () => {
    window.location.href = window.location.origin  + '/projeto-academia/index.html';
}

btnCadastrar.onclick = async () => {

    camposFormCadastraUsuario.forEach((elemente) => {

        if (elemente.id === 'altura') {
            dados.altura = elemente.value ? parseFloat(elemente.value.replace(',', '.')) : '';
            return;
        }

        if (elemente.id === 'peso') {
            dados.peso = elemente.value ? parseFloat(elemente.value) : '';
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

    let usuarioExiste = await exiteUsuario(campoUsuario.value);
    if (usuarioExiste) {
        return;
    }

    cadastrarUsuario(dados);
}

async function exiteUsuario(usuario) {
    const requestInfo = new Request('http://localhost/projeto-academia/controller/usuario-existe.php');
    const init = prepararRequisicao('POST', {usuario:usuario});
    try {
        const retorno = await fetchPadrao(requestInfo, init);

        if (retorno.erro) {
            Toast.fire({
                icon: 'error',
                title: retorno.message
            })
            return true;
        }

        return false;

    } catch (error) {
        return false;
    }
}

async function cadastrarUsuario(dados) {
    const requestInfo = new Request('http://localhost/projeto-academia/controller/usuario-cadastrar.php');
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

        setTimeout(()=>{window.location.href =  window.location.origin  + '/projeto-academia/index.html'},3000)
        return retorno;

    } catch (error) {
        return false;
    }
}