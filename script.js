// 1️⃣ Pega todos os "lançamentos" (cards de projeto) da página
const entries = document.querySelectorAll('[data-entry]');
const postedCountEl = document.getElementById('postedCount');
const totalCountEl = document.getElementById('totalCount');
const balanceTotalEl = document.getElementById('balanceTotal');

// 2️⃣ Define o total de lançamentos existentes no contador visível
if (totalCountEl) totalCountEl.textContent = entries.length;

let posted = 0;

// 3️⃣ Cria um observador: cada lançamento "é conferido" quando entra na tela
const observer = new IntersectionObserver((observedEntries) => {
  observedEntries.forEach((item) => {
    if (item.isIntersecting && !item.target.classList.contains('is-posted')) {
      item.target.classList.add('is-posted');
      posted += 1;
      if (postedCountEl) postedCountEl.textContent = posted;

      // 4️⃣ Quando todos os lançamentos foram conferidos, fecha o balanço
      if (posted === entries.length && balanceTotalEl) {
        balanceTotalEl.textContent = 'contas conferidas — saldo positivo';
      }
    }
  });
}, { threshold: 0.35 });

// 5️⃣ Registra cada lançamento no observador
entries.forEach((entry) => observer.observe(entry));

// 6️⃣ Preenche a data de hoje no rodapé de assinatura, em formato pt-BR
const todayEl = document.getElementById('today');
if (todayEl) {
  const hoje = new Date();
  todayEl.textContent = ' ' + hoje.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
}
