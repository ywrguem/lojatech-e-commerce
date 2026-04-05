// ============================
// LojaTech - Carrinho Completo
// ============================

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantidade;
  });

  const cartCountElements = document.querySelectorAll("#cart-count");
  cartCountElements.forEach((el) => {
    el.textContent = totalItems;
  });
}

// ============================
// Adicionar ao Carrinho
// ============================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    const nome = button.dataset.nome;
    const preco = parseFloat(button.dataset.preco);
    const imagem = button.dataset.imagem;

    const cart = getCart();

    const produtoExistente = cart.find((item) => item.id === id);

    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      cart.push({
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem,
        quantidade: 1
      });
    }

    saveCart(cart);
    updateCartCount();

    alert(`${nome} foi adicionado ao carrinho!`);
  });
});

// ============================
// Renderizar Carrinho
// ============================

function renderCart() {
  const cartContainer = document.querySelector("#cart-items");
  const cartTotalElement = document.querySelector("#cart-total");

  if (!cartContainer || !cartTotalElement) return;

  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    cartTotalElement.textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.preco * item.quantidade;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.imagem}" alt="${item.nome}">
        
        <div class="cart-item-info">
          <h3>${item.nome}</h3>
          <p>Preço: R$ ${item.preco.toFixed(2)}</p>
          <p>Quantidade: <strong>${item.quantidade}</strong></p>

          <div class="cart-controls">
            <button class="btn-small btn-minus" onclick="decreaseItem('${item.id}')">-</button>
            <button class="btn-small btn-plus" onclick="increaseItem('${item.id}')">+</button>
            <button class="btn-small btn-remove" onclick="removeItem('${item.id}')">Remover</button>
          </div>
        </div>
      </div>
      <hr>
    `;
  });

  cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// ============================
// Funções globais do carrinho
// ============================

function increaseItem(id) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);

  if (item) {
    item.quantidade += 1;
  }

  saveCart(cart);
  renderCart();
  updateCartCount();
}

function decreaseItem(id) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);

  if (item) {
    item.quantidade -= 1;

    if (item.quantidade <= 0) {
      const index = cart.findIndex((p) => p.id === id);
      cart.splice(index, 1);
    }
  }

  saveCart(cart);
  renderCart();
  updateCartCount();
}

function removeItem(id) {
  const cart = getCart();
  const newCart = cart.filter((p) => p.id !== id);

  saveCart(newCart);
  renderCart();
  updateCartCount();
}

// ============================
// Limpar carrinho
// ============================

const btnClear = document.querySelector("#btn-clear");

if (btnClear) {
  btnClear.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
  });
}

// ============================
// Inicialização
// ============================

updateCartCount();
renderCart();