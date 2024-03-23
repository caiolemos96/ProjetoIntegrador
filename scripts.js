//Seleção de botões
const botaoCadastros = document.getElementById('cadastros')
const botaoVerProduto = document.getElementById('btn-verProduto')
const botaoExpedicao = document.getElementById('btn-expedicao')
const botaoCadastrar = document.getElementById('btn-cadastro-produto')
//Seleção de de campos
let nomeProduto = document.getElementById('nome-produto')
let skuProduto = document.getElementById('sku-produto')
let custoProduto = document.getElementById('custo-produto')
let validadeProduto = document.getElementById('validade-produto')
let qtdEstoque = document.getElementById('qtd-estoque')

// Adicionei um evento que escuta e reage ao clique, cria uma função para tratar e validar os dados inseridos
botaoCadastrar.addEventListener('click', cadastrarNovoProduto);

function cadastrarNovoProduto() {
    // Validação dos campos vazios
    if (nomeProduto.value.trim() === '' || skuProduto.value.trim() === '' || custoProduto.value.trim() === '' || validadeProduto.value.trim() === '' || qtdEstoque.value.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Criei uma variavel formatar o campo de custo para formato de dinheiro 
    const custoFormatado = parseFloat(custoProduto.value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    // Dentro da função também criei um objeto de novo produto com os dados formatados
    const novoProduto = {
        nome: nomeProduto.value,
        sku: skuProduto.value,
        custo: custoFormatado,
        validade: validadeProduto.value,
        quantidade: qtdEstoque.value
    };
    
    alert('Produto cadastrado com sucesso!');
   


}