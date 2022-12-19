let pesoBaixo;
let pesoNormal;
let sobrepeso;
let obesidade;
let dadosGraficoImcAluno;

let categoria = document.querySelector('#sessaoCategoria');
let sectionRelatorioProfessor = document.querySelector('#sectionRelatorioProfessor');
let sectionRelatorioAluno = document.querySelector('#sectionRelatorioAluno');
categoria.value === 'P' ?  sectionRelatorioProfessor.classList.remove('d-none') : sectionRelatorioAluno.classList.remove('d-none');

google.charts.load('current', { packages: ['corechart'] });

buscarRelatorioImcAlunos();
buscarRelatorioImc();

function graficoRelatorioImcAlunos() {
    let data = google.visualization.arrayToDataTable([
        ['Classifição', 'Numero de Alunos'],
        ['Baixo peso', pesoBaixo],
        ['Normal', pesoNormal],
        ['Sobrepeso', sobrepeso],
        ['Obesidade', obesidade],
    ]);

    let options = {
        chartArea: { width: '90%', height: '90%' },
        slices: [{ color: '#83C635' }, { color: '#39bd0a' }, { color: '#FCA500' }, { color: '#F67600' }],
        legend: { position: 'right', alignment: 'center', textStyle: { color: 'black', fontSize: 16, bold: 1 } }
    };

    let chart = new google.visualization.PieChart(document.getElementById('divGraficoImcAlunos'));

    chart.draw(data, options);
}

function graficoRelatorioImc() {

    let novoArray = [['Data', 'IMC']]
    dadosGraficoImcAluno.forEach(element => {
        novoArray.push([moment(element.data_cadastro).format("DD/MM/YYYY"), element.imc])
    });

    let data = google.visualization.arrayToDataTable(novoArray);

    let options = {
        height: 430,
        curveType: 'none',
        chartArea: { top:'40', width: '85%', height: '50%' },
        legend: { position: 'bottom', alignment: 'center', textStyle: { color: 'black', fontSize: 16, bold: 1 } },
        vAxis: {textStyle:{color: 'black', fontSize: 14, bold: 1} },
        hAxis: { slantedTextAngle: '90', format: 'short', gridlines: {color: '#333'},textStyle:{color: 'black', fontSize: 14, bold: 1} },
        crosshair: {opacity: 1, trigger: 'focus' }
    };

    let chart = new google.visualization.LineChart(document.getElementById('divGraficoRelatorioImc'));

    chart.draw(data, options);
}

async function buscarRelatorioImcAlunos() {
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/relatorio-classificacoes.php');
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

        pesoBaixo = retorno.list.baixoPeso;
        pesoNormal = retorno.list.normal;
        sobrepeso = retorno.list.sobrepeso;
        obesidade = retorno.list.obesidade;
        google.charts.setOnLoadCallback(graficoRelatorioImcAlunos);

    } catch (error) {
        return false;
    }
}

async function buscarRelatorioImc() {
    const requestInfo = new Request(window.location.origin + '/projeto-academia/controller/relatorio-aluno.php');
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

        dadosGraficoImcAluno = retorno.list.reverse();

        google.charts.setOnLoadCallback(graficoRelatorioImc);

    } catch (error) {
        return false;
    }
}

