/* ═══════════════════════════════════════════════════════════
   VELOX ADMIN DASHBOARD — script.js
   Handles: sidebar, navigation, stat counters, sparklines,
            main charts, table population, activity feed, date
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────
   1. DOM REFERENCES
───────────────────────────────────────────────────────── */
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const hamburger      = document.getElementById('hamburger');
const navItems       = document.querySelectorAll('.nav-item');
const pageTitle      = document.getElementById('pageTitle');
const headerDate     = document.getElementById('headerDate');
const ordersTableBody= document.querySelector('#ordersTable tbody');
const activityList   = document.getElementById('activityList');
const chartTabs      = document.querySelectorAll('.chart-tab');
const donutLegend    = document.getElementById('donutLegend');

/* ─────────────────────────────────────────────────────────
   2. SIDEBAR TOGGLE (mobile)
───────────────────────────────────────────────────────── */
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('open');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
});

/* ─────────────────────────────────────────────────────────
   3. SIDEBAR NAVIGATION (active state + page title)
───────────────────────────────────────────────────────── */
navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    // Update header title
    const page = item.dataset.page || 'Dashboard';
    pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
    // Close sidebar on mobile
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  });
});

/* ─────────────────────────────────────────────────────────
   4. LIVE DATE IN HEADER
───────────────────────────────────────────────────────── */
function updateDate() {
  const now = new Date();
  headerDate.textContent = now.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  });
}
updateDate();

/* ─────────────────────────────────────────────────────────
   5. STAT COUNTER ANIMATION
   Uses IntersectionObserver to trigger on first view.
───────────────────────────────────────────────────────── */
function animateCounter(el) {
  const target  = parseFloat(el.dataset.target);
  const suffix  = el.dataset.suffix || '';
  const isFloat = !Number.isInteger(target);
  const duration = 1200; // ms
  const startTime = performance.now();

  // Format number with commas
  function fmt(n) {
    if (isFloat) return n.toFixed(1) + suffix;
    if (target >= 1000) {
      // Add $ prefix for revenue
      const hasPrefix = el.closest('.stat-card').querySelector('.stat-label').textContent.includes('Revenue');
      return (hasPrefix ? '$' : '') + Math.round(n).toLocaleString();
    }
    return Math.round(n).toLocaleString() + suffix;
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = fmt(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// Observe each stat card
const statValueEls = document.querySelectorAll('.stat-value[data-target]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

statValueEls.forEach(el => observer.observe(el));

/* ─────────────────────────────────────────────────────────
   6. SPARKLINE CHARTS (tiny inline charts in stat cards)
───────────────────────────────────────────────────────── */
const sparkData = {
  sparkRevenue: [18, 22, 19, 28, 24, 30, 26, 35, 32, 40, 38, 45],
  sparkUsers:   [30, 28, 35, 33, 40, 38, 42, 44, 41, 48, 50, 52],
  sparkOrders:  [10, 14, 12, 16, 15, 18, 20, 17, 22, 21, 24, 26],
  sparkGrowth:  [20, 22, 25, 27, 24, 26, 28, 25, 27, 26, 24, 25],
};

const sparkColors = {
  sparkRevenue: '#4F46E5',
  sparkUsers:   '#0EA5E9',
  sparkOrders:  '#10B981',
  sparkGrowth:  '#F59E0B',
};

Object.keys(sparkData).forEach(id => {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const color = sparkColors[id];

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: sparkData[id].map(() => ''),
      datasets: [{
        data: sparkData[id],
        borderColor: color,
        borderWidth: 2,
        fill: true,
        backgroundColor: ctx => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 48);
          g.addColorStop(0, color + '40');
          g.addColorStop(1, color + '00');
          return g;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      }]
    },
    options: {
      responsive: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      animation: { duration: 1000, easing: 'easeOutQuart' },
    }
  });
});

/* ─────────────────────────────────────────────────────────
   7. MAIN REVENUE CHART (area + line)
   Data changes when range tab is clicked.
───────────────────────────────────────────────────────── */
const revenueDatasets = {
  '6m': {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [38000, 42000, 46000, 39000, 51000, 58000],
    expenses:[22000, 24000, 21000, 26000, 28000, 31000],
  },
  '12m': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [28000,32000,29000,35000,38000,42000,38000,44000,46000,39000,51000,58000],
    expenses:[18000,19000,17000,21000,22000,24000,22000,25000,21000,26000,28000,31000],
  },
  'ytd': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    revenue: [28000,32000,29000,35000,38000,42000,38000],
    expenses:[18000,19000,17000,21000,22000,24000,22000],
  },
};

const revenueCtx = document.getElementById('revenueChart').getContext('2d');

// Gradient helpers
function makeGrad(ctx, h, color1, color2) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, color1);
  g.addColorStop(1, color2);
  return g;
}

let revenueChart = createRevenueChart('6m');

function createRevenueChart(range) {
  if (revenueChart) revenueChart.destroy();
  const d = revenueDatasets[range];
  return new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Revenue',
          data: d.revenue,
          borderColor: '#4F46E5',
          borderWidth: 2.5,
          fill: true,
          backgroundColor: ctx => makeGrad(ctx.chart.ctx, ctx.chart.height, 'rgba(79,70,229,0.18)', 'rgba(79,70,229,0)'),
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#4F46E5',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        },
        {
          label: 'Expenses',
          data: d.expenses,
          borderColor: '#F59E0B',
          borderWidth: 2,
          fill: true,
          backgroundColor: ctx => makeGrad(ctx.chart.ctx, ctx.chart.height, 'rgba(245,158,11,0.10)', 'rgba(245,158,11,0)'),
          tension: 0.4,
          borderDash: [6, 4],
          pointRadius: 3,
          pointBackgroundColor: '#F59E0B',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 5,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            borderRadius: 3,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { family: 'DM Sans', size: 11, weight: '600' },
            color: '#6B6760',
            padding: 16,
          }
        },
        tooltip: {
          backgroundColor: '#1A1814',
          titleColor: '#A8A4A0',
          bodyColor: '#F5F4F1',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: 'DM Sans', size: 11 },
          bodyFont: { family: 'Sora', size: 13, weight: '700' },
          callbacks: {
            label: ctx => `  ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}`,
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: '#A8A4A0', font: { family: 'DM Sans', size: 11 } }
        },
        y: {
          grid: { color: '#F0EEE9', drawBorder: false },
          border: { display: false, dash: [4, 4] },
          ticks: {
            color: '#A8A4A0',
            font: { family: 'DM Sans', size: 11 },
            callback: v => '$' + (v / 1000).toFixed(0) + 'K',
          }
        }
      }
    }
  });
}

// Range tab switching
chartTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    chartTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    revenueChart = createRevenueChart(tab.dataset.range);
  });
});

/* ─────────────────────────────────────────────────────────
   8. TRAFFIC DONUT CHART
───────────────────────────────────────────────────────── */
const trafficSources = [
  { label: 'Organic Search', pct: 38, color: '#4F46E5' },
  { label: 'Direct',         pct: 26, color: '#0EA5E9' },
  { label: 'Referral',       pct: 18, color: '#10B981' },
  { label: 'Social Media',   pct: 12, color: '#F59E0B' },
  { label: 'Email',          pct:  6, color: '#A855F7' },
];

const trafficCtx = document.getElementById('trafficChart').getContext('2d');
new Chart(trafficCtx, {
  type: 'doughnut',
  data: {
    labels: trafficSources.map(s => s.label),
    datasets: [{
      data: trafficSources.map(s => s.pct),
      backgroundColor: trafficSources.map(s => s.color),
      borderWidth: 0,
      hoverOffset: 6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1A1814',
        titleColor: '#A8A4A0',
        bodyColor: '#F5F4F1',
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: ctx => `  ${ctx.parsed}%`,
        }
      }
    }
  }
});

// Build custom legend
trafficSources.forEach(src => {
  const item = document.createElement('div');
  item.className = 'donut-legend-item';
  item.innerHTML = `
    <div class="legend-dot-label">
      <span class="legend-dot" style="background:${src.color}"></span>
      <span class="legend-label">${src.label}</span>
    </div>
    <div class="legend-bar-wrap">
      <div class="legend-bar" style="width:${src.pct}%; background:${src.color}"></div>
    </div>
    <span class="legend-pct">${src.pct}%</span>
  `;
  donutLegend.appendChild(item);
});

/* ─────────────────────────────────────────────────────────
   9. ORDERS TABLE — sample data
───────────────────────────────────────────────────────── */
const ordersData = [
  { id:'#ORD-7841', customer:'Sarah Johnson', initials:'SJ', color:'#4F46E5', product:'Pro Plan',        amount:'$299.00', status:'completed',  date:'Feb 28, 2025' },
  { id:'#ORD-7840', customer:'Marcus Lee',    initials:'ML', color:'#0EA5E9', product:'Enterprise',      amount:'$899.00', status:'processing',  date:'Feb 28, 2025' },
  { id:'#ORD-7839', customer:'Priya Sharma',  initials:'PS', color:'#10B981', product:'Starter Pack',   amount:'$49.00',  status:'completed',  date:'Feb 27, 2025' },
  { id:'#ORD-7838', customer:'Tom Williams',  initials:'TW', color:'#F59E0B', product:'Add-on Storage',  amount:'$19.00',  status:'pending',    date:'Feb 27, 2025' },
  { id:'#ORD-7837', customer:'Amy Chen',      initials:'AC', color:'#A855F7', product:'Pro Plan',        amount:'$299.00', status:'cancelled',  date:'Feb 26, 2025' },
  { id:'#ORD-7836', customer:'Ryan Davis',    initials:'RD', color:'#EF4444', product:'Team Bundle',     amount:'$599.00', status:'completed',  date:'Feb 26, 2025' },
  { id:'#ORD-7835', customer:'Nour Al-Amin',  initials:'NA', color:'#14B8A6', product:'Enterprise',      amount:'$899.00', status:'processing', date:'Feb 25, 2025' },
  { id:'#ORD-7834', customer:'Julia Stone',   initials:'JS', color:'#F97316', product:'Starter Pack',   amount:'$49.00',  status:'completed',  date:'Feb 25, 2025' },
];

const statusClasses = {
  completed:  'status-completed',
  pending:    'status-pending',
  cancelled:  'status-cancelled',
  processing: 'status-processing',
};

ordersData.forEach(order => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="order-id">${order.id}</td>
    <td>
      <div class="customer-cell">
        <div class="customer-mini-avatar" style="background:${order.color}">${order.initials}</div>
        <span class="customer-name">${order.customer}</span>
      </div>
    </td>
    <td class="hide-mobile">${order.product}</td>
    <td class="amount-cell">${order.amount}</td>
    <td>
      <span class="status-badge ${statusClasses[order.status]}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
    </td>
    <td class="hide-mobile" style="color:var(--text-muted); font-size:12px">${order.date}</td>
  `;
  ordersTableBody.appendChild(tr);
});

/* ─────────────────────────────────────────────────────────
   10. ACTIVITY FEED — sample + live simulation
───────────────────────────────────────────────────────── */
const activityPool = [
  { icon:'🛒', bg:'rgba(79,70,229,0.1)',   text:'<strong>Sarah Johnson</strong> placed a new order for Pro Plan' },
  { icon:'👤', bg:'rgba(14,165,233,0.1)',  text:'<strong>Marcus Lee</strong> signed up for a free trial' },
  { icon:'💳', bg:'rgba(16,185,129,0.1)',  text:'<strong>Priya Sharma</strong> upgraded to Enterprise' },
  { icon:'❌', bg:'rgba(239,68,68,0.1)',   text:'<strong>Tom Williams</strong> cancelled order #ORD-7838' },
  { icon:'⭐', bg:'rgba(245,158,11,0.1)',  text:'<strong>Amy Chen</strong> left a 5-star review' },
  { icon:'📦', bg:'rgba(168,85,247,0.1)',  text:'Order <strong>#ORD-7836</strong> has been shipped' },
  { icon:'🔧', bg:'rgba(20,184,166,0.1)',  text:'System maintenance completed successfully' },
  { icon:'📊', bg:'rgba(249,115,22,0.1)',  text:'Monthly revenue report is ready to download' },
];

// Relative time helper
function timeAgo(offsetSeconds) {
  if (offsetSeconds < 60) return `${offsetSeconds}s ago`;
  if (offsetSeconds < 3600) return `${Math.floor(offsetSeconds/60)}m ago`;
  return `${Math.floor(offsetSeconds/3600)}h ago`;
}

// Initial activities (pre-fill 5)
const initialOffsets = [12, 45, 130, 340, 900];
activityPool.slice(0, 5).forEach((a, i) => addActivityItem(a, initialOffsets[i]));

function addActivityItem(activity, offsetSeconds = 5) {
  const li = document.createElement('li');
  li.className = 'activity-item';
  li.innerHTML = `
    <div class="activity-icon" style="background:${activity.bg}">${activity.icon}</div>
    <div class="activity-body">
      <p class="activity-title">${activity.text}</p>
      <span class="activity-time">${timeAgo(offsetSeconds)}</span>
    </div>
  `;
  // Prepend so newest is on top
  activityList.insertBefore(li, activityList.firstChild);
  // Keep max 6 items
  while (activityList.children.length > 6) {
    activityList.removeChild(activityList.lastChild);
  }
}

// Simulate live activity every 8–14 seconds
let activityIndex = 5;
function simulateLiveActivity() {
  const delay = 8000 + Math.random() * 6000;
  setTimeout(() => {
    const activity = activityPool[activityIndex % activityPool.length];
    addActivityItem(activity, Math.floor(Math.random() * 10) + 2);
    activityIndex++;
    simulateLiveActivity(); // recurse
  }, delay);
}
simulateLiveActivity();

/* ─────────────────────────────────────────────────────────
   11. NOTIFICATION BELL — simple toggle demo
───────────────────────────────────────────────────────── */
document.getElementById('notifBtn').addEventListener('click', () => {
  // Remove the red dot on first click to simulate "read"
  const dot = document.querySelector('.notif-dot');
  if (dot) dot.style.opacity = dot.style.opacity === '0' ? '1' : '0';
});
