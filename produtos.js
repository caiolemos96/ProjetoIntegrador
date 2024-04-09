// Recuperar os dados da coleção 'produtos'
firebase.firestore().collection('produtos').get()
    .then((snapshot) => {
        // Array para armazenar os dados recuperados
        const produtos = [];

        // Iterar sobre os documentos recuperados
        snapshot.forEach((doc) => {
            // Obter os dados de cada documento e adicioná-los ao array
            produtos.push(doc.data());
        });

        // Após recuperar todos os dados, renderize-os na tela
        renderizarProdutos(produtos);
    })
    .catch((error) => {
        console.error("Erro ao recuperar os dados:", error);
    });

// Função para renderizar os produtos na tela
function renderizarProdutos(produtos) {
    // Selecionar o elemento onde os produtos serão exibidos
    const listaProdutos = document.getElementById('transactions');

    // Limpar o conteúdo anterior, se houver
    listaProdutos.innerHTML = '';

    // Iterar sobre os produtos e criar elementos HTML para cada um
    produtos.forEach((produto) => {
        // Criar um elemento de div para representar o produto
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');

        // Criar elementos HTML para exibir os detalhes do produto
        const skuProduto = document.createElement('p');
        skuProduto.textContent = `SKU: ${produto.sku}`;

        const nomeProduto = document.createElement('p');
        nomeProduto.textContent = `Nome do Produto: ${produto.nome}`;

        const custoProduto = document.createElement('p');
        custoProduto.textContent = `Custo: ${produto.custo}`;

        const estoqueProduto = document.createElement('p');
        estoqueProduto.textContent = `Estoque: ${produto.quantidade}`;
        

        const validadeProduto = document.createElement('p');
        validadeProduto.textContent = `Validade: ${produto.validade}`;

        // Adicionar os elementos ao divProduto
        divProduto.appendChild(skuProduto);
        divProduto.appendChild(nomeProduto);
        divProduto.appendChild(custoProduto);
        divProduto.appendChild(estoqueProduto);
        divProduto.appendChild(validadeProduto);

        // Adicionar o divProduto à lista de produtos na tela
        listaProdutos.appendChild(divProduto);
    });
}