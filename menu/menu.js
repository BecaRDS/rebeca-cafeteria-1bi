const cafes = [
    { nome: "Café Expresso", preco: 5, imagem: "cafeExpresso.jpg", descricao: "Intenso e encorpado, o expresso é o clássico do café." },
    { nome: "Café com Leite", preco: 6, imagem: "cafeComLeite.jpg", descricao: "Mistura perfeita de café expresso com leite cremoso." },
    { nome: "Capuccino", preco: 7, imagem: "capuccino.jpg", descricao: "Café expresso com espuma de leite e toque de canela." },
    { nome: "Mocha", preco: 8, imagem: "mocha.jpg", descricao: "Café expresso com chocolate e leite vaporizado." },
    { nome: "Macchiato", preco: 7.5, imagem: "macchiato.jpg", descricao: "Café expresso com uma leve camada de leite vaporizado." },
    { nome: "Latte", preco: 6.5, imagem: "latte.jpg", descricao: "Café suave com bastante leite vaporizado." },
    { nome: "Café Gelado", preco: 6, imagem: "cafeGelado.jpg", descricao: "Refrescante café gelado, perfeito para os dias quentes." },
    { nome: "Café Caramelo", preco: 7.5, imagem: "cafeCaramelo.jpg", descricao: "Doce e suave, o café com caramelo conquista os paladares." },
    { nome: "Café Baunilha", preco: 7, imagem: "cafeBaunilha.jpg", descricao: "Sabor delicado de baunilha misturado ao expresso." },
    { nome: "Café Chocolate", preco: 8, imagem: "cafeChocolate.jpg", descricao: "Café expresso com chocolate quente e leite vaporizado." },
    { nome: "Café com Chantilly", preco: 8.5, imagem: "cafeChantilly.jpg", descricao: "Café doce com uma camada generosa de chantilly." },
    { nome: "Café com Canela", preco: 6.5, imagem: "cafeCanela.jpg", descricao: "Café com um toque especial de canela." },
    { nome: "Café com Leite Condensado", preco: 7.5, imagem: "cafeLeiteCondensado.jpg", descricao: "Café adocicado com leite condensado, um verdadeiro prazer." },
    { nome: "Café Vegano", preco: 7, imagem: "cafeVegano.jpg", descricao: "Café preparado com leite vegetal, para todos os gostos." },
    { nome: "Café Especial da Casa", preco: 9, imagem: "cafeEspecial.jpg", descricao: "A especialidade da casa com um sabor único e diferenciado." }
  ];
  
  function adicionarCarrinho(item, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    if (!carrinho[item]) carrinho[item] = { quantidade: 0, preco };
    carrinho[item].quantidade++;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    let total = Object.values(carrinho).reduce((sum, i) => sum + i.quantidade, 0);
    localStorage.setItem('quantidadeTotal', total);
    alert(item + ' adicionado ao carrinho!');
  }
  
  window.onload = () => {
    const container = document.getElementById('menu-container');
    const botaoVoltar = container.querySelector('.botao');
  
    // Cria o botão "Carrinho"
    const botaoCarrinho = document.createElement('button');
    botaoCarrinho.className = 'botao';
    botaoCarrinho.textContent = '🛒 Carrinho';
    botaoCarrinho.onclick = () => {
      window.location.href = 'carrinho.html';
    };
  
    // Adiciona o botão no topo do container
    container.insertBefore(botaoCarrinho, botaoVoltar);
  
    cafes.forEach(cafe => {
      const section = document.createElement('section');
      section.className = 'menu-item';
      section.innerHTML = `
        <img src="imagens/${cafe.imagem}" alt="${cafe.nome}">
        <div>
          <h3>${cafe.nome}</h3>
          <p>${cafe.descricao}</p>
          <p>R$${cafe.preco.toFixed(2).replace('.', ',')}</p>
        </div>
        <button class="botao" onclick="adicionarCarrinho('${cafe.nome}', ${cafe.preco})">Adicionar</button>
      `;
      container.insertBefore(section, botaoVoltar);
    });
  };
  
  
  