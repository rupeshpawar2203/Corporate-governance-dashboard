'use strict';

/* ═══════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════ */
const RAW = [
  {ticker:"AAPL",year:2019,ceo:"Tim Cook",       base:3000000, bonus:12000000, stock:83000000,  total:98000000,  medPay:60000,  revenue:260200000000, netIncome:55260000000,  roe:61.3},
  {ticker:"AAPL",year:2020,ceo:"Tim Cook",       base:3000000, bonus:13000000, stock:86000000,  total:102000000, medPay:62000,  revenue:274500000000, netIncome:57400000000,  roe:63.5},
  {ticker:"AAPL",year:2021,ceo:"Tim Cook",       base:3000000, bonus:14000000, stock:96000000,  total:113000000, medPay:65000,  revenue:365800000000, netIncome:94680000000,  roe:147.4},
  {ticker:"AAPL",year:2022,ceo:"Tim Cook",       base:3000000, bonus:12000000, stock:83000000,  total:98000000,  medPay:68000,  revenue:394300000000, netIncome:99803000000,  roe:152},
  {ticker:"AAPL",year:2023,ceo:"Tim Cook",       base:3000000, bonus:10000000, stock:40000000,  total:53000000,  medPay:70000,  revenue:383300000000, netIncome:96995000000,  roe:148},
  {ticker:"MSFT",year:2019,ceo:"S. Nadella",     base:2500000, bonus:10000000, stock:32000000,  total:44500000,  medPay:170000, revenue:125800000000, netIncome:39200000000,  roe:36.5},
  {ticker:"MSFT",year:2020,ceo:"S. Nadella",     base:2500000, bonus:10500000, stock:35000000,  total:48000000,  medPay:175000, revenue:143000000000, netIncome:44300000000,  roe:38},
  {ticker:"MSFT",year:2021,ceo:"S. Nadella",     base:2500000, bonus:12000000, stock:38000000,  total:52500000,  medPay:180000, revenue:168100000000, netIncome:61200000000,  roe:42},
  {ticker:"MSFT",year:2022,ceo:"S. Nadella",     base:2500000, bonus:11800000, stock:36000000,  total:50300000,  medPay:185000, revenue:198300000000, netIncome:72700000000,  roe:40.1},
  {ticker:"MSFT",year:2023,ceo:"S. Nadella",     base:2500000, bonus:11000000, stock:35000000,  total:48500000,  medPay:190000, revenue:211900000000, netIncome:72300000000,  roe:38.5},
  {ticker:"GOOGL",year:2019,ceo:"S. Pichai",     base:2000000, bonus:6000000,  stock:30000000,  total:38000000,  medPay:190000, revenue:161800000000, netIncome:34300000000,  roe:27.4},
  {ticker:"GOOGL",year:2020,ceo:"S. Pichai",     base:2000000, bonus:6500000,  stock:32000000,  total:40500000,  medPay:195000, revenue:182500000000, netIncome:40200000000,  roe:30.1},
  {ticker:"GOOGL",year:2021,ceo:"S. Pichai",     base:2000000, bonus:7000000,  stock:50000000,  total:59000000,  medPay:200000, revenue:257600000000, netIncome:76000000000,  roe:38},
  {ticker:"GOOGL",year:2022,ceo:"S. Pichai",     base:2000000, bonus:6800000,  stock:46000000,  total:54800000,  medPay:210000, revenue:282800000000, netIncome:59900000000,  roe:32.5},
  {ticker:"GOOGL",year:2023,ceo:"S. Pichai",     base:2000000, bonus:7000000,  stock:50000000,  total:59000000,  medPay:215000, revenue:307400000000, netIncome:73700000000,  roe:36},
  {ticker:"META",year:2019,ceo:"M. Zuckerberg",  base:1000000, bonus:5000000,  stock:25000000,  total:31000000,  medPay:150000, revenue:70700000000,  netIncome:18485000000,  roe:25},
  {ticker:"META",year:2020,ceo:"M. Zuckerberg",  base:1000000, bonus:5000000,  stock:30000000,  total:36000000,  medPay:155000, revenue:85965000000,  netIncome:29146000000,  roe:30.5},
  {ticker:"META",year:2021,ceo:"M. Zuckerberg",  base:1000000, bonus:5000000,  stock:35000000,  total:41000000,  medPay:160000, revenue:117929000000, netIncome:39370000000,  roe:31.4},
  {ticker:"META",year:2022,ceo:"M. Zuckerberg",  base:1000000, bonus:7000000,  stock:35000000,  total:43000000,  medPay:165000, revenue:116609000000, netIncome:23200000000,  roe:19.9},
  {ticker:"META",year:2023,ceo:"M. Zuckerberg",  base:1000000, bonus:5000000,  stock:40000000,  total:46000000,  medPay:170000, revenue:134902000000, netIncome:39098000000,  roe:28.9},
  {ticker:"AMZN",year:2019,ceo:"A. Jassy",       base:1600000, bonus:5000000,  stock:20000000,  total:26600000,  medPay:28000,  revenue:280522000000, netIncome:11588000000,  roe:16.5},
  {ticker:"AMZN",year:2020,ceo:"A. Jassy",       base:1600000, bonus:5500000,  stock:23000000,  total:30100000,  medPay:29000,  revenue:386064000000, netIncome:21300000000,  roe:20.1},
  {ticker:"AMZN",year:2021,ceo:"A. Jassy",       base:1750000, bonus:8000000,  stock:30000000,  total:39750000,  medPay:31000,  revenue:469822000000, netIncome:33360000000,  roe:24},
  {ticker:"AMZN",year:2022,ceo:"A. Jassy",       base:1750000, bonus:10500000, stock:30000000,  total:42250000,  medPay:33000,  revenue:513983000000, netIncome:-2722000000,  roe:-1.5},
  {ticker:"AMZN",year:2023,ceo:"A. Jassy",       base:1750000, bonus:8000000,  stock:35000000,  total:44750000,  medPay:35000,  revenue:574785000000, netIncome:30425000000,  roe:21.2},
];

const TICKERS    = ["AAPL","MSFT","GOOGL","META","AMZN"];
const ALL_YEARS  = [2019,2020,2021,2022,2023];
const TC = {AAPL:"#38BDF8",MSFT:"#34D399",GOOGL:"#FBBF24",META:"#F87171",AMZN:"#A78BFA"};

/* ═══════════════════════════════════════════════════════════════════
   FORMATTERS
═══════════════════════════════════════════════════════════════════ */
const fmtB = v => {
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 1e12) return `${sign}$${(abs/1e12).toFixed(2)}T`;
  if (abs >= 1e9)  return `${sign}$${(abs/1e9).toFixed(1)}B`;
  return `${sign}$${(abs/1e6).toFixed(0)}M`;
};
const fmtM = v => `$${(v/1e6).toFixed(1)}M`;

/* ═══════════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════════ */
let state = {
  ticker:   "All",
  yearFrom: 2019,
  yearTo:   2023,
  scatterVisible: new Set(TICKERS),
};

/* ═══════════════════════════════════════════════════════════════════
   CHART INSTANCES
═══════════════════════════════════════════════════════════════════ */
let chartRevenue = null;
let chartComp    = null;
let chartScatter = null;

/* ═══════════════════════════════════════════════════════════════════
   CHART.JS GLOBAL DEFAULTS
═══════════════════════════════════════════════════════════════════ */
Chart.defaults.color         = "#334155";
Chart.defaults.font.family   = "'DM Mono', ui-monospace, monospace";
Chart.defaults.font.size     = 10;
Chart.defaults.plugins.legend.display = false;

/* ═══════════════════════════════════════════════════════════════════
   TOOLTIP DOM
═══════════════════════════════════════════════════════════════════ */
const ttEl = document.createElement("div");
ttEl.id = "chartTooltip";
document.body.appendChild(ttEl);

function showTooltip(html, x, y) {
  ttEl.innerHTML = html;
  ttEl.classList.add("visible");
  const pad = 12;
  const tw = ttEl.offsetWidth  || 200;
  const th = ttEl.offsetHeight || 120;
  let left = x + pad;
  let top  = y - th / 2;
  if (left + tw > window.innerWidth - 10)  left = x - tw - pad;
  if (top < 10)                             top  = 10;
  if (top + th > window.innerHeight - 10)  top  = window.innerHeight - th - 10;
  ttEl.style.left = left + "px";
  ttEl.style.top  = top  + "px";
}
function hideTooltip() { ttEl.classList.remove("visible"); }

/* ═══════════════════════════════════════════════════════════════════
   DATA DERIVATION
═══════════════════════════════════════════════════════════════════ */
function getFiltered() {
  return RAW.filter(d => {
    const tickOk = state.ticker === "All" || d.ticker === state.ticker;
    const yearOk = d.year >= state.yearFrom && d.year <= state.yearTo;
    return tickOk && yearOk;
  });
}

function getYears(data) {
  return [...new Set(data.map(d => d.year))].sort();
}

function aggregateByYear(data) {
  const m = {};
  data.forEach(d => {
    if (!m[d.year]) m[d.year] = {year:d.year,revenue:0,netIncome:0,base:0,bonus:0,stock:0,total:0};
    m[d.year].revenue   += d.revenue;
    m[d.year].netIncome += d.netIncome;
    m[d.year].base      += d.base;
    m[d.year].bonus     += d.bonus;
    m[d.year].stock     += d.stock;
    m[d.year].total     += d.total;
  });
  return Object.values(m).sort((a,b) => a.year - b.year);
}

/* ═══════════════════════════════════════════════════════════════════
   KPI UPDATE
═══════════════════════════════════════════════════════════════════ */
function animateValue(el, target, fmt) {
  const start = parseFloat(el.dataset.current || 0) || 0;
  el.dataset.current = target;
  const dur = 600, t0 = performance.now();
  const step = now => {
    const p = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(start + (target - start) * ease);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function updateKPIs(data) {
  const recentYear = Math.max(...data.map(d => d.year), state.yearFrom);
  const valid  = data.filter(d => d.medPay > 0);
  const ratio  = valid.length ? valid.reduce((s,d) => s + d.total/d.medPay, 0) / valid.length : 0;
  const roe    = data.length  ? data.reduce((s,d) => s + d.roe, 0) / data.length : 0;
  const recent = data.filter(d => d.year === recentYear);
  const comp   = recent.reduce((s,d) => s + d.total, 0);
  const rev    = recent.reduce((s,d) => s + d.revenue, 0);

  animateValue(document.getElementById("kpiRatio"), ratio, v => v.toFixed(0) + "×");
  animateValue(document.getElementById("kpiRoe"),   roe,   v => v.toFixed(1) + "%");
  animateValue(document.getElementById("kpiComp"),  comp,  fmtM);
  animateValue(document.getElementById("kpiRev"),   rev,   fmtB);
}

/* ═══════════════════════════════════════════════════════════════════
   FILTER BADGE
═══════════════════════════════════════════════════════════════════ */
function updateBadge() {
  const badge   = document.getElementById("filterBadge");
  const content = document.getElementById("badgeContent");
  const active  = state.ticker !== "All" || state.yearFrom !== 2019 || state.yearTo !== 2023;
  badge.classList.toggle("hidden", !active);
  if (!active) return;
  let html = "";
  if (state.ticker !== "All") html += `<span class="badge-tag">${state.ticker}</span>`;
  html += `<span class="badge-tag">FY ${state.yearFrom} – ${state.yearTo}</span>`;
  content.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════════
   CHART 1 — REVENUE OVERVIEW
═══════════════════════════════════════════════════════════════════ */
function buildChartRevenue(agg) {
  const ctx = document.getElementById("chartRevenue").getContext("2d");

  const gradBar = ctx.createLinearGradient(0,0,0,260);
  gradBar.addColorStop(0,   "rgba(99,102,241,0.85)");
  gradBar.addColorStop(1,   "rgba(99,102,241,0.35)");

  const cfg = {
    type: "bar",
    data: {
      labels: agg.map(d => d.year),
      datasets: [
        {
          label: "Total Revenue",
          data:  agg.map(d => d.revenue),
          backgroundColor: gradBar,
          borderRadius: 4,
          borderSkipped: false,
          maxBarThickness: 44,
          yAxisID: "yLeft",
          order: 2,
          type: "bar",
        },
        {
          label: "Net Income",
          data:  agg.map(d => d.netIncome),
          borderColor: "#34D399",
          backgroundColor: "transparent",
          borderWidth: 2.5,
          pointBackgroundColor: "#34D399",
          pointBorderColor: "#060D18",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.3,
          yAxisID: "yRight",
          order: 1,
          type: "line",
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode:"index", intersect:false },
      plugins: {
        tooltip: {
          enabled: false,
          external({ chart, tooltip }) {
            if (tooltip.opacity === 0) { hideTooltip(); return; }
            const idx   = tooltip.dataIndex;
            const year  = agg[idx]?.year ?? "";
            const rev   = agg[idx]?.revenue ?? 0;
            const ni    = agg[idx]?.netIncome ?? 0;
            const rect  = chart.canvas.getBoundingClientRect();
            const x     = rect.left + tooltip.caretX + window.scrollX;
            const y     = rect.top  + tooltip.caretY + window.scrollY;
            showTooltip(`
              <div class="tt-sub">FY ${year}</div>
              <div class="tt-row"><span class="tt-key">Total Revenue</span><span class="tt-val" style="color:#818CF8">${fmtB(rev)}</span></div>
              <div class="tt-row"><span class="tt-key">Net Income</span><span class="tt-val" style="color:#34D399">${fmtB(ni)}</span></div>
            `, x, y);
          }
        }
      },
      scales: {
        x:      { grid:{color:"rgba(255,255,255,.04)",drawTicks:false}, ticks:{color:"#334155"}, border:{display:false} },
        yLeft:  { position:"left",  grid:{color:"rgba(255,255,255,.04)"}, border:{display:false}, ticks:{ color:"#334155", callback:v=>fmtB(v) } },
        yRight: { position:"right", grid:{display:false},                  border:{display:false}, ticks:{ color:"#334155", callback:v=>fmtB(v) } },
      }
    }
  };

  if (chartRevenue) {
    chartRevenue.data   = cfg.data;
    chartRevenue.update("active");
  } else {
    chartRevenue = new Chart(ctx, cfg);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   CHART 2 — COMPENSATION GROWTH (Stacked Bar)
═══════════════════════════════════════════════════════════════════ */
function buildChartComp(agg) {
  const ctx = document.getElementById("chartComp").getContext("2d");

  const mkGrad = (c1, c2) => {
    const g = ctx.createLinearGradient(0,0,0,260);
    g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
  };

  const cfg = {
    type: "bar",
    data: {
      labels: agg.map(d => d.year),
      datasets: [
        { label:"Stock Awards", data:agg.map(d=>d.stock), backgroundColor:mkGrad("rgba(56,189,248,.9)","rgba(56,189,248,.45)"),  borderRadius:0, stack:"a", maxBarThickness:48 },
        { label:"Cash Bonus",   data:agg.map(d=>d.bonus), backgroundColor:mkGrad("rgba(251,191,36,.9)","rgba(251,191,36,.45)"),  borderRadius:0, stack:"a", maxBarThickness:48 },
        { label:"Base Salary",  data:agg.map(d=>d.base),  backgroundColor:mkGrad("rgba(51,65,85,.9)","rgba(51,65,85,.45)"),      borderRadius:4, stack:"a", maxBarThickness:48,
          borderRadiusAllCorners: true },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode:"index", intersect:false },
      plugins: {
        tooltip: {
          enabled: false,
          external({ chart, tooltip }) {
            if (tooltip.opacity === 0) { hideTooltip(); return; }
            const idx  = tooltip.dataIndex;
            const year = agg[idx]?.year ?? "";
            const row  = agg[idx] ?? {};
            const tot  = (row.stock||0)+(row.bonus||0)+(row.base||0);
            const pct  = v => tot ? ((v/tot)*100).toFixed(1)+"%" : "—";
            const rect = chart.canvas.getBoundingClientRect();
            const x    = rect.left + tooltip.caretX + window.scrollX;
            const y    = rect.top  + tooltip.caretY + window.scrollY;
            showTooltip(`
              <div class="tt-sub">FY ${year}</div>
              <div class="tt-row"><span class="tt-key">Stock Awards</span><span class="tt-val" style="color:#38BDF8">${pct(row.stock)}  ${fmtM(row.stock)}</span></div>
              <div class="tt-row"><span class="tt-key">Cash Bonus</span><span class="tt-val" style="color:#FBBF24">${pct(row.bonus)}  ${fmtM(row.bonus)}</span></div>
              <div class="tt-row"><span class="tt-key">Base Salary</span><span class="tt-val" style="color:#94A3B8">${pct(row.base)}  ${fmtM(row.base)}</span></div>
            `, x, y);
          }
        }
      },
      scales: {
        x:  { stacked:true, grid:{color:"rgba(255,255,255,.04)",drawTicks:false}, ticks:{color:"#334155"}, border:{display:false} },
        y:  { stacked:true, grid:{color:"rgba(255,255,255,.04)"},                  border:{display:false}, ticks:{ color:"#334155", callback:v=>`$${(v/1e6).toFixed(0)}M` } },
      }
    }
  };

  if (chartComp) {
    chartComp.data = cfg.data;
    chartComp.update("active");
  } else {
    chartComp = new Chart(ctx, cfg);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   CHART 3 — PAY BY COMPANY (Scatter)
═══════════════════════════════════════════════════════════════════ */
function buildChartScatter(data) {
  const ctx = document.getElementById("chartScatter").getContext("2d");

  const datasets = TICKERS
    .filter(t => state.scatterVisible.has(t))
    .map(t => ({
      label: t,
      data: data
        .filter(d => d.ticker === t)
        .map(d => ({ x:d.roe, y:d.total, raw:d })),
      backgroundColor: TC[t] + "CC",
      borderColor:     TC[t] + "44",
      borderWidth: 1,
      pointRadius: 8,
      pointHoverRadius: 11,
    }));

  const cfg = {
    type: "scatter",
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: false,
          external({ chart, tooltip }) {
            if (tooltip.opacity === 0) { hideTooltip(); return; }
            const pt  = tooltip.dataPoints?.[0];
            if (!pt) return;
            const d   = pt.raw.raw;
            const col = TC[d.ticker] || "#fff";
            const rect= chart.canvas.getBoundingClientRect();
            const x   = rect.left + tooltip.caretX + window.scrollX;
            const y   = rect.top  + tooltip.caretY + window.scrollY;
            showTooltip(`
              <div class="tt-title" style="color:${col}">${d.ticker}</div>
              <div class="tt-sub">${d.ceo} · FY${d.year}</div>
              <div class="tt-row"><span class="tt-key">ROE</span><span class="tt-val" style="color:#FBBF24">${d.roe}%</span></div>
              <div class="tt-row"><span class="tt-key">CEO Comp</span><span class="tt-val" style="color:#38BDF8">${fmtM(d.total)}</span></div>
              <div class="tt-row"><span class="tt-key">Net Income</span><span class="tt-val" style="color:#34D399">${fmtB(d.netIncome)}</span></div>
            `, x, y);
          }
        },
        annotation: {}
      },
      scales: {
        x: {
          title: { display:true, text:"Return on Equity (%)", color:"#334155", font:{size:10} },
          grid:  { color:"rgba(255,255,255,.04)" },
          border:{ display:false },
          ticks: { color:"#334155" },
        },
        y: {
          title: { display:true, text:"CEO Compensation", color:"#334155", font:{size:10} },
          grid:  { color:"rgba(255,255,255,.04)" },
          border:{ display:false },
          ticks: { color:"#334155", callback:v=>`$${(v/1e6).toFixed(0)}M` },
        }
      }
    }
  };

  if (chartScatter) {
    chartScatter.data = cfg.data;
    chartScatter.update("active");
  } else {
    chartScatter = new Chart(ctx, cfg);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   SCATTER PILLS
═══════════════════════════════════════════════════════════════════ */
function buildScatterPills() {
  const container = document.getElementById("scatterPills");
  container.innerHTML = "";
  TICKERS.forEach(t => {
    const btn = document.createElement("button");
    btn.className  = "scatter-pill" + (state.scatterVisible.has(t) ? " active" : "");
    btn.textContent = t;
    btn.style.setProperty("--pill-color", TC[t]);
    if (state.scatterVisible.has(t)) {
      btn.style.color       = TC[t];
      btn.style.borderColor = TC[t] + "55";
      btn.style.background  = TC[t] + "20";
    }
    btn.addEventListener("click", () => {
      if (state.scatterVisible.has(t)) {
        if (state.scatterVisible.size > 1) state.scatterVisible.delete(t);
      } else {
        state.scatterVisible.add(t);
      }
      buildScatterPills();
      buildChartScatter(getFiltered());
    });
    container.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   SNAPSHOT CARDS
═══════════════════════════════════════════════════════════════════ */
function buildSnapshots() {
  const grid = document.getElementById("snapshotGrid");
  grid.innerHTML = "";
  TICKERS.forEach(t => {
    const td     = RAW.filter(d => d.ticker === t);
    const latest = td.find(d => d.year === 2023) || td[td.length - 1];
    if (!latest) return;
    const c      = TC[t];
    const active = state.ticker === t;

    const card = document.createElement("div");
    card.className = "snapshot-card" + (active ? " active" : "");
    card.style.setProperty("--snap-glow", c + "22");
    if (active) {
      card.style.background  = c + "12";
      card.style.borderColor = c + "44";
    }
    card.innerHTML = `
      <div class="snap-top">
        <span class="snap-ticker" style="color:${c}">${t}</span>
        <span class="snap-fy">FY2023</span>
      </div>
      <div class="snap-comp">${fmtM(latest.total)}</div>
      <div class="snap-sub">CEO Comp</div>
      <div class="snap-stats">
        <div>
          <div class="snap-stat-label">ROE</div>
          <div class="snap-stat-val" style="color:${latest.roe > 0 ? '#34D399' : '#F87171'}">${latest.roe}%</div>
        </div>
        <div style="text-align:right">
          <div class="snap-stat-label">PAY RATIO</div>
          <div class="snap-stat-val" style="color:#FBBF24">${(latest.total / latest.medPay).toFixed(0)}×</div>
        </div>
      </div>
    `;
    card.addEventListener("click", () => {
      state.ticker = active ? "All" : t;
      document.getElementById("filterTicker").value = state.ticker;
      refresh();
    });
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   FULL REFRESH
═══════════════════════════════════════════════════════════════════ */
function refresh() {
  const data = getFiltered();
  const agg  = aggregateByYear(data);

  updateKPIs(data);
  updateBadge();
  buildChartRevenue(agg);
  buildChartComp(agg);
  buildChartScatter(data);
  buildScatterPills();
  buildSnapshots();
}

/* ═══════════════════════════════════════════════════════════════════
   FILTER WIRING
═══════════════════════════════════════════════════════════════════ */
document.getElementById("filterTicker").addEventListener("change", e => {
  state.ticker = e.target.value;
  refresh();
});

document.getElementById("filterFrom").addEventListener("change", e => {
  state.yearFrom = +e.target.value;
  if (state.yearFrom > state.yearTo) {
    state.yearTo = state.yearFrom;
    document.getElementById("filterTo").value = state.yearTo;
  }
  refresh();
});

document.getElementById("filterTo").addEventListener("change", e => {
  state.yearTo = +e.target.value;
  if (state.yearTo < state.yearFrom) {
    state.yearFrom = state.yearTo;
    document.getElementById("filterFrom").value = state.yearFrom;
  }
  refresh();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  state.ticker   = "All";
  state.yearFrom = 2019;
  state.yearTo   = 2023;
  state.scatterVisible = new Set(TICKERS);
  document.getElementById("filterTicker").value = "All";
  document.getElementById("filterFrom").value   = 2019;
  document.getElementById("filterTo").value     = 2023;
  refresh();
});

/* hide tooltip when mouse leaves chart area */
document.addEventListener("mousemove", e => {
  if (!e.target.closest("canvas")) hideTooltip();
});

/* ═══════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════ */
refresh();
