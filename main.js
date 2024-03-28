let textSemanal = "Exibindo entradas semanais:";
let textMensal = "Exibindo entradas mensais:";
const clientes = ["Pedro", "Lucas", "Clara"];
const diasHospedados = [2, 5, 1];
let valorDiaria = 235;

console.log(textSemanal)
let total = 0;
for (let i = 0; i < clientes.length; i++) {
    let calculo = diasHospedados[i] * valorDiaria;
    total += calculo;
    console.log("----------------------------");
    console.log(clientes[i]);
    console.log("Dias hospedados: " + diasHospedados[i]);
    console.log("Valor de entrada semanal: R$ " + calculo);
}
console.log("Entrada total semanal: R$ " + total);
