const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let clientes = [];
let diasHospedados = [];
let valorDiaria = 0;

function carregarDados() {
    try {
        const data = fs.readFileSync('clientes.json', 'utf8');
        const jsonData = JSON.parse(data);
        clientes = jsonData.clientes;
        diasHospedados = jsonData.diasHospedados;
        console.log("Dados carregados com sucesso.");
    } catch (err) {
        console.log("Erro ao carregar dados:", err);
    }
}

function salvarDados() {
    const data = JSON.stringify({ clientes, diasHospedados });
    fs.writeFileSync('clientes.json', data);
}

function adicionarCliente() {
    rl.question('Digite o nome do cliente: ', (nome) => {
        rl.question(`Digite o tipo de quarto para ${nome} (suíte, deluxe, standard): `, (tipoQuarto) => {
            rl.question(`Digite o número de dias de hospedagem para ${nome}: `, (dias) => {
                if (!isNaN(parseInt(dias, 10))) {
                    clientes.push(nome);
                    diasHospedados.push(parseInt(dias, 10));
                    definirValorDiaria(tipoQuarto.toLowerCase());
                    salvarDados();
                } else {
                    console.log('Número de dias de hospedagem inválido. Por favor, tente novamente.');
                }
                processamentoDados();
            });
        });
    });
}

function removerCliente() {
    rl.question('Digite o nome do cliente que deseja remover: ', (nome) => {
        const index = clientes.indexOf(nome);
        if (index !== -1) {
            clientes.splice(index, 1);
            diasHospedados.splice(index, 1);
            console.log(`Cliente ${nome} removido com sucesso.`);
            salvarDados();
        } else {
            console.log(`Cliente ${nome} não encontrado.`);
        }
        processamentoDados();
    });
}

function processamentoDados() {
    if (clientes.length !== diasHospedados.length) {
        console.log("Erro: O número de clientes não corresponde ao número de dias de hospedagem.");
        return;
    }

    console.log("Exibindo entradas semanais:");
    let total = 0;
    for (let i = 0; i < clientes.length; i++) {
        const calculo = diasHospedados[i] * valorDiaria;
        total += calculo;
        console.log("-----------------------------");
        console.log(clientes[i]);
        console.log("Tipo de quarto: " + definirTipoQuarto(valorDiaria));
        console.log("Dias hospedados: " + diasHospedados[i]);
        console.log("Valor de entrada: R$ " + calculo);
        console.log("-----------------------------");
    }

    console.log(`Entrada total da semana: R$ ${total}`);

    const entradaMensal = total * 4;
    console.log(`Entrada total mensal estimada: R$ ${entradaMensal}`);

    const demanda = clientes.length < 15 ? "baixa" : "adequada";
    console.log(`A demanda de clientes está ${demanda}.`);

    const metaEsperada = 250000;
    if (entradaMensal < metaEsperada) {
        console.log(`Foi registrada uma estimativa de R$ ${entradaMensal}, valor abaixo da meta esperada.`);
    } else {
        console.log(`Foi registrada uma estimativa de R$ ${entradaMensal}, valor da meta alcançado!`);
    }

    console.log("---------------------\n HOTEL Casa Del Mar");
    console.log("80 anos de tradição");
}

function definirValorDiaria(tipoQuarto) {
    switch (tipoQuarto) {
        case 'suíte':
            valorDiaria = 300;
            break;
        case 'deluxe':
            valorDiaria = 250;
            break;
        case 'standard':
            valorDiaria = 200;
            break;
        default:
            console.log('Tipo de quarto inválido. Usando valor padrão.');
            valorDiaria = 235; // Valor padrão
            break;
    }
}

function definirTipoQuarto(valorDiaria) {
    if (valorDiaria === 300) {
        return "Suíte";
    } else if (valorDiaria === 250) {
        return "Deluxe";
    } else if (valorDiaria === 200) {
        return "Standard";
    } else {
        return "Outro";
    }
}

carregarDados();

rl.question('Escolha uma opção:\n1. Adicionar cliente\n2. Remover cliente\n', (opcao) => {
    if (opcao === '1') {
        adicionarCliente();
    } else if (opcao === '2') {
        removerCliente();
    } else {
        console.log('Opção inválida.');
        rl.close();
    }
});
