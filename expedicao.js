const formSub = document.getElementById('form-ex');
// Selecionar o input do SKU
const inputSku = document.getElementById('baixa-sku');
// Elemento para exibir o produto e a quantidade que está sendo dado baixa no estoque
const produtoBaixado = document.getElementById('produto-baixado');

// Adicionar um evento de escuta para o botão de dar baixa no estoque
formSub.addEventListener('submit', () => {
    event.preventDefault();
    // Obter o SKU digitado pelo usuário
    const sku = inputSku.value;
    inputSku.value = '';
    inputSku.focus();

    // Buscar o produto no Firestore pelo SKU
    firebase.firestore().collection('produtos').where('sku', '==', sku).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                // Se não encontrar nenhum produto com o SKU fornecido, exibir mensagem de erro
                alert("Produto não encontrado");
                return;
            }

            // Se encontrar o produto, obter o primeiro documento (deveria haver apenas um com o SKU único)
            const produto = snapshot.docs[0].data();

            // Reduzir a quantidade em estoque em 1
            const novaQuantidade = produto.quantidade - 1;

            // Atualizar a quantidade em estoque no Firestore
            firebase.firestore().collection('produtos').doc(snapshot.docs[0].id).update({ quantidade: novaQuantidade })
                .then(() => {
                    // Exibir o produto e a quantidade que está sendo dado baixa no estoque
                    produtoBaixado.textContent = `Produto: ${produto.nome} - Quantidade: 1`;
                })
                .catch((error) => {
                    console.error("Erro ao atualizar a quantidade em estoque:", error);
                });
        })
        .catch((error) => {
            console.error("Erro ao buscar o produto:", error);
        });
});
