{
const G = window.GC;
const $ = id => document.getElementById(id);
const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ext = (u, t) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`;
const srcLink = key => { const s = G.src[key]; return s ? ext(s.u, s.n) : ""; };
const lawList = arr => `<ul class="law">${arr.map(l => `<li><span>${esc(l[0])}</span>${srcLink(l[1])}</li>`).join("")}</ul>`;
const pad = n => String(n).padStart(2, "0");
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const dstr = iso => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const pillFor = s => /draft/i.test(s) ? "d" : /bill/i.test(s) ? "b" : "";
let toastT;
const toast = m => { const t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 1900); };
const copy = (text, what) => {
  try { navigator.clipboard.writeText(text).then(() => toast(what + " copied"), () => toast("Copy is blocked here. Select the text instead.")); }
  catch (e) { toast("Copy is blocked here. Select the text instead."); }
};
const pageHead = (crumb, title, lede) => `<div class="ph"><div class="wrap"><div class="crumb"><a href="#home">GenCorpus</a> / ${esc(crumb)}</div><h1>${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}</div></div>`;

/* ---------- state ---------- */
const st = {seat: load("gc-seat", "a"), stage: 0, ticks: load("gc-ticks", {}), deal: 0, dealGroup: "All", clause: 0, mode: "a", radarF: "All"};

/* ---------- theme ---------- */
const applyTheme = t => { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; };
applyTheme(load("gc-theme", ""));
$("theme").addEventListener("click", () => {
  const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const nx = cur === "dark" ? "light" : "dark"; applyTheme(nx); save("gc-theme", nx);
});

/* ---------- small svgs ---------- */
const ILLO = {
  map: `<svg viewBox="0 0 240 110" width="100%" height="100%" aria-hidden="true"><line x1="16" y1="58" x2="224" y2="58" stroke="currentColor" stroke-opacity=".25" stroke-width="2"/>${Array.from({length: 10}, (_, i) => `<circle cx="${16 + i * 23.1}" cy="58" r="${i === 4 ? 8 : 5}" fill="${i < 4 ? "currentColor" : i === 4 ? "var(--red)" : "var(--bg)"}" stroke="${i === 4 ? "var(--red)" : "currentColor"}" stroke-width="2"/>`).join("")}<text x="108" y="34" font-size="11" font-family="Public Sans" fill="var(--red)" font-weight="600">Tab 05</text></svg>`,
  deals: `<svg viewBox="0 0 240 110" width="100%" height="100%" aria-hidden="true">${[0, 1, 2, 3].map(i => `<path d="M${14 + i * 54} 38h40l10 17-10 17h-40l10-17z" fill="${i === 2 ? "var(--red)" : "currentColor"}" fill-opacity="${i === 2 ? 1 : .14 + i * .08}"/>`).join("")}</svg>`,
  clauses: `<svg viewBox="0 0 240 110" width="100%" height="100%" aria-hidden="true"><rect x="22" y="24" width="150" height="7" rx="2" fill="currentColor" fill-opacity=".2"/><rect x="22" y="44" width="60" height="7" rx="2" fill="currentColor" fill-opacity=".2"/><rect x="88" y="44" width="56" height="7" rx="2" fill="var(--red)" fill-opacity=".3"/><line x1="86" y1="47.5" x2="146" y2="47.5" stroke="var(--red)" stroke-width="2"/><rect x="150" y="44" width="66" height="7" rx="2" fill="var(--blue)" fill-opacity=".45"/><rect x="22" y="64" width="190" height="7" rx="2" fill="currentColor" fill-opacity=".2"/><rect x="22" y="84" width="110" height="7" rx="2" fill="currentColor" fill-opacity=".2"/></svg>`,
  tools: `<svg viewBox="0 0 240 110" width="100%" height="100%" aria-hidden="true">${[46, 70, 30, 58, 84].map((h, i) => `<rect x="${30 + i * 38}" y="${96 - h}" width="24" height="${h}" rx="3" fill="${i === 4 ? "var(--red)" : "currentColor"}" fill-opacity="${i === 4 ? 1 : .22}"/>`).join("")}<line x1="20" y1="96" x2="220" y2="96" stroke="currentColor" stroke-opacity=".3"/></svg>`
};

/* =========================================================
   HOME
   ========================================================= */
const TABC = ["#ff5c70", "#f2f2ef", "#8aacff", "#f2f2ef", "#ffd27a", "#f2f2ef", "#57d38f", "#f2f2ef", "#ff5c70", "#f2f2ef"];
const homeHTML = () => {
  const tick = G.radar.map(r => `<span><b>${esc(dstr(r.d))}</b>${esc(r.t)}</span>`).join("");
  const cp = G.clauses[0];
  const S = G.tape.market;
  return `
<div class="hero">
 <div class="wrap">
  <div>
   <div class="kick" style="color:#ff8a98">A free field guide to Indian deal practice</div>
   <h1 style="margin-top:14px" aria-label="Learn the deal the way the team actually runs it."><span aria-hidden="true">Learn the <span class="rl"><del id="hdel">law</del><ins id="hins"></ins><span class="caret" id="hcaret"></span></span> the way the team <em>actually runs it.</em></span></h1>
   <div class="balloon" id="hbal" aria-hidden="true"><b>KA</b> Changed "law" to "deal". Law school teaches the law. The firm runs the deal.</div>
   <p class="l">From the first conflict check to the last post-closing filing: every stage, every desk, every clause both sides fight over, with the 2026 law that changed it and the source for each line.</p>
   <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="#map">Open the deal map</a><a class="btn ghost" href="#radar">What changed in 2026</a></div>
   <div class="hstats">
    <div><b>10</b>deal stages</div><div><b>${G.deals.length}</b>deal types</div><div><b>${G.clauses.length}</b>clauses redlined</div><div><b>5</b>working tools</div><div><b>${G.glossary.length}</b>terms defined</div>
   </div>
  </div>
  <div class="stage3d" id="stage3d">
   <div class="binder" id="binder">
    <div class="back"></div><div class="pages"></div>
    <div class="leaf"><small>INDEX</small><ol>${G.map.map((s, i) => `<li><a href="#map" data-stage="${i}"><span>${pad(i + 1)}</span>${esc(s.k)}</a></li>`).join("")}</ol></div>
    <div class="cover" id="cover">
     <small>CLOSING BIBLE</small>
     <h4>Project Corpus</h4>
     <p>Acquisition of the entire issued share capital of Target Private Limited</p>
     <div class="rule"></div>
     <p style="font-family:var(--sans);font-size:13px;line-height:1.9;color:#8f95a1">Volume 1 of 1<br>Signed and closed<br>All tabs indexed</p>
     <span class="stamp">EXECUTED</span>
    </div>
    <div class="tabs3d">${TABC.map((c, i) => `<a href="#map" data-stage="${i}" style="background:${c}" aria-label="Tab ${i + 1}: ${esc(G.map[i].k)}">${pad(i + 1)}</a>`).join("")}</div>
   </div>
   <button class="opener" type="button" id="opener" aria-expanded="false" aria-controls="binder">Open the binder</button>
  </div>
 </div>
</div>
<div class="ticker" aria-label="Regulatory changes in 2026"><div class="row">${tick}${tick}</div></div>
${simHTML()}

<div class="band"><div class="wrap">
 <div class="sh"><div><div class="kick">Learn</div><h2>Four ways into the work</h2><p>Each one opens on the thing itself, not on an explanation of it. Your progress stays in this browser.</p></div></div>
 <div class="grid4">
  ${[["map", "01", "Deal map", "Ten tabs of a closing bible. What happens, the documents, the law, a checklist, and what each desk does on that stage."],
     ["deals", "02", "Deal types", `${G.deals.length} structures from share purchase to resolution plan: the flow, the approvals, the time it takes, the traps.`],
     ["clauses", "03", "Clause lab", `${G.clauses.length} clauses with the buyer's and the seller's markup, so you can see what each side changes and why.`],
     ["tools", "04", "Tools", "Anti-dilution, CCI notifiability, open offer triggers, filing deadlines and the new RBI acquisition finance test."]]
   .map(c => `<a class="card" href="#${c[0]}"><div class="illo">${ILLO[c[0]]}</div><span class="no">${c[1]}</span><h3>${c[2]}</h3><p>${c[3]}</p><span class="go">Open</span></a>`).join("")}
 </div>
</div></div>

<div class="band" style="background:var(--panel);border-block:1px solid var(--line)"><div class="wrap">
 <div class="grid2" style="align-items:start">
  <div><div class="kick">Clause lab, live</div><h2 style="margin-top:8px">${esc(cp.n)}</h2><p class="lede">${esc(cp.why)}</p>
   <div class="modes" role="group" aria-label="View">${[["clean", "Clean"], ["a", cp.a + " markup"], ["b", cp.b + " markup"]].map(x => `<button class="chipbtn" type="button" data-hm="${x[0]}" aria-pressed="${x[0] === "a"}">${esc(x[1])}</button>`).join("")}</div>
   <a class="btn ghost" href="#clauses">All ${G.clauses.length} clauses</a></div>
  <div class="clause" id="homeClause">${clauseHTML(cp, "a")}</div>
 </div>
</div></div>

<div class="band"><div class="wrap">
 <div class="sh"><div><div class="kick">Deal tape</div><h2>2026, in four numbers and five deals</h2><p>Fewer deals, bigger cheques. Each deal below comes with what a student should study in it.</p></div><a class="btn ghost" href="#tape">Open the deal tape</a></div>
 <div class="grid4" style="margin-bottom:28px">${S.map(m => `<div class="stat"><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div>`).join("")}</div>
 <p class="src">Market figures: ${ext(G.tape.marketSrc[1], G.tape.marketSrc[0])}</p>
 <div class="grid3" style="margin-top:22px">${G.tape.deals.slice(0, 3).map(d => `<a class="card" href="#tape"><span class="no">${esc(d.kind)}</span><h3>${esc(d.n)}</h3><p><b style="color:var(--ink)">${esc(d.val)}</b>. ${esc(d.date)}.</p><span class="go">What to study</span></a>`).join("")}</div>
</div></div>

<div class="band" style="padding-top:0"><div class="wrap">
 <div class="sh"><div><div class="kick">Regulatory radar</div><h2>Ten changes in 2026 that land on a deal</h2><p>Red is in force, blue is a draft, amber is a bill. Scroll sideways, then open the radar for what each one does to the timetable.</p></div><a class="btn ghost" href="#radar">Open the radar</a></div>
 <div class="timeline">${G.radar.map((r, i) => `<div class="tl ${pillFor(r.st) === "d" ? "dr" : pillFor(r.st) === "b" ? "bl" : ""}"><a href="#radar" data-r="${i}"><small>${esc(dstr(r.d))} &middot; ${esc(r.reg)}</small><b>${esc(r.t)}</b></a></div>`).join("")}</div>
</div></div>

<div class="band" style="background:var(--panel);border-block:1px solid var(--line)"><div class="wrap">
 <div class="sh"><div><div class="kick">Library</div><h2>Long reads, written for people who do the work</h2></div><a class="btn ghost" href="#library">All articles</a></div>
 <div class="grid4">${G.articles.map(a => `<a class="card acard" href="#read-${a.id}"><span class="no">${esc(a.series)}</span><h3>${esc(a.t)}</h3><p>${esc(a.dek)}</p><span class="go">${a.mins} minute read</span></a>`).join("")}</div>
</div></div>

<div class="band"><div class="wrap">
 <div class="sh"><div><div class="kick">Paths</div><h2>Start where you sit</h2><p>Pick a desk. The deal map then shows that desk's job on every stage, and the checklist follows you.</p></div></div>
 <div class="grid4">${G.seats.map((s, i) => `<button class="card" type="button" data-seatgo="${s.id}" style="text-align:left;cursor:pointer;font:inherit"><span class="no">Desk ${i + 1}</span><h3>${esc(s.n)}</h3><p>${esc(s.s)}</p><span class="go">Open the map at this desk</span></button>`).join("")}</div>
</div></div>

<div class="band" style="padding-top:0"><div class="wrap">
 <div class="sh"><div><div class="kick">Coming up on LinkedIn</div><h2>The December calendar</h2></div></div>
 <div class="scroll"><table><thead><tr><th>Date</th><th>Post</th><th>Series</th></tr></thead><tbody>${G.calendar.map(c => `<tr><td style="white-space:nowrap;font-weight:600">${esc(c[0])}</td><td>${esc(c[1])}</td><td class="mute">${esc(c[2])}</td></tr>`).join("")}</tbody></table></div>
</div></div>

${founderBand()}

<div class="newsband band"><div class="wrap">
 <div><div class="kick" style="color:#fff">Newsletter</div><h2 style="margin-top:8px">The Closing Agenda</h2><p style="font-size:19px;margin-top:12px;max-width:52ch">One deal concept, one clause, one regulatory change, every other week from 18 December. Follow the GenCorpus page on LinkedIn to get it.</p></div>
 <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end"><a class="btn" href="https://www.linkedin.com/company/gencorpus" target="_blank" rel="noopener">Follow on LinkedIn</a><a class="btn ghost" href="#library">Read the library</a></div>
</div></div>`;
};
const founderBand = () => {
  const F = G.founder;
  return `<div class="foundband band"><div class="wrap grid2" style="align-items:center">
 <div><div class="kick" style="color:#ff8a98">The founder</div><h2 style="margin-top:8px">Written by a law student, in public, for free.</h2>
  <div class="recital" style="margin-top:20px"><p><b>Whereas</b> ${esc(F.recitals[0])}.</p><p><b>And whereas</b> ${esc(F.recitals[1])}.</p></div>
  <a class="btn" href="#founder" style="background:#fff;color:#0b0d11;border-color:#fff">Read the full page</a></div>
 <div class="ledger">${F.ledger.map(l => `<div><span>${esc(l[0])}</span><div>${esc(l[1])}</div></div>`).join("")}</div>
</div></div>`;
};


/* ---------- deal room simulator ---------- */
const SIM = {
  close: 92, end: 125,
  phases: [[0, "Mandate"], [5, "Diligence"], [14, "Term sheet"], [21, "Drafting and negotiation"], [56, "Signing"], [57, "Conditions precedent"], [92, "Closing"], [93, "Post-closing"]],
  ev: [
    [0, "Partner", "Conflicts cleared. Engagement letter signed. Kick-off call fixes the timetable the client has promised its board.", 2],
    [3, "Associate", "NDA signed. The virtual data room opens with 1,140 documents.", 1],
    [5, "Trainee", "Due diligence request list issued. Issues log set up, one row per finding.", 1],
    [14, "Senior associate", "Term sheet agreed: price, structure, 60 days of exclusivity. Non-binding except confidentiality and exclusivity.", 1],
    [21, "Associate", "Buyer counsel sends the first draft SPA and SHA.", 2],
    [30, "Senior associate", "Red flag report: four customer contracts need change of control consent. Two leases are unregistered.", 1],
    [35, "Seller counsel", "Seller markup returns. Indemnity cap cut to 10% of price, MAC carve-outs widened.", 1],
    [42, "Associate", "Disclosure letter, first draft. Every disclosure must be fair and specific.", 1],
    [49, "Partner", "All-parties call settles the cap at 20%, a 24-month survival period and a specific indemnity for the leases.", 0],
    [56, "Everyone", "SPA and SHA signed. Form I filed with the CCI. Deal value and thresholds checked twice.", 3],
    [58, "Associate", "Shareholder approvals passed. Consent letters go to the four counterparties.", 3],
    [72, "Trainee", "CP tracker circulated every Monday. Two of four consents in.", 0],
    [84, "Associate", "Lender NOC received. All third-party consents in hand.", 2],
    [88, "Senior associate", "CCI approves the combination. Last regulatory CP satisfied.", 1],
    [90, "Associate", "CP satisfaction notice served. Closing agenda and funds flow memo circulated.", 3],
    [92, "Everyone", "Closing. Price paid, SH-4 executed, board meeting held, resignations and appointments take effect.", 9],
    [93, "Trainee", "Closing bible compiled: every signed document, indexed and tabbed.", 1],
    [104, "Associate", "Filings tracked: DIR-12 and MGT-14 within 30 days of the events.", 2],
    [120, "Senior associate", "First claims window opens. Escrow release dates diarised.", 0]
  ],
  cps: [["CCI approval", 56, 88], ["Shareholder approval", 57, 58], ["Third-party consents (4)", 58, 84], ["Lender NOC", 60, 84], ["No MAC, bring-down of warranties", 56, 92]]
};
const simHTML = () => `<div class="band simband"><div class="wrap">
 <div class="sh"><div><div class="kick">The deal room</div><h2>Ninety-two days, one deal. Drag the clock.</h2><p>An illustrative private share purchase with a CCI filing. Watch what lands in the inbox, what moves on the CP tracker and how the closing bible fills up. Real deals vary.</p></div></div>
 <div class="room">
  <div class="roombar"><span class="dots"><i></i><i></i><i></i></span><span>Project Corpus &middot; Matter workspace</span><span class="mute" id="simPh"></span></div>
  <div class="roomgrid">
   <div class="clock">
    <div class="small" style="color:#9aa0ab">Day</div><div class="dnum" id="simDay">0</div>
    <div class="ring" id="simRing"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="#ffffff1f" stroke-width="8"/><circle id="simArc" cx="60" cy="60" r="52" fill="none" stroke="#ff5c70" stroke-width="8" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="326.7" transform="rotate(-90 60 60)"/></svg><span id="simPct">0%</span></div>
    <div class="small" style="color:#9aa0ab;margin-top:6px">to closing</div>
    <div class="bible"><b id="simDocs">0</b><span>documents in the closing bible</span></div>
   </div>
   <div><div class="rh">Inbox</div><ul class="feed" id="simFeed" aria-live="polite"></ul></div>
   <div><div class="rh">CP tracker</div><div id="simCP"></div></div>
  </div>
  <div class="scrub"><button type="button" class="play" id="simPlay" aria-label="Play">&#9654;</button><input type="range" id="simR" min="0" max="${SIM.end}" value="0" aria-label="Deal day"><div class="ticks">${SIM.ev.map(e => `<i style="left:${100 * e[0] / SIM.end}%" class="${e[0] === SIM.close ? "c" : ""}"></i>`).join("")}</div></div>
 </div>
</div></div>`;
const simSet = d => {
  $("simDay").textContent = d;
  const p = Math.min(1, d / SIM.close); $("simArc").setAttribute("stroke-dashoffset", (326.7 * (1 - p)).toFixed(1)); $("simPct").textContent = Math.round(p * 100) + "%";
  $("simArc").setAttribute("stroke", d >= SIM.close ? "#57d38f" : "#ff5c70");
  $("simPh").textContent = SIM.phases.filter(x => x[0] <= d).pop()[1];
  const seen = SIM.ev.filter(e => e[0] <= d);
  $("simDocs").textContent = seen.reduce((a, e) => a + e[3], 0) * 7;
  if ($("simFeed").dataset.n != seen.length) $("simFeed").dataset.n = seen.length, $("simFeed").innerHTML = seen.slice(-5).reverse().map((e, i) => `<li class="${i === 0 ? "new" : ""}"><div><b>${esc(e[1])}</b><span>Day ${e[0]}</span></div><p>${esc(e[2])}</p></li>`).join("");
  $("simCP").innerHTML = SIM.cps.map(c => { const s = d < c[1] ? ["Not started", ""] : d < c[2] ? ["In progress", "w"] : ["Satisfied", "ok"]; return `<div class="cprow"><span>${esc(c[0])}</span><span class="st ${s[1]}">${s[0]}</span></div>`; }).join("") + `<div class="cprow" style="border:0"><span class="mute small">Long stop date</span><span class="small">Day 150</span></div>`;
};
let simT = null;
const initSim = () => {
  const r = $("simR"), stop = () => { clearInterval(simT); simT = null; $("simPlay").innerHTML = "&#9654;"; $("simPlay").setAttribute("aria-label", "Play"); };
  r.addEventListener("input", () => { stop(); simSet(+r.value); });
  $("simPlay").addEventListener("click", () => {
    if (simT) return stop();
    if (+r.value >= SIM.end) r.value = 0;
    $("simPlay").innerHTML = "&#10074;&#10074;"; $("simPlay").setAttribute("aria-label", "Pause");
    simT = setInterval(() => { if (!$("v-home").classList.contains("on")) return stop(); const v = +r.value + 1; r.value = v; simSet(v); if (v >= SIM.end) stop(); }, 110);
  });
  simSet(0);
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting && +r.value === 0 && !simT) { $("simPlay").click(); io.disconnect(); } }, {threshold: .45});
    io.observe(document.querySelector(".room"));
  }
};

/* ---------- motion helpers ---------- */
const reveal = root => {
  if (reduce || !("IntersectionObserver" in window)) return;
  const els = root.querySelectorAll(".sh, .card, .stat, .tl, .room, .rcard, .dcard, .pa");
  els.forEach(e => e.classList.add("rv"));
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), {rootMargin: "0px 0px -8% 0px"});
  els.forEach(e => io.observe(e));
};
document.addEventListener("pointermove", e => {
  const c = e.target.closest && e.target.closest(".card"); if (!c) return;
  const r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
}, {passive: true});
const headline = () => {
  const del = $("hdel"), ins = $("hins"), bal = $("hbal"), car = $("hcaret");
  if (!del) return;
  if (reduce) { del.classList.add("x"); ins.textContent = "deal"; bal.classList.add("on"); car.remove(); return; }
  const word = "deal"; let i = 0;
  setTimeout(() => { del.classList.add("x");
    setTimeout(() => { const t = setInterval(() => { ins.textContent = word.slice(0, ++i); if (i >= word.length) { clearInterval(t); setTimeout(() => { bal.classList.add("on"); car.classList.add("off"); }, 350); } }, 120); }, 520);
  }, 900);
};
let homeTimer;
const initHome = () => {
  headline(); initSim(); reveal($("v-home"));
  const opener = $("opener"), setOpen = o => { $("binder").classList.toggle("open", o); opener.setAttribute("aria-expanded", o); opener.textContent = o ? "Close the binder" : "Open the binder"; };
  opener.addEventListener("click", () => setOpen(!$("binder").classList.contains("open")));
  $("cover").addEventListener("click", () => setOpen(true));
  const b = $("binder"), s3 = $("stage3d");
  if (b && !reduce) {
    s3.addEventListener("pointermove", e => {
      const r = s3.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      b.style.transform = `rotateX(${14 - y * 16}deg) rotateY(${-28 + x * 30}deg) rotateZ(2deg)`;
    });
    s3.addEventListener("pointerleave", () => { b.style.transform = ""; });
  }
  const modes = ["clean", "a", "b"]; let mi = 1;
  const setHM = m => { $("homeClause").innerHTML = clauseHTML(G.clauses[0], m); document.querySelectorAll("[data-hm]").forEach(x => x.setAttribute("aria-pressed", x.dataset.hm === m)); };
  clearInterval(homeTimer);
  if (!reduce) homeTimer = setInterval(() => { if (!$("v-home").classList.contains("on")) return; mi = (mi + 1) % 3; setHM(modes[mi]); }, 4200);
  $("v-home").addEventListener("click", e => {
    const h = e.target.closest("[data-hm]"); if (h) { clearInterval(homeTimer); setHM(h.dataset.hm); return; }
    const sg = e.target.closest("[data-seatgo]"); if (sg) { st.seat = sg.dataset.seatgo; save("gc-seat", st.seat); location.hash = "#map"; if (built.map) { renderSeats(); renderStage(); } return; }
    const r = e.target.closest("[data-r]"); if (r) pendingScroll = "r-" + r.dataset.r;
    const sgo = e.target.closest("[data-stage]"); if (sgo) { e.preventDefault(); st.stage = +sgo.dataset.stage; if (built.map) { renderTrack(); renderStage(); } location.hash = "#map"; }
  });
};

/* =========================================================
   DEAL MAP
   ========================================================= */
const tickCount = s => (st.ticks[s.id] || []).filter(Boolean).length;
const mapHTML = () => `
${pageHead("Deal map", "The deal, tab by tab", "A closing bible has ten tabs. Each tab here is a stage of a private M&A deal: what happens, the documents, the law with its source, a checklist you can tick, and what every desk on the team is doing.")}
<div class="rail"><div class="wrap" style="padding-block:22px 0">
 <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center">
  <div><div class="small" style="color:#9aa0ab;font-weight:600">Your desk</div><div class="lens" id="seatSeg" role="group" aria-label="Choose your desk" style="margin-top:8px"></div></div>
  <div class="small" style="color:#9aa0ab" id="railProg"></div>
 </div>
 <div class="track" id="track" role="tablist" aria-label="Deal stages"></div>
</div></div>
<div class="wrap"><div class="doc" id="stage"></div>
 <div class="band" style="padding-top:20px"><div class="sh"><div><div class="kick">The skills matrix</div><h2>What each desk is judged on</h2><p>The same job looks different at every level. Read across a row to see how the expectation grows.</p></div></div>
 <div class="scroll"><table id="matrix"></table></div></div>
</div>`;
const renderSeats = () => { $("seatSeg").innerHTML = G.seats.map(s => `<button type="button" data-seat="${s.id}" aria-pressed="${s.id === st.seat}" style="${s.id === st.seat ? "background:#fff;color:#0b0d11;border-color:#fff" : "background:transparent;color:#e9e9ec;border-color:#ffffff30"}">${esc(s.n)}</button>`).join(""); };
const renderTrack = () => {
  $("track").innerHTML = G.map.map((s, i) => { const p = Math.round(100 * tickCount(s) / s.check.length); return `<button class="tab" role="tab" type="button" data-i="${i}" aria-selected="${i === st.stage}" id="tab-${s.id}" tabindex="${i === st.stage ? 0 : -1}"><span class="n">Tab ${pad(i + 1)}</span><span class="t">${esc(s.k)}</span><span class="pr" aria-label="${p}% ticked"><i style="width:${p}%"></i></span></button>`; }).join("");
  const done = G.map.reduce((a, s) => a + tickCount(s), 0), all = G.map.reduce((a, s) => a + s.check.length, 0);
  $("railProg").textContent = `${done} of ${all} checklist items ticked`;
};
const renderStage = () => {
  const s = G.map[st.stage], ticks = st.ticks[s.id] || [];
  const seats = G.seats.map(x => `<div class="cmt${x.id === st.seat ? "" : " blue dim"}"><div class="who">${esc(x.n)}${x.id === st.seat ? "<span>your desk</span>" : ""}</div><p>${esc(s.seat[x.id])}</p></div>`).join("");
  $("stage").innerHTML = `<div class="page" role="tabpanel" aria-labelledby="tab-${s.id}">
   <div class="kick">Tab ${pad(st.stage + 1)} of 10</div><h2 style="margin-top:6px">${esc(s.t)}</h2><p class="sum" style="margin-top:14px">${esc(s.sum)}</p>
   <div class="sect"><h3>What happens</h3><ul>${s.what.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
   <div class="sect"><h3>Documents</h3><div class="chips">${s.docs.map(d => `<span class="chip">${esc(d)}</span>`).join("")}</div></div>
   <div class="sect"><h3>Law and sources</h3>${lawList(s.law)}</div>
   <div class="sect"><h3>Every desk on this stage</h3><div class="seats">${seats}</div></div>
   <div class="sect" style="display:flex;gap:10px;flex-wrap:wrap;padding-bottom:32px">
    ${st.stage > 0 ? `<button class="btn ghost" type="button" data-go="${st.stage - 1}">Back: ${esc(G.map[st.stage - 1].k)}</button>` : ""}
    ${st.stage < 9 ? `<button class="btn" type="button" data-go="${st.stage + 1}">Next: ${esc(G.map[st.stage + 1].k)}</button>` : `<a class="btn" href="#deals">Now see how each deal type differs</a>`}
   </div></div>
  <aside class="margin" aria-label="Margin notes" style="padding-top:26px">
   <div class="cmt"><div class="who">Watch out<span>comment</span></div><p>${esc(s.trap)}</p></div>
   <div class="chk"><h3>Checklist <span class="mute small">${ticks.filter(Boolean).length} of ${s.check.length}</span></h3>
    ${s.check.map((c, i) => `<label class="${ticks[i] ? "done" : ""}"><input type="checkbox" data-c="${i}" ${ticks[i] ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}
    <button class="btn ghost" type="button" id="copyChk" style="margin-top:10px;width:100%">Copy checklist</button></div>
  </aside>`;
};
const setStage = i => { st.stage = i; renderTrack(); renderStage(); };
const initMap = () => {
  renderSeats(); renderTrack(); renderStage();
  $("matrix").innerHTML = `<thead><tr><th>Job</th>${G.seats.map(s => `<th>${esc(s.n)}</th>`).join("")}</tr></thead><tbody>${G.skills.map(r => `<tr><td style="font-weight:600">${esc(r.n)}</td><td>${esc(r.t)}</td><td>${esc(r.a)}</td><td>${esc(r.s)}</td><td>${esc(r.p)}</td></tr>`).join("")}</tbody>`;
  $("seatSeg").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; st.seat = b.dataset.seat; save("gc-seat", st.seat); renderSeats(); renderStage(); });
  $("track").addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) setStage(+b.dataset.i); });
  $("track").addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = Math.max(0, Math.min(9, st.stage + (e.key === "ArrowRight" ? 1 : -1)));
    setStage(n); const t = $("track").children[n]; t.focus(); t.scrollIntoView({block: "nearest", inline: "nearest"});
  });
  $("stage").addEventListener("change", e => {
    if (!e.target.matches("input[data-c]")) return;
    const s = G.map[st.stage], arr = st.ticks[s.id] || [];
    arr[+e.target.dataset.c] = e.target.checked; st.ticks[s.id] = arr; save("gc-ticks", st.ticks); renderTrack(); renderStage();
  });
  $("stage").addEventListener("click", e => {
    const g = e.target.closest("[data-go]"); if (g) { setStage(+g.dataset.go); $("track").scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"}); return; }
    if (e.target.id === "copyChk") { const s = G.map[st.stage]; copy(s.t + "\n" + s.check.map(c => "[ ] " + c).join("\n"), "Checklist"); }
  });
};

/* =========================================================
   DEAL TYPES
   ========================================================= */
const groups = ["All", ...new Set(G.deals.map(d => d.g))];
const dealsShown = () => G.deals.map((d, i) => [d, i]).filter(([d]) => st.dealGroup === "All" || d.g === st.dealGroup);
const dealsHTML = () => `${pageHead("Deal types", "Fourteen ways to do a deal", "Each structure moves value differently, needs different approvals and fails in different places. Pick one to see how it runs from first call to closing.")}
<div class="wrap band" style="padding-top:28px"><div class="filters" id="dealFilters" role="group" aria-label="Filter by group"></div><div class="split"><div class="list" id="dealList"></div><div id="dealOut"></div></div></div>`;
const renderDealList = () => {
  $("dealFilters").innerHTML = groups.map(g => `<button class="chipbtn" type="button" data-g="${esc(g)}" aria-pressed="${g === st.dealGroup}">${esc(g)}</button>`).join("");
  $("dealList").innerHTML = dealsShown().map(([d, i]) => `<button type="button" data-d="${i}" aria-current="${i === st.deal}">${esc(d.n)}</button>`).join("");
};
const renderDeal = () => {
  const d = G.deals[st.deal];
  $("dealOut").innerHTML = `<div class="kick">${esc(d.g)}</div><h2 style="margin:6px 0 12px">${esc(d.n)}</h2>
   <p style="font-family:var(--serif);font-size:20px;line-height:1.5">${esc(d.sum)}</p><p class="mute">${esc(d.when)}</p>
   <div class="sect"><h3>How it runs</h3><div class="flow">${d.flow.map(f => `<div>${esc(f)}</div>`).join("")}</div><p class="note" style="margin-top:6px"><b>Typical time.</b> ${esc(d.time)}</p></div>
   <div class="grid2 sect"><div><h3>Approvals and triggers</h3><ul>${d.approvals.map(a => `<li>${esc(a)}</li>`).join("")}</ul></div>
   <div><h3>Documents</h3><div class="chips">${d.docs.map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>
   <h3 style="margin-top:22px">Traps</h3><ul>${d.traps.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div></div>
   <div class="sect"><h3>Law and sources</h3>${lawList(d.law)}</div>`;
};
const initDeals = () => {
  renderDealList(); renderDeal();
  $("dealFilters").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; st.dealGroup = b.dataset.g; const f = dealsShown(); if (f.length && !f.some(([, i]) => i === st.deal)) st.deal = f[0][1]; renderDealList(); renderDeal(); });
  $("dealList").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; st.deal = +b.dataset.d; renderDealList(); renderDeal(); if (innerWidth < 900) $("dealOut").scrollIntoView({behavior: reduce ? "auto" : "smooth"}); });
};

/* =========================================================
   CLAUSE LAB
   ========================================================= */
function tokens(segs) {
  const out = [];
  segs.forEach(sg => {
    if (typeof sg === "string") { out.push({k: "base", t: sg}); return; }
    const side = sg[0][0], op = sg[0][1], t = sg[1];
    if (op === "+") { out.push({k: "ins", side, t}); return; }
    const hit = [...out].reverse().find(o => o.k === "del" && o.t === t && !o.by.includes(side));
    if (hit) hit.by.push(side); else out.push({k: "del", t, by: [side]});
  });
  return out;
}
function clauseHTML(c, mode) {
  return tokens(c.text).map(o => {
    if (o.k === "base") return esc(o.t);
    if (o.k === "del") return mode !== "clean" && o.by.includes(mode) ? `<del>${esc(o.t)}</del>` : esc(o.t);
    return mode === o.side ? `<ins class="${o.side}">${esc(o.t)}</ins>` : "";
  }).join("");
}
const clauseText = c => tokens(c.text).filter(o => o.k !== "ins").map(o => o.t).join("");
const clausesHTML = () => `${pageHead("Clause lab", "Twenty-two clauses, both sides' markup", "Read the clean draft, then switch to each side's markup. Blue and green are insertions, red is a deletion. Every clause says why it is negotiated, the points that move, and the law behind it.")}
<div class="wrap band" style="padding-top:28px"><div class="split"><div class="list" id="clauseList"></div><div id="clauseOut"></div></div></div>`;
const renderClauseList = () => {
  let last = "";
  $("clauseList").innerHTML = G.clauses.map((c, i) => { const h = c.g !== last ? `<div class="grp">${esc(c.g)}</div>` : ""; last = c.g; return h + `<button type="button" data-c="${i}" aria-current="${i === st.clause}">${esc(c.n)}</button>`; }).join("");
};
const renderClause = () => {
  const c = G.clauses[st.clause], m = [["clean", "Clean draft"], ["a", c.a + " markup"], ["b", c.b + " markup"]];
  $("clauseOut").innerHTML = `<div class="kick">${esc(c.g)}</div><h2 style="margin:6px 0 12px">${esc(c.n)}</h2><p style="max-width:65ch">${esc(c.why)}</p>
   <div class="modes" role="group" aria-label="View">${m.map(x => `<button class="chipbtn" type="button" data-m="${x[0]}" aria-pressed="${st.mode === x[0]}">${esc(x[1])}</button>`).join("")}</div>
   <div class="clause" aria-live="polite">${clauseHTML(c, st.mode)}</div>
   <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:18px;align-items:center">
    <div class="legend"><span><i style="background:var(--bluebg);color:var(--blue);text-decoration:underline">inserted</i> by ${esc(c.a)}</span><span><i style="background:var(--okbg);color:var(--ok);text-decoration:underline">inserted</i> by ${esc(c.b)}</span><span><i style="background:var(--redbg);color:var(--red);text-decoration:line-through">deleted</i></span></div>
    <button class="btn ghost" type="button" id="copyCl">Copy clean draft</button></div>
   <p class="mute small" style="margin-top:10px">Teaching sample. Not a precedent. Do not use it in a transaction.</p>
   <div class="grid2 sect"><div><h3>What gets negotiated</h3><ul>${c.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
   <div><div class="cmt"><div class="who">Watch out<span>comment</span></div><p>${esc(c.trap)}</p></div><h3 style="margin-top:22px">Law</h3>${lawList(c.law)}</div></div>`;
};
const initClauses = () => {
  renderClauseList(); renderClause();
  $("clauseList").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; st.clause = +b.dataset.c; renderClauseList(); renderClause(); if (innerWidth < 900) $("clauseOut").scrollIntoView({behavior: reduce ? "auto" : "smooth"}); });
  $("clauseOut").addEventListener("click", e => {
    const b = e.target.closest("[data-m]"); if (b) { st.mode = b.dataset.m; renderClause(); return; }
    if (e.target.id === "copyCl") copy(clauseText(G.clauses[st.clause]), "Clean draft");
  });
};

/* =========================================================
   TOOLS
   ========================================================= */
const num = id => { const v = parseFloat($(id).value); return isFinite(v) ? v : 0; };
const rs = v => "Rs " + v.toLocaleString("en-IN", {minimumFractionDigits: 2, maximumFractionDigits: 2});
const cr = v => "Rs " + v.toLocaleString("en-IN", {maximumFractionDigits: 2}) + " crore";
const lakh = v => v.toLocaleString("en-IN", {maximumFractionDigits: 2}) + " lakh";
const pct = v => v.toLocaleString("en-IN", {maximumFractionDigits: 2}) + "%";
const inp = (id, label, val, extra = "") => `<label${extra}>${label}<input id="${id}" type="number" inputmode="decimal" step="any" value="${val}"></label>`;
const tog = (id, label, on, extra = "") => `<label class="tog"${extra}><input id="${id}" type="checkbox"${on ? " checked" : ""}>${label}</label>`;
const toolBox = (id, no, title, lede, form, out) => `<section class="tool" id="${id}"><header><div class="kick">Tool ${no}</div><h2 style="font-size:28px;margin-top:4px">${title}</h2><p>${lede}</p></header><div class="tbody"><form class="inputs" id="${id}F" novalidate>${form}</form><div class="out" id="${id}O" aria-live="polite"></div></div></section>`;
const toolsHTML = () => `${pageHead("Tools", "Five working tools", "Change any number and the answer updates. Every tool shows its working and its source. They teach the test. They do not replace reading the rule.")}
<div class="wrap band" style="padding-top:28px">
 <div class="chips" style="margin-bottom:26px">${[["t-af", "RBI acquisition finance"], ["t-ad", "Anti-dilution"], ["t-cci", "CCI notifiability"], ["t-sast", "Open offer trigger"], ["t-dl", "Filing deadlines"]].map(x => `<a class="chip" href="#tools" data-jump="${x[0]}" style="text-decoration:none;color:var(--ink)">${x[1]}</a>`).join("")}</div>
 ${toolBox("t-af", "01", "RBI acquisition finance: can a bank fund this?", "The 2026 directions, effective 1 July 2026, let banks lend for acquisitions of control. Enter the acquirer and the deal to test eligibility and the maximum loan.",
   `<label class="full">Acquirer<select id="af1"><option value="l">Listed company</option><option value="u">Unlisted company</option></select></label>
    ${inp("af2", "Acquirer net worth (Rs crore)", 1200)}${inp("af3", "Acquisition value (Rs crore)", 800)}
    <label class="full">Purpose<select id="af4"><option value="c">Acquire control of the target</option><option value="x">Already in control, stake crosses 26, 51, 75 or 90%</option><option value="o">Minority stake, no control</option></select></label>
    <fieldset><legend>Checks</legend>${tog("af5", "Profit after tax in each of the last three years", true)}${tog("af6", "Rating BBB- or above (needed if unlisted)", true)}${tog("af7", "Target is a non-financial company", true)}${tog("af8", "Control within 12 months of the agreement", true)}${tog("af9", "Acquirer and target are related parties", false)}${tog("af10", "Acquirer is foreign owned or controlled", false)}</fieldset>`)}
 ${toolBox("t-ad", "02", "Anti-dilution in a down round", "Run one down round through full ratchet, broad-based and narrow-based weighted average, then apply the FEMA pricing floor for a non-resident investor.",
   `${inp("ad1", "Series A investment (Rs lakh)", 1000)}${inp("ad2", "Series A price per share (Rs)", 500)}${inp("ad3", "Fully diluted shares before round (lakh)", 10)}${inp("ad4", "Founder shares (lakh)", 7)}${inp("ad5", "ESOP pool, outstanding (lakh)", 1)}${inp("ad6", "New round raise (Rs lakh)", 500)}${inp("ad7", "New round price (Rs)", 250)}${inp("ad8", "Fair value at Series A issue (Rs)", 400)}${tog("ad9", "Series A investor is a non-resident", true, ' class="tog full"')}`)}
 ${toolBox("t-cci", "03", "CCI: is this a notifiable combination?", "Asset, turnover and deal value tests under section 5, with the small target exemption. Figures in Rs crore, and worldwide figures in USD million.",
   `${inp("c1", "Parties: India assets (Rs cr)", 3000)}${inp("c2", "Parties: India turnover (Rs cr)", 5000)}${inp("c3", "Parties: worldwide assets (USD m)", 900)}${inp("c4", "Parties: worldwide turnover (USD m)", 1200)}${inp("c5", "Group: India assets (Rs cr)", 6000)}${inp("c6", "Group: India turnover (Rs cr)", 9000)}${inp("c7", "Group: worldwide assets (USD m)", 2000)}${inp("c8", "Group: worldwide turnover (USD m)", 4000)}${inp("c9", "Target: India assets (Rs cr)", 600)}${inp("c10", "Target: India turnover (Rs cr)", 1400)}${inp("c11", "Deal value (Rs cr)", 1500)}${tog("c12", "Target has substantial business operations in India", true)}`)}
 ${toolBox("t-sast", "04", "Takeover code: does this trigger an open offer?", "Initial trigger at 25%, creeping acquisition above 5% a year, and control. For a listed target.",
   `${inp("s1", "Current holding with PACs (%)", 22)}${inp("s2", "Proposed acquisition (%)", 4)}${inp("s3", "Already acquired this financial year (%)", 0)}${tog("s4", "Acquiring control", false, ' class="tog full"')}`)}
 ${toolBox("t-dl", "05", "Post-closing filing calendar", "Enter the closing events to see the filings and their due dates.",
   `<label>Allotment date<input id="d1" type="date"></label><label>Special resolution passed<input id="d2" type="date"></label><label>Director appointed<input id="d3" type="date"></label><label>Capital altered<input id="d4" type="date"></label><label>Shares transferred (FDI)<input id="d5" type="date"></label><label>Funds received (FDI transfer)<input id="d6" type="date"></label>`)}
</div>`;
const af = () => {
  const L = $("af1").value === "l", nw = num("af2"), val = num("af3"), pur = $("af4").value;
  const t = [
    ["Net worth of at least Rs 500 crore", nw >= 500],
    ["Profit after tax in each of the last three years", $("af5").checked],
    ...(!L ? [["Investment grade rating, BBB- or above", $("af6").checked]] : []),
    ["Target is a non-financial company", $("af7").checked],
    ["Purpose is control, or a step past 26, 51, 75 or 90% for an acquirer already in control", pur !== "o"],
    ["Control within 12 months of the agreement", pur !== "c" || $("af8").checked],
    ["Acquirer and target are not related parties", !$("af9").checked],
    ["Acquirer is not foreign owned or controlled", !$("af10").checked]
  ];
  const ok = t.every(x => x[1]);
  const loan = val * .75, own = val - loan;
  $("t-afO").innerHTML = `<div class="verdict ${ok ? "n" : "y"}"><b>${ok ? "Eligible on these facts" : "Not eligible on these facts"}</b><p style="margin:6px 0 0">${ok ? "A bank may consider acquisition finance. The bank still runs its own credit assessment and valuation." : "At least one condition fails. See the list below."}</p></div>
   <div class="small mute">Maximum bank finance, 75% of acquisition value</div><div class="big">${ok ? cr(loan) : "Nil"}</div>
   <div class="rows">${[["Bank loan", ok ? 75 : 0, "var(--blue)", ok ? cr(loan) : "Nil"], ["Acquirer's own funds", ok ? 25 : 100, "var(--ink)", cr(ok ? own : val)]].map(r => `<div class="row"><span>${r[0]}</span><span class="bar"><i style="width:${r[1]}%;background:${r[2]}"></i></span><span class="v">${r[3]}</span></div>`).join("")}</div>
   ${ok && L ? `<p class="note" style="margin-top:12px">A listed acquirer may take secured bridge finance for the remaining 25% (${cr(own)}), with an identified source of repayment within 12 months.</p>` : ""}
   <ul class="tests" style="margin-top:12px">${t.map(x => `<li><span>${esc(x[0])}</span><span class="${x[1] ? "no" : "yes"}">${x[1] ? "Yes" : "Fails"}</span></li>`).join("")}</ul>
   <p class="small mute" style="margin-top:10px">Security: the acquired shares or CCDs of the target, unencumbered, plus a corporate guarantee from the acquirer, its parent or the group holding company. Value: one independent valuer for a listed target, the lower of two valuations for an unlisted one. Simplified from the RBI directions of 13 February 2026, as clarified on 30 March 2026. <a href="#read-acq-finance">Read the explainer</a>.</p>`;
};
const ad = () => {
  const inv = num("ad1"), p1 = num("ad2"), fd = num("ad3"), fo = num("ad4"), esop = num("ad5"), nr = num("ad6"), p2 = num("ad7"), fv = num("ad8"), nonres = $("ad9").checked;
  if (p1 <= 0 || p2 <= 0 || fd <= 0) { $("t-adO").innerHTML = `<p class="note">Enter prices and a share count above zero.</p>`; return; }
  const aSh = inv / p1, C = nr / p2, B = nr / p1;
  const raw = {fr: p2, bb: p1 * (fd + B) / (fd + C), nb: p1 * (fd - esop + B) / (fd - esop + C)};
  if (p2 >= p1) { raw.fr = p1; raw.bb = p1; raw.nb = p1; }
  const fl = v => nonres ? Math.max(v, fv) : v;
  const rows = [["None", p1, p1], ["Full ratchet", raw.fr, fl(raw.fr)], ["Broad-based WA", raw.bb, fl(raw.bb)], ["Narrow-based WA", raw.nb, fl(raw.nb)]];
  const calc = cp => { const conv = inv / cp, tot = fd - aSh + conv + C; return {conv, f: 100 * fo / tot, a: 100 * conv / tot, n: 100 * C / tot}; };
  const bb = calc(fl(raw.bb));
  $("t-adO").innerHTML = `<div class="small mute">Broad-based weighted average conversion price${nonres ? ", after the FEMA floor" : ""}</div><div class="big">${rs(fl(raw.bb))}</div>
   <p class="small mute" style="margin-top:6px">CP2 = CP1 &times; (A + B) / (A + C) = ${p1} &times; (${lakh(fd)} + ${lakh(B)}) / (${lakh(fd)} + ${lakh(C)}). A is shares before the round, B is shares the new money would buy at CP1, C is shares actually issued.</p>
   <div class="scroll"><table style="margin-top:10px"><thead><tr><th>Method</th><th class="n">Formula</th><th class="n">Applied</th><th class="n">Series A shares</th><th class="n">Founders</th></tr></thead><tbody>
   ${rows.map(r => { const k = calc(r[2]); return `<tr><td>${r[0]}</td><td class="n">${rs(r[1])}</td><td class="n">${rs(r[2])}${r[2] !== r[1] ? " *" : ""}</td><td class="n">${lakh(k.conv)}</td><td class="n">${pct(k.f)}</td></tr>`; }).join("")}</tbody></table></div>
   ${nonres && fv > Math.min(raw.fr, raw.bb, raw.nb) ? `<p class="small" style="margin-top:8px">* Floored at fair value at issue (${rs(fv)}). For a non-resident, the conversion price cannot be lower than fair value at the time of issue under the NDI Rules. The draft FEM (Foreign Investment) Rules, 2026 may change this if notified.</p>` : ""}
   <div class="rows"><div class="small" style="font-weight:600">Cap table after the round, broad-based</div>
    ${[["Founders", bb.f, "var(--ink)"], ["Series A", bb.a, "var(--red)"], ["New investor", bb.n, "var(--blue)"], ["Others and ESOP", Math.max(0, 100 - bb.f - bb.a - bb.n), "var(--mute)"]].map(r => `<div class="row"><span>${r[0]}</span><span class="bar"><i style="width:${Math.max(0, r[1])}%;background:${r[2]}"></i></span><span class="v">${pct(r[1])}</span></div>`).join("")}</div>
   <p class="small mute" style="margin-top:10px"><a href="#read-anti-dilution">Read the worked example</a>.</p>`;
};
const cci = () => {
  const v = i => num("c" + i);
  const tests = [
    ["Parties, India: assets above Rs 2,500 crore or turnover above Rs 7,500 crore", v(1) > 2500 || v(2) > 7500],
    ["Parties, worldwide: assets above USD 1.25 billion with at least Rs 1,250 crore in India, or turnover above USD 3.75 billion with at least Rs 3,750 crore in India", (v(3) > 1250 && v(1) >= 1250) || (v(4) > 3750 && v(2) >= 3750)],
    ["Group, India: assets above Rs 10,000 crore or turnover above Rs 30,000 crore", v(5) > 10000 || v(6) > 30000],
    ["Group, worldwide: assets above USD 5 billion with at least Rs 1,250 crore in India, or turnover above USD 15 billion with at least Rs 3,750 crore in India", (v(7) > 5000 && v(5) >= 1250) || (v(8) > 15000 && v(6) >= 3750)]
  ];
  const thr = tests.some(t => t[1]), dm = v(9) <= 450 || v(10) <= 1250, dvt = v(11) > 2000 && $("c12").checked;
  let cls, head, body;
  if (dvt) { cls = "y"; head = "Likely notifiable: deal value threshold"; body = "Deal value exceeds Rs 2,000 crore and the target has substantial business operations in India. The small target exemption does not apply. Check the other exemptions in the 2024 Exemption Rules."; }
  else if (thr && !dm) { cls = "y"; head = "Likely notifiable"; body = "At least one asset or turnover test is met and the target is above the small target limits. Check the other exemptions before deciding."; }
  else if (thr && dm) { cls = "m"; head = "Thresholds met, but the small target exemption may apply"; body = "The target's Indian assets are Rs 450 crore or less, or its Indian turnover is Rs 1,250 crore or less. Confirm the exemption fits the structure and that the deal value test is not met."; }
  else { cls = "n"; head = "Not a combination on these numbers"; body = "No asset, turnover or deal value test is met. Recheck the figures from the latest audited accounts and the full deal value, including non-compete and deferred payments."; }
  $("t-cciO").innerHTML = `<div class="verdict ${cls}"><b>${head}</b><p style="margin:6px 0 0">${body}</p></div>
   <ul class="tests">${tests.map(t => `<li><span>${t[0]}</span><span class="${t[1] ? "yes" : "no"}">${t[1] ? "Met" : "Not met"}</span></li>`).join("")}
   <li><span>Small target exemption (India assets up to Rs 450 crore or turnover up to Rs 1,250 crore)</span><span class="${dm ? "no" : "yes"}">${dm ? "Available" : "Not available"}</span></li>
   <li><span>Deal value threshold (above Rs 2,000 crore with substantial business operations in India)</span><span class="${dvt ? "yes" : "no"}">${dvt ? "Met" : "Not met"}</span></li></ul>
   <p class="small mute" style="margin-top:10px">If notifiable, no step towards completion before approval or 150 days (s. 6(2A)). CCI forms a prima facie view within 30 days. Sources: Competition Act, 2002, ss. 5 and 6, MCA notifications of 7 March 2024, Combination Regulations, 2024 and Exemption Rules, 2024. Simplified: compute assets and turnover as the rules require.</p>`;
};
const sast = () => {
  const cur = num("s1"), acq = num("s2"), fy = num("s3"), ctl = $("s4").checked, post = cur + acq, trig = [];
  if (ctl) trig.push("Reg. 4: acquiring control of the target, whatever the percentage.");
  if (cur < 25 && post >= 25) trig.push("Reg. 3(1): holding goes from below 25% to " + pct(post) + ".");
  if (cur >= 25 && fy + acq > 5) trig.push("Reg. 3(2): a 25% or larger holder acquiring more than 5% in the financial year (" + pct(fy + acq) + " in total).");
  $("t-sastO").innerHTML = `<div class="small mute">Holding after acquisition</div><div class="big">${pct(post)}</div>
   <div class="rows"><div class="row"><span>Holding</span><span class="bar" style="position:relative"><i style="width:${Math.min(100, post)}%;background:${trig.length ? "var(--red)" : "var(--ok)"}"></i><span style="position:absolute;left:25%;top:-3px;bottom:-3px;border-left:2px dashed var(--ink)" title="25%"></span><span style="position:absolute;left:75%;top:-3px;bottom:-3px;border-left:2px dashed var(--mute)" title="75%"></span></span><span class="v">25% / 75% lines</span></div></div>
   <div class="verdict ${trig.length ? "y" : "n"}" style="margin-top:14px"><b>${trig.length ? "Open offer triggered" : "No open offer trigger on these figures"}</b>
   ${trig.length ? `<ul style="margin-top:6px">${trig.map(t => `<li>${esc(t)}</li>`).join("")}</ul><p style="margin:6px 0 0">The offer must be for at least 26% of the total shares (reg. 7), at a price under reg. 8. Public announcement on the day of the agreement (reg. 13).</p>` : `<p style="margin:6px 0 0">Disclosure obligations under reg. 29 may still apply at 5% and on every 2% change after that.</p>`}</div>
   ${post > 75 ? `<p class="note">The holding would exceed 75%. Minimum public shareholding must be restored under rule 19A of the SCRR.</p>` : ""}
   <p class="small mute" style="margin-top:10px">Check the exemptions in reg. 10, indirect acquisitions under reg. 5, and persons acting in concert. Since 2 January 2026, valuations under the code are by an independent registered valuer. Source: SEBI SAST Regulations, 2011.</p>`;
};
const addDays = (d, n) => { const x = new Date(d + "T00:00:00"); x.setDate(x.getDate() + n); return x; };
const fmtD = d => d.toLocaleDateString("en-IN", {weekday: "short", day: "numeric", month: "short", year: "numeric"});
const deadlines = () => {
  const items = [], add = (id, n, form, law) => { const v = $(id).value; if (v) items.push([addDays(v, n), form, law]); };
  add("d1", 15, "PAS-3 return of allotment", "s. 39(4) and Rule 12");
  add("d1", 30, "FC-GPR (if allotted to a non-resident)", "FEM Reporting Regulations, 2019");
  add("d2", 30, "MGT-14 for special resolutions", "s. 117");
  add("d3", 30, "DIR-12 for change in directors", "s. 170(2)");
  add("d4", 30, "SH-7 for alteration of capital", "s. 64");
  const t = $("d5").value, f = $("d6").value;
  if (t || f) { const base = [t, f].filter(Boolean).sort()[0]; items.push([addDays(base, 60), "FC-TRS, 60 days from transfer or receipt of funds, whichever is earlier", "FEM Reporting Regulations, 2019"]); }
  items.sort((a, b) => a[0] - b[0]);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  $("t-dlO").innerHTML = items.length ? `<div class="small mute">Next deadline</div><div class="big" style="font-size:clamp(26px,4vw,40px)">${fmtD(items[0][0])}</div>
   <div class="scroll"><table style="margin-top:12px"><thead><tr><th>Due</th><th>Filing</th><th>Law</th></tr></thead><tbody>${items.map(i => { const late = i[0] < today; return `<tr><td style="white-space:nowrap${late ? ";color:var(--red);font-weight:600" : ""}">${fmtD(i[0])}${late ? " (passed)" : ""}</td><td>${esc(i[1])}</td><td>${esc(i[2])}</td></tr>`; }).join("")}</tbody></table></div>
   <p class="small mute" style="margin-top:10px">Calendar days from the date entered. Late filing usually attracts additional fees. Confirm the start date for each form in the rule itself.</p>` : `<p class="note">Enter at least one date to see the filing calendar.</p>`;
};
const initTools = () => {
  const d = new Date(); d.setDate(d.getDate() - 3); const iso = d.toISOString().slice(0, 10); ["d1", "d2", "d3"].forEach(id => $(id).value = iso);
  [["t-af", af], ["t-ad", ad], ["t-cci", cci], ["t-sast", sast], ["t-dl", deadlines]].forEach(([id, fn]) => { const f = $(id + "F"); f.addEventListener("input", fn); f.addEventListener("change", fn); f.addEventListener("submit", e => e.preventDefault()); fn(); });
  $("v-tools").addEventListener("click", e => { const j = e.target.closest("[data-jump]"); if (j) { e.preventDefault(); $(j.dataset.jump).scrollIntoView({behavior: reduce ? "auto" : "smooth"}); } });
};

/* =========================================================
   RADAR
   ========================================================= */
const radarHTML = () => {
  const regs = ["All", ...new Set(G.radar.map(r => r.reg))];
  return `${pageHead("Regulatory radar", "What changed in 2026, and what it does to a deal", "Each change with its date, its status, what it says, and the line a deal team needs. Check the source before relying on any of it: some items are drafts or bills.")}
<div class="wrap band" style="padding-top:28px">
 <div class="filters" id="radarF" role="group" aria-label="Filter by regulator">${regs.map(r => `<button class="chipbtn" type="button" data-rf="${esc(r)}" aria-pressed="${r === "All"}">${esc(r)}</button>`).join("")}</div>
 <div id="radarL">${G.radar.map((r, i) => `<article class="rcard" id="r-${i}" data-reg="${esc(r.reg)}">
  <div class="when"><b>${esc(dstr(r.d))}</b><span>${esc(r.reg)}</span><div style="margin-top:8px"><span class="pill ${pillFor(r.st)}">${esc(r.st)}</span></div></div>
  <div><h3>${esc(r.t)}</h3><p>${esc(r.what)}</p><div class="deal"><b>On a deal.</b> ${esc(r.deal)}</div><p class="src">Source: ${ext(r.src[1], r.src[0])}</p></div></article>`).join("")}</div>
 <p class="small mute" style="margin-top:20px">Checked November 2026. The Corporate Laws (Amendment) Bill, 2026 and the draft FEM (Foreign Investment) Rules, 2026 are not law until enacted or notified. Check the Gazette.</p>
</div>`;
};
const initRadar = () => {
  $("radarF").addEventListener("click", e => {
    const b = e.target.closest("[data-rf]"); if (!b) return;
    document.querySelectorAll("[data-rf]").forEach(x => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll("#radarL .rcard").forEach(c => { c.style.display = b.dataset.rf === "All" || c.dataset.reg === b.dataset.rf ? "" : "none"; });
  });
};

/* =========================================================
   TAPE
   ========================================================= */
const tapeHTML = () => `${pageHead("Deal tape", "2026 deals worth studying", "Public deals only, summarised from the linked reports. Each one lists the legal questions a student should be able to answer about it.")}
<div class="wrap band" style="padding-top:28px">
 <div class="grid4" style="margin-bottom:12px">${G.tape.market.map(m => `<div class="stat"><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div>`).join("")}</div>
 <p class="src" style="margin-bottom:34px">Source: ${ext(G.tape.marketSrc[1], G.tape.marketSrc[0])}</p>
 ${G.tape.deals.map((d, i) => `<article class="dcard"><div><span class="no kick">${pad(i + 1)} &middot; ${esc(d.kind)}</span><h3>${esc(d.n)}</h3><div class="val">${esc(d.val)}</div><div class="meta"><span>${esc(d.date)}</span></div><p style="margin-top:12px">${esc(d.sum)}</p><p class="src">${d.src.map(s => ext(s[1], s[0])).join("")}</p></div>
  <div class="cmt blue"><div class="who">What to study<span>${d.study.length} questions</span></div><ol style="margin-top:8px">${d.study.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div></article>`).join("")}
</div>`;

/* =========================================================
   LIBRARY AND READER
   ========================================================= */
const libraryHTML = () => {
  const series = [...new Set(G.articles.map(a => a.series.replace(/ No\.? ?\d+$/, "")))];
  return `${pageHead("Library", "Long reads", "Three series. Clause decoded takes one clause apart with numbers. Deal anatomy follows one transaction mechanism. Regulatory radar explains one change and what it does to a deal.")}
<div class="wrap band" style="padding-top:28px">
 <div class="chips" style="margin-bottom:26px">${series.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
 <div class="grid2">${G.articles.map(a => `<a class="card acard" href="#read-${a.id}"><span class="no">${esc(a.series)} &middot; ${esc(a.date)}</span><h3 style="font-size:28px">${esc(a.t)}</h3><p style="font-size:17px">${esc(a.dek)}</p><span class="go">${a.mins} minute read</span></a>`).join("")}</div>
</div>`;
};
const readHTML = id => {
  const a = G.articles.find(x => x.id === id); if (!a) return "";
  const i = G.articles.indexOf(a), nx = G.articles[(i + 1) % G.articles.length];
  return `<div class="wrap band"><article class="reader">
  <div class="crumb"><a href="#home">GenCorpus</a> / <a href="#library">Library</a></div>
  <div class="kick">${esc(a.series)}</div><h1 style="margin-top:10px">${esc(a.t)}</h1><p class="dek">${esc(a.dek)}</p>
  <p class="small mute">By Kushagra Aditya &middot; ${esc(a.date)} &middot; ${a.mins} minute read</p>
  ${a.body.map(s => `<h2>${esc(s[0])}</h2>${s[1].map(p => `<p>${esc(p)}</p>`).join("")}`).join("")}
  <div class="srcs"><h3>Sources</h3><ol>${a.src.map(s => `<li>${ext(s[1], s[0])}</li>`).join("")}</ol>
  <p class="small mute" style="margin-top:14px">Educational content, not legal advice. Law as checked on the date above.</p></div>
  <a class="card" href="#read-${nx.id}" style="margin-top:36px"><span class="no">Next read</span><h3>${esc(nx.t)}</h3></a>
 </article></div>`;
};

/* =========================================================
   CAREERS
   ========================================================= */
const careersHTML = () => `${pageHead("Career", "How a transaction lawyer's work grows", "What each practice area does, the firms that do it, the habits that get noticed, and a first-week list for a new seat. Firm names are in alphabetical order and are not a ranking.")}
<div class="wrap band" style="padding-top:28px">
 <div class="sh"><div><div class="kick">Desks</div><h2>From trainee to partner</h2></div></div>
 <div class="grid4">${G.seats.map((s, i) => `<div class="card"><span class="no">Desk ${i + 1}</span><h3>${esc(s.n)}</h3><p>${esc(s.s)}</p></div>`).join("")}</div>
 <div class="scroll" style="margin-top:22px"><table><thead><tr><th>Job</th>${G.seats.map(s => `<th>${esc(s.n)}</th>`).join("")}</tr></thead><tbody>${G.skills.map(r => `<tr><td style="font-weight:600">${esc(r.n)}</td><td>${esc(r.t)}</td><td>${esc(r.a)}</td><td>${esc(r.s)}</td><td>${esc(r.p)}</td></tr>`).join("")}</tbody></table></div>
 <div class="sh" style="margin-top:64px"><div><div class="kick">Practice areas</div><h2>What each team does</h2></div></div>
 ${G.practices.map(p => `<div class="pa"><b>${esc(p[0])}</b><span>${esc(p[1])}</span></div>`).join("")}
 <div class="grid2" style="margin-top:64px;align-items:start">
  <div><div class="kick">Habits</div><h2 style="margin:8px 0 18px">What gets noticed</h2>${G.habits.map((h, i) => `<div class="pa" style="grid-template-columns:minmax(0,2.4em) minmax(0,1fr)"><b style="color:var(--red)">${pad(i + 1)}</b><div><b>${esc(h[0])}</b><p class="mute" style="margin:4px 0 0">${esc(h[1])}</p></div></div>`).join("")}</div>
  <div><div class="kick">First week</div><h2 style="margin:8px 0 18px">A list for a new seat</h2><div class="chk">${G.firstWeek.map((f, i) => `<label><input type="checkbox" data-fw="${i}"${(load("gc-fw", []))[i] ? " checked" : ""}><span>${esc(f)}</span></label>`).join("")}</div></div>
 </div>
 <div class="sh" style="margin-top:64px"><div><div class="kick">Firms</div><h2>Indian firms with corporate and M&A practices</h2><p>A starting list for research, in alphabetical order. Not a ranking, not exhaustive, and no affiliation with any of them.</p></div></div>
 <div class="firms">${G.firms.map(f => `<span>${esc(f)}</span>`).join("")}</div>
</div>`;

/* =========================================================
   GLOSSARY, SOURCES
   ========================================================= */
const glossaryHTML = () => `${pageHead("Glossary", `${G.glossary.length} terms, in plain words`, "Type to filter. Every term is one a deal team uses in the first month.")}
<div class="wrap band" style="padding-top:28px"><input class="gsearch" id="gq" type="search" placeholder="Filter terms" aria-label="Filter terms"><div class="az" id="az"></div><dl class="gl" id="gl"></dl></div>`;
const renderGloss = () => {
  const q = $("gq").value.trim().toLowerCase();
  const list = G.glossary.slice().sort((a, b) => a[0].localeCompare(b[0])).filter(g => !q || (g[0] + " " + g[1]).toLowerCase().includes(q));
  let last = "";
  $("gl").innerHTML = list.length ? list.map(g => { const L = g[0][0].toUpperCase(), id = L !== last ? ` id="g-${L}"` : ""; last = L; return `<dt${id}>${esc(g[0])}</dt><dd>${esc(g[1])}</dd>`; }).join("") : `<dt>No match</dt><dd>Try a shorter word, or search everything with the / key.</dd>`;
  $("az").innerHTML = [...new Set(list.map(g => g[0][0].toUpperCase()))].map(L => `<a href="#glossary" data-l="${L}">${L}</a>`).join("");
};
const NUMS = [
  ["CCI deal value threshold", "Above Rs 2,000 crore, with substantial business operations in India", "Competition Act, s. 5, and Combination Regulations, 2024"],
  ["CCI small target exemption", "Target India assets up to Rs 450 crore or turnover up to Rs 1,250 crore", "Exemption Rules, 2024"],
  ["CCI review", "No completion for 150 days unless approved, with a prima facie view in 30 days", "Competition Act, ss. 6(2A) and 29"],
  ["Open offer trigger", "25% of voting rights, or control", "SAST Regulations, regs. 3(1) and 4"],
  ["Creeping acquisition", "More than 5% in a financial year by a 25% or larger holder", "SAST Regulations, reg. 3(2)"],
  ["Open offer size", "At least 26% of total shares", "SAST Regulations, reg. 7"],
  ["Acquisition finance", "Up to 75% of acquisition value, with acquirer net worth of at least Rs 500 crore", "RBI directions, effective 1 July 2026"],
  ["PAS-3", "15 days from allotment", "Companies Act, s. 39(4)"],
  ["Private placement allotment", "Within 60 days of receipt, or refund within the next 15 days", "Companies Act, s. 42(6)"],
  ["FC-GPR", "30 days from issue of shares", "FEM Reporting Regulations, 2019"],
  ["FC-TRS", "60 days from transfer or receipt of funds, whichever is earlier", "FEM Reporting Regulations, 2019"],
  ["Deferred consideration for non-residents", "Up to 25% of total consideration, within 18 months", "NDI Rules and FEMA Master Direction"],
  ["Buy-back size", "10% with board approval, 25% with special resolution, debt to equity at most 2:1", "Companies Act, s. 68"],
  ["Fast-track merger", "Members holding at least 90% of total shares, and nine-tenths in value of creditors. A 2026 bill proposes 75%", "Companies Act, s. 233"],
  ["Scheme approval", "Majority in number holding three-fourths in value of each class", "Companies Act, s. 230(6)"],
  ["Resolution plan", "66% of the committee of creditors by voting share", "IBC, s. 30(4)"]
];
const sourcesHTML = () => `${pageHead("Sources and templates", "Where to check, and what to hand in", "Primary law and regulators first, then the figures every deal lawyer should know, then working formats you can copy. Commentary is for reading, never for citing as the law.")}
<div class="wrap band" style="padding-top:28px">
 <div class="shelf">${G.shelf.map(s => `<section><h3>${esc(s.h)}</h3>${s.items.map(i => `<a class="s" href="${esc(i[2])}" target="_blank" rel="noopener"><b>${esc(i[0])}</b><span>${esc(i[1])}</span></a>`).join("")}</section>`).join("")}</div>
 <div class="sh" style="margin-top:64px"><div><div class="kick">Numbers to know</div><h2>The figures that come up on every deal</h2></div></div>
 <div class="scroll"><table><thead><tr><th>Rule</th><th>Figure</th><th>Source</th></tr></thead><tbody>${NUMS.map(n => `<tr><td style="font-weight:600">${esc(n[0])}</td><td>${esc(n[1])}</td><td class="mute">${esc(n[2])}</td></tr>`).join("")}</tbody></table></div>
 <div class="sh" style="margin-top:64px"><div><div class="kick">Templates</div><h2>Working formats</h2><p>Columns and structure only. Adapt to your firm's own format.</p></div></div>
 <div id="tpls">${G.templates.map((t, i) => `<details class="tpl"${i === 0 ? " open" : ""}><summary>${esc(t.n)} <span>${esc(t.d)}</span></summary><pre>${esc(t.body)}</pre><div class="bar2"><button class="btn ghost" type="button" data-t="${i}">Copy template</button></div></details>`).join("")}</div>
 <div class="grid2" style="margin-top:64px;align-items:start">
  <div><div class="kick">Legal tech</div><h2 style="margin:8px 0 18px">Where tools help, and where they fail</h2>${G.tech.map(t => `<div class="pa" style="grid-template-columns:minmax(0,1fr)"><b>${esc(t.n)}</b><p class="mute" style="margin:2px 0 6px">${esc(t.d)}</p><p style="margin:0;font-size:15.5px"><b style="font:600 15px var(--sans)">Good for:</b> ${esc(t.use)}</p><p style="margin:4px 0 0;font-size:15.5px"><b style="font:600 15px var(--sans);color:var(--red)">Fails when:</b> ${esc(t.risk)}</p></div>`).join("")}</div>
  <div><div class="kick">Verification</div><h2 style="margin:8px 0 18px">Before anything leaves your desk</h2><ol class="chk" style="padding-left:34px">${G.verify.map(v => `<li style="padding:6px 0">${esc(v)}</li>`).join("")}</ol></div>
 </div>
</div>`;

/* =========================================================
   FOUNDER, ABOUT
   ========================================================= */
const founderHTML = () => {
  const F = G.founder;
  return `<div class="foundband"><div class="wrap band">
  <div class="crumb" style="color:#9aa0ab"><a href="#home" style="color:#9aa0ab">GenCorpus</a> / Founder</div>
  <div class="grid2" style="align-items:start;gap:48px">
   <div><div class="kick" style="color:#ff8a98">Deed of founding</div><h1 style="margin-top:10px;color:#fff">${esc(F.name)}</h1><p style="color:#b7bbc4;font-size:19px;margin-top:12px">${esc(F.line)}</p>
    <div class="recital" style="margin-top:28px">${F.recitals.map((r, i) => `<p><b>${i ? "And whereas" : "Whereas"}</b> ${esc(r)}.</p>`).join("")}<p><b>Now therefore</b> ${esc(F.now)}</p></div>
    <span class="sig">K. Aditya</span><p class="small" style="color:#9aa0ab;margin-top:6px">Signed, sealed and published, November 2026</p></div>
   <div><div class="ledger">${F.ledger.map(l => `<div><span>${esc(l[0])}</span><div>${esc(l[1])}</div></div>`).join("")}</div>
    <h3 style="color:#fff;margin-top:34px">Things he has built</h3><div class="builds">${F.builds.map(b => `<div><b>${esc(b[0])}</b><span>${esc(b[1])}</span></div>`).join("")}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px"><a class="btn" href="https://www.linkedin.com/in/kushagrax" target="_blank" rel="noopener" style="background:#fff;color:#0b0d11;border-color:#fff">Connect on LinkedIn</a><a class="btn ghost" href="https://www.linkedin.com/company/gencorpus" target="_blank" rel="noopener" style="color:#fff;border-color:#ffffff50">Follow GenCorpus</a></div></div>
  </div></div></div>
 <div class="wrap band"><div class="kick">Why it exists</div><h2 style="margin:8px 0 26px">Three rules GenCorpus is written to</h2>
  <div class="grid3">${[["Work, not theory", "Every page starts from what a team does on a live deal: the tracker, the markup, the filing, the call."], ["Sourced and dated", "Every rule links to the Act, the regulation or the regulator. Every page says when it was checked. Drafts are marked as drafts."], ["Free, and only education", "No paywall, no services, no fees, no client work. Nothing here is advice, and nothing here solicits work for anyone."]].map((r, i) => `<div class="card"><span class="no">${pad(i + 1)}</span><h3>${r[0]}</h3><p>${r[1]}</p></div>`).join("")}</div>
 </div>`;
};
const aboutHTML = () => `${pageHead("About", "About GenCorpus, and its rules", "What this is, what it is not, how it is sourced, and how to report a mistake.")}
<div class="wrap band" style="padding-top:28px"><div class="reader" style="margin:0;max-width:760px">
 <h2>What it is</h2><p>GenCorpus is a free educational project on Indian transactional law: corporate, M&amp;A, private equity, capital markets and restructuring, explained the way a deal team works. It is written by Kushagra Aditya, a law student, and published on this site and on LinkedIn.</p>
 <h2>What it is not</h2><p>It is not legal advice and is not a substitute for advice on a specific matter. It offers no legal services and charges no fees. It does not advertise or solicit work for any advocate or firm, consistent with Rule 36 of the Bar Council of India Rules. Firm names appear only for information, in alphabetical order.</p>
 <h2>How it is sourced</h2><p>Rules link to the primary source: India Code, the Gazette, MCA, SEBI, RBI, CCI and IBBI. Commentary from firms and journals is linked as reading, not as authority. Deal summaries use only public reports, which are linked. Nothing here draws on any confidential matter.</p>
 <p>Clause texts are teaching samples written for this site. They are not precedents and must not be used in a transaction.</p>
 <h2>Dates</h2><p>Content was checked in November 2026. Law changes. Bills and draft rules are marked as such and are not law until enacted or notified.</p>
 <h2 id="corrections">Corrections</h2><p>If something is wrong, out of date or unclear, send a message to the GenCorpus page on LinkedIn with the page and the source. Corrections are made openly, with the date of the change.</p>
 <h2>Privacy</h2><p>This site has no accounts, forms or tracking. Your desk, theme and ticked checklists are kept only in your own browser.</p>
</div></div>`;

/* =========================================================
   ROUTER
   ========================================================= */
const VIEWS = {
  home: [homeHTML, initHome], map: [mapHTML, initMap], deals: [dealsHTML, initDeals], clauses: [clausesHTML, initClauses],
  tools: [toolsHTML, initTools], radar: [radarHTML, initRadar], tape: [tapeHTML], library: [libraryHTML],
  careers: [careersHTML, () => { $("v-careers").addEventListener("change", e => { if (!e.target.matches("[data-fw]")) return; const a = load("gc-fw", []); a[+e.target.dataset.fw] = e.target.checked; save("gc-fw", a); }); }],
  glossary: [glossaryHTML, () => { renderGloss(); $("gq").addEventListener("input", renderGloss); $("az").addEventListener("click", e => { const a = e.target.closest("[data-l]"); if (!a) return; e.preventDefault(); const t = $("g-" + a.dataset.l); if (t) t.scrollIntoView({behavior: reduce ? "auto" : "smooth"}); }); }],
  sources: [sourcesHTML, () => { $("tpls").addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (b) copy(G.templates[+b.dataset.t].body, G.templates[+b.dataset.t].n); }); }],
  founder: [founderHTML], about: [aboutHTML]
};
const TITLES = {home: "GenCorpus: Indian transactional law, as the deal team works it", map: "Deal map", deals: "Deal types", clauses: "Clause lab", tools: "Tools", radar: "Regulatory radar", tape: "Deal tape", library: "Library", careers: "Career", glossary: "Glossary", sources: "Sources and templates", founder: "Founder", about: "About"};
const built = {};
let pendingScroll = null;
const route = () => {
  let h = (location.hash || "#home").slice(1), view = h, art = null;
  if (h.startsWith("read-") && G.articles.some(a => "read-" + a.id === h)) { view = "read"; art = h.slice(5); }
  else if (!VIEWS[h]) view = h = "home";
  if (view === "read") { $("v-read").innerHTML = readHTML(art); document.title = G.articles.find(a => a.id === art).t + " | GenCorpus"; }
  else {
    if (!built[view]) { $("v-" + view).innerHTML = VIEWS[view][0](); if (VIEWS[view][1]) VIEWS[view][1](); if (view !== "home") reveal($("v-" + view)); built[view] = true; }
    document.title = view === "home" ? TITLES.home : TITLES[view] + " | GenCorpus";
  }
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id === "v-" + view));
  document.querySelectorAll(".nav a, .mob a").forEach(a => a.setAttribute("aria-current", a.getAttribute("href") === "#" + view ? "page" : "false"));
  document.querySelectorAll(".dd").forEach(d => { d.classList.remove("open"); d.querySelector("button").setAttribute("aria-expanded", "false"); });
  $("mob").classList.remove("on"); $("burger").setAttribute("aria-expanded", "false");
  const tgt = pendingScroll && $(pendingScroll); pendingScroll = null;
  if (tgt) setTimeout(() => tgt.scrollIntoView({block: "start"}), 20); else window.scrollTo(0, 0);
  onScroll();
};
window.addEventListener("hashchange", route);

/* ---------- nav ---------- */
document.querySelectorAll(".dd > button").forEach(b => b.addEventListener("click", e => {
  e.stopPropagation(); const d = b.parentElement, open = !d.classList.contains("open");
  document.querySelectorAll(".dd").forEach(x => { x.classList.remove("open"); x.querySelector("button").setAttribute("aria-expanded", "false"); });
  d.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
}));
document.addEventListener("click", e => {
  if (!e.target.closest(".dd")) document.querySelectorAll(".dd").forEach(x => { x.classList.remove("open"); x.querySelector("button").setAttribute("aria-expanded", "false"); });
  const sc = e.target.closest("[data-scroll]"); if (sc) { pendingScroll = sc.dataset.scroll; if (location.hash === sc.getAttribute("href")) { e.preventDefault(); route(); } }
});
$("burger").addEventListener("click", () => { const on = !$("mob").classList.contains("on"); $("mob").classList.toggle("on", on); $("burger").setAttribute("aria-expanded", on); });

/* ---------- reading progress ---------- */
const onScroll = () => {
  const r = $("v-read").classList.contains("on"), p = $("prog");
  if (!r) { p.style.width = "0"; return; }
  const h = document.documentElement.scrollHeight - innerHeight; p.style.width = (h > 0 ? 100 * scrollY / h : 0) + "%";
};
addEventListener("scroll", onScroll, {passive: true});

/* ---------- command palette ---------- */
const go = (hash, after) => () => { location.hash = hash; if (after) setTimeout(after, 40); };
const IDX = [
  ...Object.keys(TITLES).filter(k => k !== "home").map(k => ({t: TITLES[k], k: "Page", go: go("#" + k)})),
  ...G.map.map((s, i) => ({t: s.t, k: "Stage " + pad(i + 1), go: go("#map", () => setStage(i))})),
  ...G.deals.map((d, i) => ({t: d.n, k: "Deal type", go: go("#deals", () => { st.dealGroup = "All"; st.deal = i; renderDealList(); renderDeal(); })})),
  ...G.clauses.map((c, i) => ({t: c.n, k: "Clause", go: go("#clauses", () => { st.clause = i; renderClauseList(); renderClause(); })})),
  ...[["t-af", "RBI acquisition finance check"], ["t-ad", "Anti-dilution calculator"], ["t-cci", "CCI notifiability check"], ["t-sast", "Open offer trigger check"], ["t-dl", "Post-closing filing calendar"]].map(x => ({t: x[1], k: "Tool", go: go("#tools", () => $(x[0]).scrollIntoView())})),
  ...G.articles.map(a => ({t: a.t, k: "Article", go: go("#read-" + a.id)})),
  ...G.radar.map((r, i) => ({t: r.t, k: "Radar " + r.d.slice(0, 4), go: () => { pendingScroll = "r-" + i; if (location.hash === "#radar") route(); else location.hash = "#radar"; }})),
  ...G.glossary.map(g => ({t: g[0], k: "Term", d: g[1], go: go("#glossary", () => { $("gq").value = g[0]; renderGloss(); })}))
];
let kSel = 0, kRes = [];
const kRender = () => {
  const q = $("kq").value.trim().toLowerCase();
  kRes = (q ? IDX.filter(x => (x.t + " " + x.k + " " + (x.d || "")).toLowerCase().includes(q)).sort((a, b) => (b.t.toLowerCase().startsWith(q)) - (a.t.toLowerCase().startsWith(q))) : IDX.slice(0, 12)).slice(0, 40);
  kSel = Math.min(kSel, Math.max(0, kRes.length - 1));
  $("kl").innerHTML = kRes.length ? kRes.map((x, i) => `<li><button type="button" data-k="${i}" class="${i === kSel ? "act" : ""}"><span>${esc(x.t)}</span><small>${esc(x.k)}</small></button></li>`).join("") : `<li style="padding:14px" class="mute">Nothing matches. Try a shorter word.</li>`;
};
const kOpen = () => { $("k").classList.add("on"); $("kq").value = ""; kSel = 0; kRender(); $("kq").focus(); };
const kClose = () => { $("k").classList.remove("on"); };
const kGo = i => { const x = kRes[i]; if (!x) return; kClose(); x.go(); };
$("openK").addEventListener("click", kOpen);
$("kq").addEventListener("input", () => { kSel = 0; kRender(); });
$("kl").addEventListener("click", e => { const b = e.target.closest("[data-k]"); if (b) kGo(+b.dataset.k); });
$("k").addEventListener("click", e => { if (e.target.id === "k") kClose(); });
document.addEventListener("keydown", e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if ((e.key === "/" && !typing) || (e.key === "k" && (e.metaKey || e.ctrlKey))) { e.preventDefault(); kOpen(); return; }
  if (!$("k").classList.contains("on")) { if (e.key === "Escape") document.querySelectorAll(".dd").forEach(x => x.classList.remove("open")); return; }
  if (e.key === "Escape") kClose();
  else if (e.key === "ArrowDown") { e.preventDefault(); kSel = Math.min(kRes.length - 1, kSel + 1); kRender(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); kSel = Math.max(0, kSel - 1); kRender(); }
  else if (e.key === "Enter") { e.preventDefault(); kGo(kSel); }
});

/* ---------- first visit notice ---------- */
if (!load("gc-ok", false)) {
  $("consent").innerHTML = `<div style="position:fixed;left:16px;right:16px;bottom:16px;z-index:65;max-width:720px;margin:0 auto;background:var(--bg);border:1px solid var(--line);border-left:4px solid var(--red);border-radius:12px;padding:14px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;box-shadow:0 18px 40px -20px #0008"><p style="margin:0;flex:1 1 300px;font-size:15px"><b>Education only.</b> GenCorpus explains the law. It is not legal advice, offers no services and solicits no work.</p><button class="btn" type="button" id="okBtn">Understood</button></div>`;
  $("okBtn").addEventListener("click", () => { save("gc-ok", true); $("consent").innerHTML = ""; });
}

route();
}
