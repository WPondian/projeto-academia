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
        console.error('fetchPadrao', error);
        return alert('Um erro inesperado ocorreu, tente novamente mais tarde ou entre em contato!');
    }
}
