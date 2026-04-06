// ================================
// FUNÇÕES DO CARRINHO (LOCALSTORAGE)
// ================================

// Pega o carrinho do LocalStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Salva o carrinho no LocalStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Atualiza o contador do carrinho no menu
function updateCartCount() {
  const cart = getCart();
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  const cartCountElement = document.getElementById("cartCount");

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Adiciona produto ao carrinho
function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  saveCart(cart);
  updateCartCount();

  // ALERTA (REQUISITO ATIVIDADE 3)
  alert(product.name + " foi adicionado ao carrinho!");
}

// ================================
// DATA E HORA (REQUISITO ATIVIDADE 3)
// ================================
function showDateTime() {
  const dateTimeElement = document.getElementById("dateTime");

  if (!dateTimeElement) return;

  function updateTime() {
    const now = new Date();
    dateTimeElement.textContent = "Data e Hora: " + now.toLocaleString("pt-BR");
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// ================================
// MODO CLARO E ESCURO (TEMA)
// ================================
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// ================================
// DETALHES DO PRODUTO (MOSTRAR/ESCONDER)
// ================================
function setupDetailsButtons() {
  const detailButtons = document.querySelectorAll(".btn-details");

  detailButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const detailsDiv = btn.parentElement.querySelector(".details");

      if (!detailsDiv) return;

      detailsDiv.classList.toggle("hidden");

      if (detailsDiv.classList.contains("hidden")) {
        btn.textContent = "Ver detalhes";
      } else {
        btn.textContent = "Ocultar detalhes";
      }
    });
  });
}

// ================================
// PESQUISA DE PRODUTOS
// ================================
function setupSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const searchInput = document.getElementById("searchInput");

  if (!searchBtn || !resetBtn || !searchInput) return;

  searchBtn.addEventListener("click", () => {
    const searchText = searchInput.value.trim().toLowerCase();

    if (searchText === "") {
      alert("Digite um nome para pesquisar!");
      return;
    }

    const products = document.querySelectorAll(".product-item");

    products.forEach((product) => {
      const productName = product.dataset.name.toLowerCase();

      if (productName.includes(searchText)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";

    const products = document.querySelectorAll(".product-item");
    products.forEach((product) => {
      product.style.display = "block";
    });
  });
}

// ================================
// RENDERIZA O CARRINHO NA PÁGINA
// ================================
function renderCartPage() {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalSpan = document.getElementById("cartTotal");

  if (!cartItemsDiv || !cartTotalSpan) return;

  const cart = getCart();
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Seu carrinho está vazio.</p>";
    cartTotalSpan.textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">

        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Preço: R$ ${item.price.toFixed(2)}</p>
          <p>Quantidade: <strong>${item.quantity}</strong></p>

          <div class="cart-controls">
            <button class="btn-small btn-minus" onclick="decreaseItem(${item.id})">-</button>
            <button class="btn-small btn-plus" onclick="increaseItem(${item.id})">+</button>
            <button class="btn-small btn-remove" onclick="removeItem(${item.id})">Remover</button>
          </div>
        </div>
      </div>
      <hr>
    `;
  });

  cartTotalSpan.textContent = "R$ " + total.toFixed(2);
}

// ================================
// FUNÇÕES DO CARRINHO (AUMENTAR/DIMINUIR/REMOVER)
// ================================
window.increaseItem = function (id) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);

  if (item) {
    item.quantity += 1;
  }

  saveCart(cart);
  updateCartCount();
  renderCartPage();
};

window.decreaseItem = function (id) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);

  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      const index = cart.findIndex((p) => p.id === id);
      cart.splice(index, 1);
    }
  }

  saveCart(cart);
  updateCartCount();
  renderCartPage();
};

window.removeItem = function (id) {
  const cart = getCart();
  const newCart = cart.filter((p) => p.id !== id);

  saveCart(newCart);
  updateCartCount();
  renderCartPage();
};

// ================================
// BOTÃO LIMPAR CARRINHO
// ================================
function setupClearCartButton() {
  const clearBtn = document.getElementById("clearCartBtn");

  if (!clearBtn) return;

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    alert("Carrinho limpo com sucesso!");

    updateCartCount();
    renderCartPage();
  });
}

// ================================
// FORMULÁRIO DE CONTATO
// ================================
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (!form || !formMsg) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    formMsg.textContent = "Mensagem enviada com sucesso!";
    formMsg.style.color = "green";

    form.reset();
  });
}

// ================================
// LOGIN E CADASTRO FUNCIONAIS
// ================================

// Salva usuário cadastrado
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// Pega usuário cadastrado
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

// Salva sessão do usuário logado
function loginUser(email) {
  localStorage.setItem("loggedUser", email);
}

// Remove sessão (logout)
function logoutUser() {
  localStorage.removeItem("loggedUser");
}

// Pega usuário logado
function getLoggedUser() {
  return localStorage.getItem("loggedUser");
}

// Atualiza o menu para mostrar nome/logout
function updateUserMenu() {
  const userLink = document.getElementById("userLink");
  if (!userLink) return;

  const loggedEmail = getLoggedUser();

  if (loggedEmail) {
    userLink.textContent = "Sair";
    userLink.href = "#";

    userLink.addEventListener("click", (event) => {
      event.preventDefault();
      logoutUser();
      alert("Você saiu da conta!");
      window.location.href = "index.html";
    });
  } else {
    userLink.textContent = "Login";
    userLink.href = "login.html";
  }
}

// Cadastro
function setupRegisterForm() {
  const registerForm = document.getElementById("registerForm");
  const registerMsg = document.getElementById("registerMsg");

  if (!registerForm || !registerMsg) return;

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (name.length < 3) {
      registerMsg.textContent = "O nome deve ter pelo menos 3 letras.";
      registerMsg.style.color = "red";
      return;
    }

    if (password.length < 4) {
      registerMsg.textContent = "A senha deve ter pelo menos 4 caracteres.";
      registerMsg.style.color = "red";
      return;
    }

    const user = { name, email, password };
    saveUser(user);

    registerMsg.textContent = "Cadastro realizado com sucesso! Agora faça login.";
    registerMsg.style.color = "green";

    registerForm.reset();
  });
}

// Login
function setupLoginForm() {
  const loginForm = document.getElementById("loginForm");
  const loginMsg = document.getElementById("loginMsg");

  if (!loginForm || !loginMsg) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const user = getUser();

    if (!user) {
      loginMsg.textContent = "Nenhum usuário cadastrado! Faça cadastro primeiro.";
      loginMsg.style.color = "red";
      return;
    }

    if (email === user.email && password === user.password) {
      loginUser(email);

      loginMsg.textContent = "Login realizado com sucesso!";
      loginMsg.style.color = "green";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } else {
      loginMsg.textContent = "E-mail ou senha incorretos.";
      loginMsg.style.color = "red";
    }
  });
}

// ================================
// BOTÕES ADICIONAR AO CARRINHO
// ================================
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-cart");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = {
        id: Number(btn.dataset.id),
        name: btn.dataset.name,
        price: Number(btn.dataset.price),
        image: btn.dataset.image,
        quantity: 1
      };

      addToCart(product);
    });
  });
}

// ================================
// INICIALIZAÇÃO GERAL DO SITE
// ================================
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  updateCartCount();
  showDateTime();
  updateUserMenu();

  setupAddToCartButtons();
  setupDetailsButtons();
  setupSearch();

  renderCartPage();
  setupClearCartButton();

  setupContactForm();
  setupRegisterForm();
  setupLoginForm();

  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
});