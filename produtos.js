function carregarProdutos() {
    // Recuperar os dados da coleção 'produtos'
    firebase.firestore().collection('produtos').get()
    .then((snapshot) => {
        // Array para armazenar os dados recuperados
        const produtos = [];

        // Iterar sobre os documentos recuperados
        snapshot.forEach((doc) => {
            // Obter os dados de cada documento e adicioná-los ao array
            produtos.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        // Após recuperar todos os dados, renderize-os na tela
        renderizarProdutos(produtos);
    })
    .catch((error) => {
        console.error("Erro ao recuperar os dados:", error);
    });
}

carregarProdutos();

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
        const custoFormatado = parseFloat(produto.custo).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        custoProduto.textContent = `Custo: ${custoFormatado}`;

        const estoqueProduto = document.createElement('p');
        estoqueProduto.textContent = `Estoque: ${produto.quantidade}`;
        

        const validadeProduto = document.createElement('p');
        validadeProduto.textContent = `Validade: ${produto.validade}`;

        // Criar elementos HTML para editar produto
        const skuProdutoCampo = document.createElement('input');
        skuProdutoCampo.placeholder = "SKU";
        skuProdutoCampo.value = produto.sku;
        skuProdutoCampo.style.display = "none";

        const nomeProdutoCampo = document.createElement('input');
        nomeProdutoCampo.placeholder = "Nome do Produto";
        nomeProdutoCampo.value = produto.nome;
        nomeProdutoCampo.style.display = "none";

        const custoProdutoCampo = document.createElement('input');
        custoProdutoCampo.placeholder = "Custo";
        custoProdutoCampo.value = produto.custo;
        custoProdutoCampo.style.display = "none";

        const estoqueProdutoCampo = document.createElement('input');
        estoqueProdutoCampo.placeholder = "Estoque";
        estoqueProdutoCampo.value = produto.quantidade;
        estoqueProdutoCampo.style.display = "none";

        const validadeProdutoCampo = document.createElement('input');
        validadeProdutoCampo.placeholder = "Validade";
        validadeProdutoCampo.value = produto.validade;
        validadeProdutoCampo.style.display = "none";

        const botaoEditarProduto = document.createElement('button');
        botaoEditarProduto.textContent = "Editar";
        botaoEditarProduto.addEventListener("click", () => {
            skuProduto.style.display = "none";
            nomeProduto.style.display = "none";
            custoProduto.style.display = "none";
            estoqueProduto.style.display = "none";
            validadeProduto.style.display = "none";
            botaoEditarProduto.style.display = "none";

            skuProdutoCampo.style.display = "block";
            nomeProdutoCampo.style.display = "block";
            custoProdutoCampo.style.display = "block";
            estoqueProdutoCampo.style.display = "block";
            validadeProdutoCampo.style.display = "block";
            botaoSalvarProduto.style.display = "block";
        });
        
        const botaoSalvarProduto = document.createElement('button');
        botaoSalvarProduto.textContent = "Salvar";
        botaoSalvarProduto.style.display = "none";
        botaoSalvarProduto.addEventListener("click", () => {
            const atualizarProduto = {
                nome: nomeProdutoCampo.value,
                sku: skuProdutoCampo.value,
                custo: custoProdutoCampo.value,
                validade: validadeProdutoCampo.value,
                quantidade: estoqueProdutoCampo.value
            };
            const db = firebase.firestore();
            db.collection('produtos').doc(produto.id).set(atualizarProduto).then(response => {
                alert('Produto atualizado com sucesso!');

                skuProdutoCampo.style.display = "none";
                nomeProdutoCampo.style.display = "none";
                custoProdutoCampo.style.display = "none";
                estoqueProdutoCampo.style.display = "none";
                validadeProdutoCampo.style.display = "none";
                botaoSalvarProduto.style.display = "none";

                skuProduto.style.display = "block";
                nomeProduto.style.display = "block";
                custoProduto.style.display = "block";
                estoqueProduto.style.display = "block";
                validadeProduto.style.display = "block";
                botaoEditarProduto.style.display = "block";

                carregarProdutos();
            }).catch(error => { console.error(error)
                alert("Produto não atualizado");
            });
        });

        // Adicionar os elementos ao divProduto
        divProduto.appendChild(skuProduto);
        divProduto.appendChild(nomeProduto);
        divProduto.appendChild(custoProduto);
        divProduto.appendChild(estoqueProduto);
        divProduto.appendChild(validadeProduto);
        divProduto.appendChild(botaoEditarProduto);

        divProduto.appendChild(skuProdutoCampo);
        divProduto.appendChild(nomeProdutoCampo);
        divProduto.appendChild(custoProdutoCampo);
        divProduto.appendChild(estoqueProdutoCampo);
        divProduto.appendChild(validadeProdutoCampo);
        divProduto.appendChild(botaoSalvarProduto);

        // Adicionar o divProduto à lista de produtos na tela
        listaProdutos.appendChild(divProduto);
    });
}