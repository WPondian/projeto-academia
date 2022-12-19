
let btnRealizarLogin = document.querySelector('#btnRealizarLogin');
btnRealizarLogin.onclick = () => realizarLogin();

let btnAbrirCadastrar = document.querySelector('#btnAbrirCadastrar');
btnAbrirCadastrar.onclick = () => {
    window.location.href = window.location.origin + '/projeto-academia/view/cadastro/cadastro.html';
}

let campoUsuario = document.querySelector('#loginUsuario');
let campoSenha = document.querySelector('#loginSenha');
campoSenha.onkeypress = (element) => {
    if (element.keyCode === 13) {
        realizarLogin();
    }
}

async function realizarLogin() {

    if (!validarLogin()) {
        return;
    }

    const dados = {
        usuario: document.querySelector('#loginUsuario').value,
        senha: document.querySelector('#loginSenha').value,
    }

    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/login.php');
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
            title: 'Login realizado com sucesso!'
        })

        setTimeout(() => { window.location.href = window.location.origin + '/projeto-academia/view/home/home.html' }, 3000)

        return;

    } catch (error) {
        return false;
    }
}

function validarLogin() {
    let camposValidados = true;
    
    if (!campoUsuario.value.trim() && !campoSenha.value.trim()) {
        campoUsuario.focus();
        Toast.fire({
            icon: 'error',
            title: 'O campo Login deve ser preenchido!'
        });
        camposValidados = false;
        return;
    }

    if (!campoUsuario.value.trim()) {
        campoUsuario.focus();
        Toast.fire({
            icon: 'error',
            title: 'O campo Login deve ser preenchido!'
        });
        camposValidados = false;
        return;
    }

    if (!campoSenha.value.trim()) {
        campoSenha.focus();
        Toast.fire({
            icon: 'error',
            title: 'O campo Senha deve ser preenchido!'
        });
        camposValidados = false;
        return;
    }

    return camposValidados;
}


