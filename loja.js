// Abrir e fechar Botão do modal
const button = document.querySelector("button")
const modal = document.querySelector("dialog")
const buttonClose = document.querySelector("dialog button")

button.onclick = function (){
    modal.showModal()
}

buttonClose.onclick = function (){
    modal.close()
}

// adicionando valores ao carrinho 

    // Variável para armazenar o valor total
let valorTotal = 0;

// Array para armazenar os itens no carrinho
let carrinhoItens = [];

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nomeItem, precoItem) {
    // Adicionar o item ao carrinho
    carrinhoItens.push({ nome: nomeItem, preco: precoItem });
  
    // Atualizar o valor total
    valorTotal += precoItem;
  
    // Aqui você pode adicionar lógica adicional, como exibir uma mensagem de sucesso
    alert(`${nomeItem} adicionado ao carrinho!`);
  
    // Atualizar a interface do usuário
    atualizarCarrinho();
    atualizarValorTotal();
}
  
// Função para atualizar o carrinho na interface do usuário


function atualizarCarrinho() {
    const carrinhoItensElement = document.getElementById('carrinhoItens');
    carrinhoItensElement.innerHTML = '';
  
    carrinhoItens.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
        carrinhoItensElement.appendChild(listItem);
    });
}
// Função para atualizar o valor total
function atualizarValorTotal() {
    const valorTotalElement = document.getElementById('valorTotal');
    let total = 0;
    carrinhoItens.forEach(item => {
        total += item.preco;
    });
    valorTotalElement.textContent = `Valor total: R$${total.toFixed(2)}`;
}

// calculando forma de pagamento 
function calcularPagamento() {
let pagamento = document.getElementById('formaPagamentoInput').value;
let produto = valorTotal;
let resultadoDiv = document.getElementById('resultados');

resultadoDiv.innerHTML = '';

let paragrafo = document.createElement('p');

if (pagamento == 'PIX' || pagamento == 'Débito') {
    let desconto = (produto * 15) / 100;
    let montante = produto - desconto;
    paragrafo.textContent = `Valor total do pagamento: R$${montante.toFixed(2)} (Desconto de 15%)`;
} else if (pagamento == 'Credito à vista') {
    let desconto = (produto * 10) / 100;
    let montante = produto - desconto;
    paragrafo.textContent = `Valor total do pagamento: R$${montante.toFixed(2)} (Desconto de 10%)`;
} else if (pagamento == '2x') {
    let parcela = (produto / 2).toFixed(2);
    paragrafo.textContent = `Valor total do pagamento: R$${produto.toFixed(2)} (2x de R$${parcela})`;
} else if (pagamento == '3x' || pagamento == '4x' || pagamento == '5x') {
    let numeroParcelas = parseInt(pagamento.charAt(0)); // Obtém o número de parcelas (3, 4, ou 5)
    let juros = (produto * 10) / 100;
    let montante = produto + juros;
    let parcela = (montante / numeroParcelas).toFixed(2);
    paragrafo.textContent = `Valor total do pagamento: R$${montante.toFixed(2)} (${numeroParcelas}x de R$${parcela} com juros de 10%)`;
}
resultadoDiv.appendChild(paragrafo);
}
