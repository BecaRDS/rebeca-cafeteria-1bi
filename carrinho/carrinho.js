
const div = document.getElementById('itensCarrinho');
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
let valorTotal = 0;

function atualizarValorTotal() {
  let novoTotal = 0;
  for (let item in carrinho) {
    novoTotal += carrinho[item].quantidade * carrinho[item].preco;
  }
  document.getElementById('valorTotal').textContent = `Valor total da compra: R$ ${novoTotal.toFixed(2)}`;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  localStorage.setItem('quantidadeTotal', Object.values(carrinho).reduce((s, i) => s + i.quantidade, 0));
  localStorage.setItem('valorTotal', novoTotal.toFixed(2)); // <-- ESTA LINHA É IMPORTANTE
}

function alterarQuantidade(item, novaQuantidade) {
  novaQuantidade = parseInt(novaQuantidade);
  if (novaQuantidade <= 0) {
    delete carrinho[item];
  } else {
    carrinho[item].quantidade = novaQuantidade;
  }
  renderizarCarrinho();
  atualizarValorTotal();
}

function renderizarCarrinho() {
  div.innerHTML = '';
  if (Object.keys(carrinho).length === 0) {
    div.innerHTML = '<p>Seu carrinho está vazio.</p>';
  } else {
    for (let item in carrinho) {
      div.innerHTML += `
        <div class="item-carrinho">
          <span><strong>${item}</strong></span>
          <span>Preço: R$ ${carrinho[item].preco.toFixed(2)}</span>
          <label>
            Quantidade:
            <input type="number" min="0" value="${carrinho[item].quantidade}" 
              onchange="alterarQuantidade('${item}', this.value)" />
          </label>
        </div>
      `;
    }
  }
}

renderizarCarrinho();
atualizarValorTotal();
localStorage.setItem('valorTotal', total.toFixed(2)); // já deve existir se você mostra o total
