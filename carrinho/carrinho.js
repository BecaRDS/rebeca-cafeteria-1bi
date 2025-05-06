const div = document.getElementById('itensCarrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    let valorTotal = 0;

    if (Object.keys(carrinho).length === 0) {
      div.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
      for (let item in carrinho) {
        div.innerHTML += `<p>${item} - Quantidade: ${carrinho[item].quantidade}</p>`;
        valorTotal += carrinho[item].quantidade * carrinho[item].preco;
      }
    }

    document.getElementById('valorTotal').textContent = `Valor total da compra: R$ ${valorTotal.toFixed(2)}`;