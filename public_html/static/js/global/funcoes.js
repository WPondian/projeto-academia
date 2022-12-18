
let btnVoltarTelaHome = document.querySelector('#btnVoltarTelaHome');

if(btnVoltarTelaHome){
    btnVoltarTelaHome.onclick = () => {
        window.location.href = window.location.origin  + '/projeto-academia/view/home/home.html';
    }
}

let Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function prepararRequisicao(metodo, dados, json = false) {
    const formData = new FormData();
    Object.keys(dados).forEach(key => formData.append(key, dados[key]));
    const body = json ? JSON.stringify(dados) : new URLSearchParams(formData);
    return {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: metodo,
        body: body
    };
}

async function fetchPadrao(requestInfo, init) {
    try {
        const response = await fetch(requestInfo, init);
        const retorno = await response.json();
        return retorno;
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error
        })
        return;
    }
}
