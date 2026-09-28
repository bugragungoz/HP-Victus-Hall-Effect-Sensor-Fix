/* HP Victus 16 Hall sensor guide - progressive enhancement only.
   Every page stays fully readable without this script; nothing here changes URLs. */
(function () {
  "use strict";

  var body = document.body;
  var root = document.documentElement;
  var lang = body.getAttribute("data-lang") || "en";
  var L = {
    fig: body.getAttribute("data-fig") || "Figure",
    anchor: body.getAttribute("data-anchor") || "Link to this section",
    zoom: body.getAttribute("data-zoom") || ""
  };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* ---------- theme toggle ---------- */
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- language menu: close on outside click / Escape ---------- */
  var menu = document.querySelector(".lang-menu");
  if (menu) {
    document.addEventListener("click", function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") menu.open = false; });
  }

  var doc = document.querySelector("main.doc");
  if (!doc) return;
  var isGuide = body.classList.contains("is-guide");

  /* ---------- notice box: title block ... first <hr> ---------- */
  if (isGuide) {
    var first = doc.firstElementChild;
    if (first && first.querySelector("h1")) {
      var n = first.nextElementSibling, items = [], hr = null;
      while (n) { if (n.tagName === "HR") { hr = n; break; } items.push(n); n = n.nextElementSibling; }
      if (hr && items.length) {
        var box = document.createElement("section");
        box.className = "notice";
        doc.insertBefore(box, items[0]);
        items.forEach(function (el) { box.appendChild(el); });
      }
    }
  }

  /* ---------- numbered figures; caption paragraph (ending with ":") stays above ---------- */
  var figNo = 0;
  each(doc.querySelectorAll("p"), function (p) {
    var imgs = p.querySelectorAll("img");
    if (imgs.length !== 1 || p.textContent.trim() !== "") return;
    var img = imgs[0];
    var fig = document.createElement("figure");
    var cap = document.createElement("figcaption");
    var num = document.createElement("span");
    fig.className = "shot";
    figNo += 1;
    num.className = "fig-no";
    num.textContent = L.fig + " " + figNo;
    cap.appendChild(num);
    var prev = p.previousElementSibling;
    if (prev && prev.tagName === "P" && !prev.querySelector("img")) {
      var txt = prev.textContent.trim();
      if (/:$/.test(txt) && txt.length < 260) {
        var span = document.createElement("span");
        while (prev.firstChild) span.appendChild(prev.firstChild);
        cap.appendChild(span);
        prev.parentNode.removeChild(prev);
      }
    }
    p.parentNode.insertBefore(fig, p);
    fig.appendChild(cap);
    fig.appendChild(img);
    p.parentNode.removeChild(p);
    if (L.zoom) img.setAttribute("title", L.zoom);
  });

  /* ---------- lightbox ---------- */
  var lb = document.querySelector("dialog.lightbox");
  if (lb && typeof lb.showModal === "function") {
    var big = lb.querySelector("img");
    doc.addEventListener("click", function (e) {
      var t = e.target;
      if (t.tagName === "IMG" && t.closest("figure.shot")) {
        big.src = t.currentSrc || t.src;
        big.alt = t.alt || "";
        lb.showModal();
      }
    });
    lb.addEventListener("click", function () { lb.close(); });
  }

  /* ---------- heading anchors (kramdown ids are left untouched) ---------- */
  each(doc.querySelectorAll("h2[id], h3[id]"), function (h) {
    if (isGuide && h.tagName === "H2" && !/^\d/.test(h.textContent.trim())) { h.classList.add("signature"); return; }
    var a = document.createElement("a");
    a.className = "anchor";
    a.href = "#" + h.id;
    a.setAttribute("aria-label", L.anchor);
    a.textContent = "#";
    h.appendChild(a);
  });

  /* ---------- table of contents + scroll tracking ---------- */
  if (!isGuide) return;
  var toc = document.querySelector(".toc");
  var list = toc && toc.querySelector("ol");
  if (!list) return;
  var heads = Array.prototype.filter.call(doc.querySelectorAll("h2[id]"), function (h) { return !h.classList.contains("signature"); });
  if (!heads.length) return;
  var links = {};
  heads.forEach(function (h) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var clone = h.cloneNode(true);
    var an = clone.querySelector(".anchor");
    if (an) an.parentNode.removeChild(an);
    a.href = "#" + h.id;
    a.textContent = clone.textContent.trim();
    li.appendChild(a);
    list.appendChild(li);
    links[h.id] = li;
  });
  toc.hidden = false;
  var wide = window.matchMedia("(min-width: 1100px)");
  var syncOpen = function () { if (wide.matches) toc.open = true; };
  syncOpen();
  if (wide.addEventListener) wide.addEventListener("change", syncOpen);
  list.addEventListener("click", function () { if (!wide.matches) toc.open = false; });

  var current = null, ticking = false;
  var spy = function () {
    ticking = false;
    var line = window.innerHeight * 0.3, active = heads[0];
    for (var k = 0; k < heads.length; k++) {
      if (heads[k].getBoundingClientRect().top <= line) active = heads[k]; else break;
    }
    var li = links[active.id];
    if (li !== current) {
      if (current) current.classList.remove("is-active");
      current = li;
      current.classList.add("is-active");
    }
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; window.requestAnimationFrame(spy); } }, { passive: true });
  spy();
})();
