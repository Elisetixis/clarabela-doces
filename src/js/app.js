// Constantes e Estado Global
const FLUXO_STATUS = ["Solicitado", "Em Produção", "Pronto", "Entregue"];
let encomendas = [];
let totalCaixa = 0;
let filtroAtual = "todos";
let produtoSelecionado = {
  nome: "Bolo Ninho com Morango (2kg)",
  preco: 140
};

// ==========================================
// Funções Puras Testáveis (Testes Unitários)
// ==========================================
function calcularTotal(precoUnitario, quantidade) {
  return precoUnitario * quantidade;
}

function calcularSinal(total) {
  return total * 0.5;
}

function validarDataFutura(dataStr) {
  if (!dataStr) return false;
  return new Date(dataStr) > new Date();
}

function sanitizarTexto(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ==========================================
// Inicialização da Interface e Animações GSAP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Animações leves de entrada com GSAP
  if (typeof gsap !== "undefined") {
    gsap.from(".anim-header", { y: -18, opacity: 0, duration: 0.55, ease: "power2.out" });
    gsap.from(".anim-card", {
      y: 22,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out"
    });
  }

  configurarCatalogo();
  configurarQuantidade();
  configurarMascaraTelefone();
  configurarCanvasAssinatura();
  configurarFiltros();

  document.getElementById("btnRegistrar").addEventListener("click", registrarEncomenda);
  atualizarPreviewValores();
});

// ==========================================
// Catálogo Visual e Quantidade
// ==========================================
function configurarCatalogo() {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      produtoSelecionado = {
        nome: card.dataset.nome,
        preco: parseFloat(card.dataset.preco)
      };

      if (typeof gsap !== "undefined") {
        gsap.fromTo(card, { scale: 0.97 }, { scale: 1, duration: 0.25, ease: "back.out(2)" });
      }
      atualizarPreviewValores();
    });
  });
}

function configurarQuantidade() {
  const inputQtd = document.getElementById("qtd");
  document.getElementById("btnMenos").addEventListener("click", () => {
    const atual = parseInt(inputQtd.value) || 1;
    if (atual > 1) {
      inputQtd.value = atual - 1;
      atualizarPreviewValores();
    }
  });

  document.getElementById("btnMais").addEventListener("click", () => {
    const atual = parseInt(inputQtd.value) || 1;
    if (atual < 50) {
      inputQtd.value = atual + 1;
      atualizarPreviewValores();
    }
  });
}

function atualizarPreviewValores() {
  const qtd = parseInt(document.getElementById("qtd").value) || 1;
  const total = calcularTotal(produtoSelecionado.preco, qtd);
  const sinal = calcularSinal(total);

  document.getElementById("previewTotal").textContent = formatarMoeda(total);
  document.getElementById("previewSinal").textContent = formatarMoeda(sinal);
}

function configurarMascaraTelefone() {
  const telInput = document.getElementById("telefone");
  telInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    }
    e.target.value = v;
  });
}

// ==========================================
// Assinatura Digital (Mouse + Touch)
// ==========================================
let assinou = false;

function configurarCanvasAssinatura() {
  const canvas = document.getElementById("canvasAssinatura");
  const ctx = canvas.getContext("2d");
  const placeholder = document.getElementById("canvasPlaceholder");
  let desenhando = false;

  function obterPosicao(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function iniciarTraco(e) {
    desenhando = true;
    assinou = true;
    placeholder.style.display = "none";
    const pos = obterPosicao(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function moverTraco(e) {
    if (!desenhando) return;
    if (e.cancelable) e.preventDefault();
    const pos = obterPosicao(e);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#2A1D21";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function pararTraco() {
    desenhando = false;
    ctx.beginPath();
  }

  canvas.addEventListener("mousedown", iniciarTraco);
  canvas.addEventListener("mousemove", moverTraco);
  window.addEventListener("mouseup", pararTraco);

  canvas.addEventListener("touchstart", iniciarTraco, { passive: false });
  canvas.addEventListener("touchmove", moverTraco, { passive: false });
  canvas.addEventListener("touchend", pararTraco);

  document.getElementById("btnLimparAssinatura").addEventListener("click", limparAssinatura);
}

function limparAssinatura() {
  const canvas = document.getElementById("canvasAssinatura");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  assinou = false;
  document.getElementById("canvasPlaceholder").style.display = "flex";
}

// ==========================================
// Registro de Encomenda, Fila e Caixa (D3 & D4)
// ==========================================
function exibirErro(msg) {
  const el = document.getElementById("msgErro");
  el.textContent = msg;
  el.style.display = "block";
  if (typeof gsap !== "undefined") {
    gsap.fromTo(el, { x: -6 }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" });
  }
}

function registrarCaixa(valor, descricao) {
  const valorAnterior = totalCaixa;
  totalCaixa += valor;

  const saldoEl = document.getElementById("saldoCaixa");
  if (typeof gsap !== "undefined") {
    const contador = { val: valorAnterior };
    gsap.to(contador, {
      val: totalCaixa,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        saldoEl.textContent = formatarMoeda(contador.val);
      }
    });
  } else {
    saldoEl.textContent = formatarMoeda(totalCaixa);
  }

  const lista = document.getElementById("historicoCaixa");
  const vazio = lista.querySelector(".caixa-empty");
  if (vazio) vazio.remove();

  const li = document.createElement("li");
  li.innerHTML = `<span>${sanitizarTexto(descricao)}</span><strong>+ ${formatarMoeda(valor)}</strong>`;
  lista.prepend(li);
}

function registrarEncomenda() {
  document.getElementById("msgErro").style.display = "none";

  const nome = document.getElementById("cliente").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const qtd = parseInt(document.getElementById("qtd").value);
  const dataEntrega = document.getElementById("dataEntrega").value;

  if (!nome || !telefone || !assinou) {
    exibirErro("Preencha o nome, telefone e colete a assinatura digital do cliente.");
    return;
  }

  if (isNaN(qtd) || qtd < 1) {
    exibirErro("A quantidade mínima do pedido deve ser 1.");
    return;
  }

  if (!validarDataFutura(dataEntrega)) {
    exibirErro("Selecione uma data e hora futura para a entrega.");
    return;
  }

  const total = calcularTotal(produtoSelecionado.preco, qtd);
  const sinal = calcularSinal(total);
  const id = encomendas.length + 1;

  encomendas.unshift({
    id,
    cliente: sanitizarTexto(nome),
    telefone: sanitizarTexto(telefone),
    produto: sanitizarTexto(produtoSelecionado.nome),
    qtd,
    dataEntrega: dataEntrega.replace("T", " "),
    total,
    sinal,
    statusIndex: 0
  });

  registrarCaixa(sinal, `Sinal (50%) Pedido #${id} — ${nome}`);
  renderizarFila(true);

  // Limpa campos para próximo atendimento
  document.getElementById("cliente").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("qtd").value = 1;
  atualizarPreviewValores();
  limparAssinatura();
}

function configurarFiltros() {
  const tabs = document.querySelectorAll("#filterTabs .tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      filtroAtual = tab.dataset.filter;
      renderizarFila(false);
    });
  });
}

window.avancarStatus = function (id) {
  const pedido = encomendas.find((p) => p.id === id);
  if (!pedido) return;

  if (pedido.statusIndex < FLUXO_STATUS.length - 1) {
    pedido.statusIndex++;
    if (FLUXO_STATUS[pedido.statusIndex] === "Entregue") {
      const restante = pedido.total - pedido.sinal;
      registrarCaixa(restante, `Quitação (50%) Pedido #${pedido.id} — ${pedido.cliente}`);
    }
    renderizarFila(false);
  }
};

function renderizarFila(animarNovo) {
  const container = document.getElementById("listaPedidos");
  const filtrados = encomendas.filter((p) => {
    if (filtroAtual === "abertos") return p.statusIndex < 3;
    if (filtroAtual === "entregues") return p.statusIndex === 3;
    return true;
  });

  if (filtrados.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="chef-hat"></i>
        <p>Nenhum pedido encontrado neste filtro.</p>
      </div>`;
    if (typeof lucide !== "undefined") lucide.createIcons();
    return;
  }

  container.innerHTML = filtrados
    .map(
      (p) => `
      <div class="pedido-item">
        <div class="pedido-top">
          <span class="pedido-cliente">#${p.id} • ${p.cliente}</span>
          <span class="badge-status status-${p.statusIndex}">${FLUXO_STATUS[p.statusIndex]}</span>
        </div>
        <div class="pedido-detalhes">
          <strong>${p.qtd}x ${p.produto}</strong><br>
          Contato: ${p.telefone} • Entrega: ${p.dataEntrega}<br>
          Total: ${formatarMoeda(p.total)} (Sinal pago: ${formatarMoeda(p.sinal)})
        </div>
        ${
          p.statusIndex < FLUXO_STATUS.length - 1
            ? `<button type="button" class="btn-avancar" onclick="avancarStatus(${p.id})">
                Avançar para: ${FLUXO_STATUS[p.statusIndex + 1]}
              </button>`
            : `<div class="pedido-concluido">✓ Pedido Entregue e Quitado (100%)</div>`
        }
      </div>`
    )
    .join("");

  if (animarNovo && typeof gsap !== "undefined") {
    const primeiro = container.querySelector(".pedido-item");
    if (primeiro) {
      gsap.from(primeiro, { y: -14, opacity: 0, duration: 0.4, ease: "power2.out" });
    }
  }
}
