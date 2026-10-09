const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cases = {
  payments: {
    title: 'Making payment status easier to understand',
    summary: 'Small businesses and individuals can lose time when payment records are scattered or statuses are unclear. This concept explores how a simple tracker could improve visibility.',
    problem: 'Users need a quick way to know what is pending, completed, or overdue without manually checking every record.',
    hypothesis: 'A consistent status field, due date, and searchable list may reduce the effort needed to review payments.',
    mvp: ['Payment status and due date', 'Search and status filters', 'Basic overdue indicator'],
    metrics: 'Time to find a record · Status accuracy · Weekly active usage'
  },
  mobility: {
    title: 'Helping users find useful trip patterns',
    summary: 'A taxi analytics dashboard can show lots of numbers, but users need a clear path from data to decisions. This concept focuses on making the most relevant trends easier to spot.',
    problem: 'An operator or analyst may struggle to identify which trip, fare, or time-period patterns need attention in a large dashboard.',
    hypothesis: 'A role-based overview with a small set of clear KPIs and filters may reduce time spent finding relevant insights.',
    mvp: ['Three priority KPIs', 'Date and trip filters', 'Trend view with plain-language labels'],
    metrics: 'Time to answer a question · Dashboard task completion · Repeat usage'
  }
};
const tabs = document.querySelectorAll('.case-tab');
function setCase(key) {
  const item = cases[key];
  if (!item) return;
  document.getElementById('caseTitle').textContent = item.title;
  document.getElementById('caseSummary').textContent = item.summary;
  document.getElementById('caseProblem').textContent = item.problem;
  document.getElementById('caseHypothesis').textContent = item.hypothesis;
  document.getElementById('caseMvp').innerHTML = item.mvp.map(point => `<li>${point}</li>`).join('');
  document.getElementById('caseMetrics').textContent = item.metrics;
  tabs.forEach(tab => {
    const active = tab.dataset.case === key;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
}
tabs.forEach(tab => tab.addEventListener('click', () => setCase(tab.dataset.case)));
