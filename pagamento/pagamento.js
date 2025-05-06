const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
let total = 0;
for (let item in carrinho) {
  total += carrinho[item].quantidade * carrinho[item].preco;
}
document.getElementById('resumoPagamento').textContent = `Total: R$${total.toFixed(2)}`;

function finalizarCompra() {
  alert('Compra finalizada com sucesso!');
  localStorage.removeItem('carrinho');
  localStorage.setItem('quantidadeTotal', 0);
  location.href = '../Inicio.html';
}