/* SQL for Data Science notes — shared behaviour: sidebar, credit, pager, code highlighting,
   quizzes, flashcards, tabs, sorting games and an in-browser SQL playground (sql.js / SQLite). */
(function () {
  "use strict";

  var VIDEO = "https://www.youtube.com/watch?v=nopIGY1zJE0";
  var CHAPTERS = [
    { n: 1, file: "01-introduction.html", title: "Introduction", ts: "0:00", t: 0 },
    { n: 2, file: "02-crud-app-python-mysql.html", title: "CRUD App using Python & MySQL", ts: "3:00", t: 180 },
    { n: 3, file: "03-database-theory.html", title: "Database Theory", ts: "50:00", t: 3000 },
    { n: 4, file: "04-database-keys.html", title: "Database Keys", ts: "1:23:00", t: 4980 },
    { n: 5, file: "05-types-of-sql-commands.html", title: "Types of SQL Commands", ts: "1:51:00", t: 6660 },
    { n: 6, file: "06-er-diagram.html", title: "ER Diagram", ts: "1:57:30", t: 7050 },
    { n: 7, file: "07-ddl-queries.html", title: "DDL SQL Queries", ts: "2:18:20", t: 8300 },
    { n: 8, file: "08-dml-queries.html", title: "DML SQL Queries", ts: "3:00:00", t: 10800 },
    { n: 9, file: "09-group-by.html", title: "GROUP BY Query", ts: "4:08:00", t: 14880 },
    { n: 10, file: "10-case-statement.html", title: "CASE Statement", ts: "4:42:00", t: 16920 },
    { n: 11, file: "11-sql-joins.html", title: "SQL Joins", ts: "4:48:00", t: 17280 },
    { n: 12, file: "12-subqueries.html", title: "Subquery", ts: "5:25:35", t: 19535 }
  ];
  window.SQL_CHAPTERS = CHAPTERS;
  var PRACTICE = [
    { n: 1, key: "P1", file: "practice-01-top-10-queries.html", title: "Top 10 most common SQL queries",
      video: "https://www.youtube.com/watch?v=yBKkSm2v3gg",
      vtitle: "Top 10 most common SQL queries | SQL Interview Questions For Data Science | CampusX Live 1" }
  ];
  window.SQL_PRACTICE = PRACTICE;

  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var DONE_KEY = "sql-notes-done";
  function doneSet() { return store.get(DONE_KEY) || {}; }

  var current = parseInt(document.body.getAttribute("data-chapter") || "0", 10);
  var chap = CHAPTERS.filter(function (c) { return c.n === current; })[0];
  var practiceN = parseInt(document.body.getAttribute("data-practice") || "0", 10);
  var prac = PRACTICE.filter(function (p) { return p.n === practiceN; })[0];

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------- reading progress ---------- */
  var bar = el("div", { "class": "read-progress" });
  document.body.appendChild(bar);
  window.addEventListener("scroll", function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
  }, { passive: true });

  /* ---------- sidebar ---------- */
  function renderSidebar() {
    var side = document.getElementById("sidebar");
    if (!side) return;
    var done = doneSet();
    var built = CHAPTERS.filter(function (c) { return c.file; });
    var nDone = built.filter(function (c) { return done[c.n]; }).length;
    var html = '<details' + (window.innerWidth < 900 ? "" : " open") + '><summary>Course chapters</summary><p class="course-title"><a href="index.html">SQL for Data Science</a></p><ol>';
    CHAPTERS.forEach(function (c) {
      var cls = (c.n === current ? "current " : "") + (done[c.n] ? "done " : "") + (c.file ? "" : "soon");
      var href = c.file || (VIDEO + "&t=" + c.t + "s");
      html += '<li class="' + cls.trim() + '"><a href="' + href + '"' + (c.file ? "" : ' target="_blank" rel="noopener" title="Notes coming soon; opens the video"') +
        '><span class="n"><span>' + c.n + '</span></span><span>' + c.title + (c.file ? "" : " <small>(soon)</small>") + '</span></a></li>';
    });
    html += '</ol><p class="course-title" style="margin-top:14px">Practice sessions</p><ol>';
    PRACTICE.forEach(function (p) {
      var cls = (prac === p ? "current " : "") + (done[p.key] ? "done" : "");
      html += '<li class="' + cls.trim() + '"><a href="' + p.file + '"><span class="n"><span>P' + p.n + '</span></span><span>' + p.title + "</span></a></li>";
    });
    html += '</ol><div class="bar"><i style="width:' + (100 * nDone / built.length) + '%"></i></div><p class="bar-label">' + nDone + " of " + built.length + " chapters marked done</p></details>";
    side.innerHTML = html;
  }
  renderSidebar();

  /* ---------- credit banner ---------- */
  var credit = document.getElementById("credit");
  if (credit && prac) {
    credit.className = "credit";
    credit.innerHTML = '<span class="yt" aria-hidden="true"></span><div><strong>Credit:</strong> this practice session follows ' +
      '<a href="' + prac.video + '" target="_blank" rel="noopener"><strong>' + prac.vtitle + "</strong></a>, a live class by " +
      '<strong>Nitish Singh</strong> (<a href="https://www.youtube.com/@campusx-official" target="_blank" rel="noopener">CampusX</a>).' +
      '<div class="sub">Questions are his; the sample tables here are small stand-ins for the datasets linked in the video description, so you can run every query in the browser.</div></div>';
  } else if (credit) {
    var link = VIDEO + (chap ? "&t=" + chap.t + "s" : "");
    credit.className = "credit";
    credit.innerHTML = '<span class="yt" aria-hidden="true"></span><div><strong>Credit:</strong> these notes follow ' +
      '<a href="' + VIDEO + '" target="_blank" rel="noopener"><strong>Complete SQL Course For Data Science | SQL For Data Science in 6 Hrs</strong></a> by ' +
      '<strong>Nitish Singh</strong> (<a href="https://www.youtube.com/@campusx-official" target="_blank" rel="noopener">CampusX</a>).' +
      '<div class="sub">' + (chap ? 'This chapter starts at <a href="' + link + '" target="_blank" rel="noopener">' + chap.ts + "</a> in the video. " : "") +
      "All teaching credit goes to him; these are my personal study notes, with a few extra examples of my own.</div></div>";
  }

  /* ---------- on-page TOC + numbered h2s ---------- */
  var tocBox = document.getElementById("page-toc");
  var post = document.querySelector(".post");
  if (post) {
    var h2s = post.querySelectorAll("h2");
    var items = "";
    h2s.forEach(function (h, i) {
      if (!h.id) h.id = "s" + (i + 1);
      if (!prac) h.insertAdjacentHTML("afterbegin", '<span class="h-num">' + (i + 1) + ".</span>");
      items += '<li><a href="#' + h.id + '">' + h.textContent.replace(/^\d+\./, "") + "</a></li>";
    });
    if (tocBox && h2s.length) { tocBox.className = "page-toc"; tocBox.innerHTML = "<b>On this page</b>" + (prac ? '<ol style="list-style:none;padding-left:0">' : "<ol>") + items + "</ol>"; }
  }

  /* ---------- pager + done toggle ---------- */
  var pager = document.getElementById("pager");
  if (pager && prac) {
    var ptoggle = el("label", { "class": "done-toggle" });
    ptoggle.innerHTML = '<input type="checkbox"> <span>Mark <b>Practice ' + prac.n + "</b> as done (saved in this browser)</span>";
    var pcb = ptoggle.querySelector("input");
    pcb.checked = !!doneSet()[prac.key];
    pcb.addEventListener("change", function () { var d = doneSet(); d[prac.key] = pcb.checked; store.set(DONE_KEY, d); renderSidebar(); });
    pager.parentNode.insertBefore(ptoggle, pager);
    pager.className = "pager";
    pager.innerHTML = '<a class="prev" href="12-subqueries.html"><small>← Last chapter</small>12. Subquery</a><a class="next" href="index.html"><small>Back to →</small>Course index</a>';
  }
  if (pager && chap) {
    var built2 = CHAPTERS.filter(function (c) { return c.file; });
    var idx = built2.indexOf(chap);
    var prev = built2[idx - 1], next = built2[idx + 1];
    var nextSoon = !next ? CHAPTERS[CHAPTERS.indexOf(chap) + 1] : null;
    var toggle = el("label", { "class": "done-toggle" });
    toggle.innerHTML = '<input type="checkbox"> <span>Mark <b>Chapter ' + chap.n + "</b> as done (saved in this browser)</span>";
    var cb = toggle.querySelector("input");
    cb.checked = !!doneSet()[chap.n];
    cb.addEventListener("change", function () { var d = doneSet(); d[chap.n] = cb.checked; store.set(DONE_KEY, d); renderSidebar(); });
    pager.parentNode.insertBefore(toggle, pager);
    pager.className = "pager";
    pager.innerHTML =
      (prev ? '<a class="prev" href="' + prev.file + '"><small>← Previous</small>' + prev.n + ". " + prev.title + "</a>" : '<a class="prev" href="index.html"><small>← Back</small>Course index</a>') +
      (next ? '<a class="next" href="' + next.file + '"><small>Next →</small>' + next.n + ". " + next.title + "</a>"
            : nextSoon ? '<a class="next" href="' + VIDEO + "&t=" + nextSoon.t + 's" target="_blank" rel="noopener"><small>Up next in the video (notes coming soon) →</small>' + nextSoon.n + ". " + nextSoon.title + "</a>"
            : '<a class="next" href="' + PRACTICE[0].file + '"><small>Course done! Now practise →</small>P1. ' + PRACTICE[0].title + "</a>");
  }

  /* ---------- syntax highlighting + copy ---------- */
  var SQL_KW = "SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|DATABASE|DATABASES|TABLE|TABLES|DROP|ALTER|TRUNCATE|ADD|COLUMN|MODIFY|CHANGE|RENAME|TO|AFTER|FIRST|CONSTRAINT|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|NOT|NULL|DEFAULT|CHECK|AUTO_INCREMENT|AUTOINCREMENT|IF|EXISTS|AND|OR|IN|LIKE|BETWEEN|IS|ON|CASCADE|RESTRICT|NO|ACTION|SHOW|USE|DESCRIBE|DESC|GRANT|REVOKE|COMMIT|ROLLBACK|SAVEPOINT|INT|INTEGER|VARCHAR|CHAR|TEXT|DECIMAL|FLOAT|DOUBLE|DATE|DATETIME|TIMESTAMP|BOOLEAN|BLOB|ENUM|TINYINT|BIGINT|AS|INDEX|ORDER|BY|GROUP|LIMIT|ALL|ANY|PRAGMA|CURRENT_TIMESTAMP|ENGINE|BEGIN|TRANSACTION|CASE|WHEN|THEN|ELSE|END|JOIN|INNER|LEFT|RIGHT|OUTER|HAVING|DISTINCT|ASC|OFFSET|UNSIGNED|SIGNED|CAST";
  var PY_KW = "import|from|class|def|return|try|except|else|if|elif|for|in|while|print|self|True|False|None|and|or|not|pass|as|with|is|lambda|break|continue";
  function highlight(code, lang) {
    var out = "", re;
    if (lang === "python") {
      re = new RegExp("(#[^\\n]*)|(\"\"\"[\\s\\S]*?\"\"\"|'[^'\\n]*'|\"[^\"\\n]*\")|\\b(\\d+(?:\\.\\d+)?)\\b|\\b(" + PY_KW + ")\\b|\\b([A-Za-z_]\\w*)(?=\\()", "g");
    } else {
      re = new RegExp("(--[^\\n]*|#[^\\n]*|/\\*[\\s\\S]*?\\*/)|('[^']*'|\"[^\"]*\")|\\b(\\d+(?:\\.\\d+)?)\\b|\\b(" + SQL_KW + ")\\b|\\b([A-Za-z_]\\w*)(?=\\()", "gi");
    }
    var last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      var cls = m[1] ? "com" : m[2] ? "str" : m[3] ? "num" : m[4] ? "kw" : "fn";
      out += '<span class="tk-' + cls + '">' + esc(m[0]) + "</span>";
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }
  document.querySelectorAll("pre > code[class*='lang-']").forEach(function (codeEl) {
    var lang = (codeEl.className.match(/lang-(\w+)/) || [])[1] || "sql";
    var raw = codeEl.textContent.replace(/^\n/, "").replace(/\s+$/, "");
    codeEl.innerHTML = highlight(raw, lang);
    var pre = codeEl.parentNode;
    var wrap = el("div", { "class": "code" });
    var label = pre.getAttribute("data-title") || (lang === "python" ? "Python" : lang === "bash" ? "Terminal" : "SQL");
    var head = el("div", { "class": "code-head" }, "<span>" + label + '</span><button class="copy-btn do-copy" type="button">Copy</button>');
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(head); wrap.appendChild(pre);
    if (pre.hasAttribute("data-run")) addRunner(pre, wrap, head, raw);
    head.querySelector(".do-copy").addEventListener("click", function (ev) {
      var b = ev.currentTarget;
      var done = function () { b.textContent = "Copied ✓"; setTimeout(function () { b.textContent = "Copy"; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(raw).then(done, function () {});
    });
  });

  /* ---------- "Run" buttons on code blocks: one shared DB per dataset list, per page ---------- */
  var sharedDbs = {};
  function sharedDb(key) {
    if (!sharedDbs[key]) {
      var files = key.split(/\s+/).filter(Boolean).map(function (f) { return "data/" + f + ".sql"; });
      sharedDbs[key] = Promise.all([loadSqlJs()].concat(files.map(fetchText))).then(function (r) {
        var db = new r[0].Database();
        db.run("PRAGMA foreign_keys = ON;");
        db.create_function("CEILING", function (x) { return x == null ? null : Math.ceil(x); });
        db.exec(r.slice(1).join("\n"));
        return db;
      });
    }
    return sharedDbs[key];
  }
  function runStatements(db, sql) {
    var html = "";
    splitStatements(sql).forEach(function (st) {
      st = mysqlShim(st);
      try {
        var res = db.exec(st);
        var short = st.replace(/\s+/g, " ");
        if (short.length > 70) short = short.slice(0, 67) + "…";
        if (res.length) html += renderResult(res) + '<div class="pg-msg info">' + res[res.length - 1].values.length + " row(s)</div>";
        else html += '<div class="pg-msg ok">✓ ' + esc(short) + (/^(insert|update|delete)/i.test(st) ? "  (" + db.getRowsModified() + " row(s) affected)" : "") + "</div>";
      } catch (e) {
        html += '<div class="pg-msg err">✗ ' + esc(String(e.message || e)) + "</div>";
      }
    });
    return html;
  }
  function addRunner(pre, wrap, head, raw) {
    var key = pre.getAttribute("data-run");
    var btns = document.createElement("span");
    btns.style.cssText = "display:flex;gap:6px";
    btns.innerHTML = '<button class="copy-btn" type="button" style="color:var(--ok);border-color:var(--ok)">Run ▶</button>' +
      (document.getElementById("lab") ? '<button class="copy-btn" type="button">Edit in lab</button>' : "");
    head.insertBefore(btns, head.lastChild);
    btns.appendChild(head.lastChild);
    var outBox = el("div", { "class": "playground run-out" });
    outBox.style.cssText = "padding:0 12px";
    wrap.appendChild(outBox);
    btns.children[0].addEventListener("click", function () {
      outBox.innerHTML = '<div class="pg-msg info">Running…</div>';
      sharedDb(key).then(function (db) { outBox.innerHTML = '<div class="pg-out">' + runStatements(db, raw) + "</div>"; },
        function (e) { outBox.innerHTML = '<div class="pg-msg err">' + esc(e.message) + "</div>"; });
    });
    if (btns.children.length === 3) btns.children[1].addEventListener("click", function () {
      var lab = document.getElementById("lab");
      lab.querySelector("textarea").value = raw;
      lab.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- quizzes ---------- */
  var quizzes = document.querySelectorAll(".quiz");
  var score = { right: 0, total: 0 };
  var scoreBox = document.getElementById("quiz-score");
  function updateScore() { if (scoreBox) scoreBox.textContent = "Quiz score on this page: " + score.right + " / " + quizzes.length + (score.total < quizzes.length ? " (" + (quizzes.length - score.total) + " unanswered)" : ""); }
  quizzes.forEach(function (qz, qi) {
    var ans = (qz.getAttribute("data-answer") || "").split(",").map(Number);
    var label = el("div", { "class": "q-label" }, "Check yourself · Q" + (qi + 1));
    qz.insertBefore(label, qz.firstChild);
    var opts = qz.querySelectorAll(".opt");
    opts.forEach(function (o, i) {
      o.type = "button";
      o.addEventListener("click", function () {
        if (qz.classList.contains("answered")) return;
        qz.classList.add("answered");
        var ok = ans.indexOf(i) >= 0;
        opts.forEach(function (x, j) { x.disabled = true; if (ans.indexOf(j) >= 0) x.classList.add("right"); });
        if (!ok) o.classList.add("wrong");
        score.total++; if (ok) score.right++;
        updateScore();
      });
    });
  });
  updateScore();

  /* ---------- flashcards ---------- */
  document.querySelectorAll(".flash").forEach(function (f) {
    f.setAttribute("tabindex", "0");
    var flip = function () { f.classList.toggle("flipped"); };
    f.addEventListener("click", flip);
    f.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
  });

  /* ---------- tabs ---------- */
  document.querySelectorAll(".tabs").forEach(function (t) {
    var panels = t.querySelectorAll(":scope > .tab-panel");
    var barEl = el("div", { "class": "tab-bar", role: "tablist" });
    panels.forEach(function (p, i) {
      var b = el("button", { type: "button", role: "tab" }, p.getAttribute("data-tab"));
      b.addEventListener("click", function () {
        panels.forEach(function (x) { x.classList.remove("on"); });
        barEl.querySelectorAll("button").forEach(function (x) { x.classList.remove("on"); });
        p.classList.add("on"); b.classList.add("on");
      });
      barEl.appendChild(b);
      if (i === 0) { p.classList.add("on"); b.classList.add("on"); }
    });
    t.insertBefore(barEl, t.firstChild);
  });

  /* ---------- sorting games (tap an item, then tap a bin) ---------- */
  document.querySelectorAll(".sorter").forEach(function (s) {
    var bank = s.querySelector(".bank");
    var bins = s.querySelectorAll(".bin");
    var result = s.querySelector(".verdict");
    var items = Array.prototype.slice.call(bank.querySelectorAll(".item"));
    items.sort(function () { return Math.random() - 0.5; }).forEach(function (i) { bank.appendChild(i); });
    var sel = null;
    function arm(on) { bins.forEach(function (b) { b.classList.toggle("armed", on); }); }
    items.forEach(function (it) {
      it.addEventListener("click", function (e) {
        e.stopPropagation();
        if (it.classList.contains("right")) return;
        if (sel) sel.classList.remove("sel");
        sel = it === sel ? null : it;
        if (sel) sel.classList.add("sel");
        arm(!!sel);
      });
    });
    bins.forEach(function (b) {
      b.addEventListener("click", function () {
        if (!sel) return;
        var ok = sel.getAttribute("data-bin") === b.getAttribute("data-bin");
        sel.classList.remove("sel", "wrong");
        if (ok) { sel.classList.add("right"); b.appendChild(sel); }
        else { var bad = sel; bad.classList.add("wrong"); setTimeout(function () { bad.classList.remove("wrong"); }, 700); }
        sel = null; arm(false);
        var left = items.filter(function (i) { return !i.classList.contains("right"); }).length;
        if (result) result.innerHTML = left ? left + " left to place." : '<span class="tag yes">All sorted!</span> ' + (s.getAttribute("data-done") || "Nice work.");
      });
    });
    var reset = s.querySelector("[data-reset]");
    if (reset) reset.addEventListener("click", function () {
      items.forEach(function (i) { i.classList.remove("right", "wrong", "sel"); bank.appendChild(i); });
      if (result) result.textContent = items.length + " left to place.";
    });
    if (result) result.textContent = items.length + " left to place.";
  });

  /* ---------- SQL playground (SQLite via sql.js) ---------- */
  var sqlPromise = null;
  function loadSqlJs() {
    if (sqlPromise) return sqlPromise;
    sqlPromise = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js";
      s.onload = function () {
        window.initSqlJs({ locateFile: function (f) { return "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/" + f; } }).then(resolve, reject);
      };
      s.onerror = function () { reject(new Error("Could not load the SQL engine (sql.js) from the CDN.")); };
      document.head.appendChild(s);
    });
    return sqlPromise;
  }
  function renderResult(res) {
    if (!res.length) return "";
    return res.map(function (r) {
      var h = '<div class="table-wrap"><table class="mini-table"><thead><tr>' + r.columns.map(function (c) { return "<th>" + esc(String(c)) + "</th>"; }).join("") + "</tr></thead><tbody>";
      r.values.forEach(function (row) { h += "<tr>" + row.map(function (v) { return "<td>" + (v === null ? "<i>NULL</i>" : esc(String(v))) + "</td>"; }).join("") + "</tr>"; });
      return h + "</tbody></table></div>";
    }).join("");
  }
  function splitStatements(sql) {
    var out = [], cur = "", q = null;
    for (var i = 0; i < sql.length; i++) {
      var ch = sql[i];
      if (q) { cur += ch; if (ch === q) q = null; continue; }
      if (ch === "'" || ch === '"') { q = ch; cur += ch; continue; }
      if (ch === "-" && sql[i + 1] === "-") { var nl = sql.indexOf("\n", i); if (nl < 0) nl = sql.length; i = nl; cur += "\n"; continue; }
      if (ch === ";") { if (cur.trim()) out.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  /* translate the few MySQL-only bits used in these notes into SQLite */
  function mysqlShim(st) {
    var alt = st.match(/^\s*ALTER\s+TABLE\s+(\w+)\s+([\s\S]*)$/i);
    if (alt) {
      if (/^MODIFY\b/i.test(alt[2].trim())) return "SELECT 'MODIFY COLUMN skipped: SQLite has no MODIFY, and its columns are flexibly typed anyway' AS note";
      var parts = alt[2].split(/,\s*(?=(?:ADD|DROP)\b)/i);
      return parts.map(function (part) {
        // MySQL gives a new NOT NULL column an implicit default ('' / 0); SQLite needs it spelled out
        if (/^\s*ADD\b/i.test(part) && /NOT\s+NULL/i.test(part) && !/DEFAULT/i.test(part)) part = part.replace(/NOT\s+NULL/i, "NOT NULL DEFAULT ''");
        return "ALTER TABLE " + alt[1] + " " + part.trim();
      }).join(";\n");
    }
    return st
      .replace(/\bINT(?:EGER)?\s+PRIMARY\s+KEY\s+AUTO_INCREMENT\b/gi, "INTEGER PRIMARY KEY AUTOINCREMENT")
      .replace(/\bAUTO_INCREMENT\b/gi, "")
      .replace(/^\s*TRUNCATE\s+TABLE\s+(\w+)/i, "DELETE FROM $1")
      .replace(/^\s*SHOW\s+TABLES\s*$/i, "SELECT name AS tables FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
      .replace(/^\s*(?:DESCRIBE|DESC)\s+(\w+)\s*$/i, "SELECT name AS Field, type AS Type, CASE \"notnull\" WHEN 1 THEN 'NO' ELSE 'YES' END AS \"Null\", CASE pk WHEN 0 THEN '' ELSE 'PRI' END AS \"Key\", dflt_value AS \"Default\" FROM pragma_table_info('$1')");
  }
  var textCache = {};
  function fetchText(url) {
    if (!textCache[url]) textCache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error("Could not load " + url); return r.text(); });
    return textCache[url];
  }
  window.SQLNotes = { loadSqlJs: loadSqlJs, renderResult: renderResult, esc: esc, highlight: highlight, sharedDb: sharedDb, runStatements: runStatements };
  document.querySelectorAll(".playground").forEach(function (pg) {
    var ta = pg.querySelector("textarea");
    if (!ta) return;   // result-only boxes (code-block runners, widgets) share the styling but aren't editors
    var out = pg.querySelector(".pg-out");
    var presetSel = pg.querySelector("select");
    var setupId = pg.getAttribute("data-setup");
    var setupSrc = (pg.getAttribute("data-setup-src") || "").split(/\s+/).filter(Boolean);
    var db = null, shim = pg.hasAttribute("data-mysql");
    function getSetup() {
      var inline = setupId ? document.getElementById(setupId).textContent : "";
      return Promise.all(setupSrc.map(fetchText)).then(function (parts) { return parts.concat([inline]).join("\n"); });
    }
    function fresh(SQL, setupSql) {
      db = new SQL.Database();
      db.run("PRAGMA foreign_keys = ON;");
      // MySQL names SQLite lacks
      db.create_function("CEILING", function (x) { return x == null ? null : Math.ceil(x); });
      if (setupSql) db.exec(setupSql);
    }
    function ready() { return Promise.all([loadSqlJs(), getSetup()]).then(function (r) { if (!db) fresh(r[0], r[1]); return r; }); }
    function run() {
      out.innerHTML = '<div class="pg-msg info">Loading the SQL engine…</div>';
      ready().then(function () {
        var html = "";
        splitStatements(ta.value).forEach(function (st) {
          if (shim) st = mysqlShim(st);
          try {
            var res = db.exec(st);
            var short = st.replace(/\s+/g, " ");
            if (short.length > 70) short = short.slice(0, 67) + "…";
            html += res.length ? renderResult(res) : '<div class="pg-msg ok">✓ ' + esc(short) + (db.getRowsModified() && /^(insert|update|delete)/i.test(st) ? "  (" + db.getRowsModified() + " row(s) affected)" : "") + "</div>";
          } catch (e) {
            html += '<div class="pg-msg err">✗ ' + esc(String(e.message || e)) + "\n   in: " + esc(st.replace(/\s+/g, " ").slice(0, 90)) + "</div>";
          }
        });
        out.innerHTML = html || '<div class="pg-msg info">Nothing to run.</div>';
      }, function (err) { out.innerHTML = '<div class="pg-msg err">' + esc(err.message) + "</div>"; });
    }
    pg.querySelector("[data-run]").addEventListener("click", run);
    ta.addEventListener("keydown", function (e) { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); run(); } });
    var resetBtn = pg.querySelector("[data-reset-db]");
    if (resetBtn) resetBtn.addEventListener("click", function () {
      Promise.all([loadSqlJs(), getSetup()]).then(function (r) { fresh(r[0], r[1]); out.innerHTML = '<div class="pg-msg info">Database reset to its starting state.</div>'; });
    });
    if (presetSel) presetSel.addEventListener("change", function () {
      var t = document.getElementById(presetSel.value);
      if (t) ta.value = t.textContent.replace(/^\n/, "");
    });
  });
})();
