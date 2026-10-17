/* Nexara — interacciones del sitio (JS plano, sin dependencias) */
(function () {
  "use strict";

  var DATA = window.IAS;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Estado ---------- */
  var state = { region: "ar", serviceId: DATA.servicios[0].id, rubro: "Todos" };

  function esVE() { return state.region === "ve"; }
  function pick(ar, ve) { return esVE() && ve ? ve : ar; }

  /* ---------- WhatsApp y mail ---------- */
  function waLink(text) {
    return "https://wa.me/" + DATA.contacto.whatsapp + "?text=" + encodeURIComponent(text);
  }
  function defaultMessage() {
    return esVE()
      ? "Hola Ronald, vi tu web de Nexara. Te escribo desde Venezuela y quiero consultar por un proyecto."
      : "Hola Ronald, vi tu web de Nexara y quiero consultar por un proyecto.";
  }
  function refreshWaLinks() {
    $$("[data-wa]").forEach(function (a) {
      a.href = waLink(defaultMessage());
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- Región (Argentina / Venezuela) ---------- */
  function setRegion(region) {
    state.region = region === "ve" ? "ve" : "ar";
    document.body.dataset.region = state.region;
    document.documentElement.lang = esVE() ? "es-VE" : "es-AR";
    refreshWaLinks();
    renderServices();
    renderDemoDays();
    renderAccordion();
    var dlg = $("#project-dialog");
    if (dlg.open) dlg.close();
  }

  /* ---------- Servicios ---------- */
  function renderServices() {
    var tabs = $("#service-tabs");
    tabs.innerHTML = "";
    DATA.servicios.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.id = "tab-" + s.id;
      b.setAttribute("aria-controls", "service-panel");
      b.setAttribute("aria-selected", String(s.id === state.serviceId));
      b.tabIndex = s.id === state.serviceId ? 0 : -1;
      b.textContent = pick(s.titulo, s.tituloVE);
      b.addEventListener("click", function () { state.serviceId = s.id; renderServices(); });
      b.addEventListener("keydown", function (e) {
        var i = DATA.servicios.indexOf(s);
        var next = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") next = DATA.servicios[(i + 1) % DATA.servicios.length];
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = DATA.servicios[(i - 1 + DATA.servicios.length) % DATA.servicios.length];
        if (next) {
          e.preventDefault();
          state.serviceId = next.id;
          renderServices();
          $("#tab-" + next.id).focus();
        }
      });
      tabs.appendChild(b);
    });

    var s = DATA.servicios.filter(function (x) { return x.id === state.serviceId; })[0];
    var panel = $("#service-panel");
    panel.setAttribute("aria-labelledby", "tab-" + s.id);
    panel.innerHTML =
      "<h3></h3><p class='s-resumen'></p><p class='s-para'></p><ul></ul>" +
      "<a class='btn btn-wa' target='_blank' rel='noopener'></a>";
    $("h3", panel).textContent = pick(s.titulo, s.tituloVE);
    $(".s-resumen", panel).textContent = pick(s.resumen, s.resumenVE);
    $(".s-para", panel).textContent = "Ideal para: " + pick(s.para, s.paraVE).replace(/^./, function (c) { return c.toLowerCase(); });
    var ul = $("ul", panel);
    s.incluye.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    var cta = $("a.btn", panel);
    cta.textContent = esVE() ? "Quiero cotizar este servicio" : "Quiero consultar por este servicio";
    cta.href = waLink("Hola Ronald, me interesa «" + pick(s.titulo, s.tituloVE) + "». ¿Podemos conversar?");
    renderServiceList();
  }

  /* Celular: tarjetas grandes de servicios que avanzan solas en horizontal.
     Se detienen para siempre cuando la persona toca o desliza (ya tomó el control). */
  var svc = { idx: 0, stopped: false, visible: false };
  var svcAuto = window.matchMedia("(max-width: 899px) and (prefers-reduced-motion: no-preference)");

  function renderServiceList() {
    var ul = $("#service-list");
    var dots = $("#service-dots");
    ul.innerHTML = "";
    dots.innerHTML = "";
    DATA.servicios.forEach(function (s, i) {
      var titulo = pick(s.titulo, s.tituloVE);
      var li = document.createElement("li");
      li.innerHTML =
        "<a class='service-row' target='_blank' rel='noopener'>" +
          "<span class='sr-num' aria-hidden='true'></span>" +
          "<span class='sr-text'><strong></strong><span></span></span>" +
          "<span class='sr-cta'>Consultar por WhatsApp" +
            "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M5 12h14m-6-6 6 6-6 6'/></svg></span>" +
        "</a>";
      $(".sr-num", li).textContent = (i < 9 ? "0" : "") + (i + 1);
      $("strong", li).textContent = titulo;
      $(".sr-text span", li).textContent = pick(s.corto || s.resumen, s.cortoVE || s.corto);
      var a = $("a", li);
      a.href = waLink("Hola Ronald, me interesa «" + titulo + "». ¿Podemos conversar?");
      a.setAttribute("aria-label", titulo + ": consultar por WhatsApp");
      ul.appendChild(li);

      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ver " + titulo);
      b.innerHTML = "<span></span>";
      b.addEventListener("click", function () { svc.stopped = true; svcGo(i); });
      dots.appendChild(b);
    });
    svcMark(svc.idx);
  }

  function svcItems() { return $$("#service-list li"); }

  function svcMark(i) {
    svc.idx = i;
    $$("#service-dots button").forEach(function (b, j) {
      if (j === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
    });
  }

  function svcGo(i) {
    var track = $("#service-list"), items = svcItems();
    if (!items.length) return;
    i = (i + items.length) % items.length;
    var pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: items[i].offsetLeft - track.offsetLeft - pad, behavior: "smooth" });
    svcMark(i);
  }

  function initServiceCarousel() {
    var track = $("#service-list");
    function stop() { svc.stopped = true; }
    track.addEventListener("pointerdown", stop);
    track.addEventListener("touchstart", stop, { passive: true });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { svc.visible = en[0].isIntersecting; }, { threshold: 0.5 }).observe(track);
      // Al deslizar con el dedo, marcar la tarjeta que quedó a la vista.
      var cardIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) svcMark(svcItems().indexOf(e.target)); });
      }, { root: track, threshold: 0.6 });
      var watch = function () { cardIO.disconnect(); svcItems().forEach(function (li) { cardIO.observe(li); }); };
      new MutationObserver(watch).observe(track, { childList: true });
      watch();
    }
    setInterval(function () {
      if (svc.stopped || !svc.visible || !svcAuto.matches || document.hidden) return;
      svcGo(svc.idx + 1);
    }, 4500);
  }

  /* ---------- Proyectos ---------- */
  var MOCKS = {
    landing: function () {
      return "<div class='mk mk-landing'><b></b><s></s><u></u><p><i></i><i></i><i></i></p></div>";
    }
  };

  function shotHTML(p) {
    if (p.imagen) {
      return "<div class='shot shot-img' aria-hidden='true'>" +
        "<div class='shot-bar'><i></i><i></i><i></i></div>" +
        "<img src='" + p.imagen + "' alt='' width='1080' height='675' loading='lazy' decoding='async'></div>";
    }
    var mk = (MOCKS[p.variante] || MOCKS.landing)();
    return "<div class='shot' style='--c:" + p.color + "' aria-hidden='true'>" +
      "<div class='shot-bar'><i></i><i></i><i></i></div>" + mk + "</div>";
  }

  function tagChips(p) {
    return "<span class='chip'>" + p.rubro + "</span>" +
      (p.cliente ? "<span class='chip chip-client'>Entregado a cliente</span>"
                 : "<span class='chip chip-own'>Proyecto propio de Nexara</span>");
  }

  function renderFilters() {
    var box = $("#filters");
    box.innerHTML = "";
    ["Todos"].concat(DATA.rubros).forEach(function (r) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = r;
      b.setAttribute("aria-pressed", String(r === state.rubro));
      b.addEventListener("click", function () { state.rubro = r; renderFilters(); renderProjects(); });
      box.appendChild(b);
    });
  }

  function renderProjects() {
    var grid = $("#project-grid");
    grid.innerHTML = "";
    DATA.proyectos
      .filter(function (p) { return state.rubro === "Todos" || p.rubro === state.rubro; })
      .forEach(function (p) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "project-card";
        card.innerHTML = shotHTML(p) +
          "<h3></h3><p class='card-desc'></p><div class='card-meta'>" + tagChips(p) + "</div>";
        $("h3", card).textContent = p.titulo;
        $(".card-desc", card).textContent = p.resumen;
        card.addEventListener("click", function () { openProject(p); });
        grid.appendChild(card);
      });
    reveal($$(".project-card", grid));
  }

  function renderProjectNames() {
    var ul = $("#project-names");
    ul.innerHTML = "";
    DATA.proyectos.forEach(function (p) {
      var li = document.createElement("li");
      li.innerHTML = "<span class='chip'></span><span class='pn-title'></span>";
      $(".chip", li).textContent = p.rubro;
      $(".pn-title", li).textContent = p.titulo;
      ul.appendChild(li);
    });
  }

  function openProject(p) {
    var dlg = $("#project-dialog");
    var body = $("#dialog-body");
    body.innerHTML =
      "<button class='dialog-close' type='button' aria-label='Cerrar'>×</button>" +
      "<h3 id='dialog-title'></h3><div class='card-meta'>" + tagChips(p) + "</div>" +
      "<h4>El problema</h4><p class='d-problema'></p>" +
      "<h4>Lo que hicimos</h4><p class='d-solucion'></p>" +
      "<h4>Qué incluye</h4><ul class='d-funciones'></ul>" +
      "<h4>Hecho con</h4><div class='card-meta d-stack' style='margin:0'></div>" +
      "<a class='btn btn-wa' target='_blank' rel='noopener'></a>";
    $("#dialog-title", body).textContent = p.titulo;
    $(".d-problema", body).textContent = p.problema;
    $(".d-solucion", body).textContent = p.solucion;
    p.funciones.forEach(function (f) {
      var li = document.createElement("li"); li.textContent = f; $(".d-funciones", body).appendChild(li);
    });
    p.stack.forEach(function (t) {
      var c = document.createElement("span"); c.className = "chip"; c.textContent = t; $(".d-stack", body).appendChild(c);
    });
    var cta = $("a.btn", body);
    cta.textContent = esVE() ? "Quiero algo así para mi negocio" : "Quiero algo así para mi negocio";
    cta.href = waLink("Hola Ronald, vi el proyecto «" + p.titulo + "» en tu web y quiero algo parecido para mi negocio.");
    $(".dialog-close", body).addEventListener("click", function () { dlg.close(); });
    dlg.showModal();
  }

  /* ---------- Demo del turnero ---------- */
  var SLOTS = ["09:00", "09:30", "10:30", "11:00", "15:00", "15:30", "16:30", "17:00"];
  var demo = { days: [], dayIndex: 0, slot: null };

  function nextWorkdays(n) {
    var out = [], d = new Date();
    d.setHours(12, 0, 0, 0);
    while (out.length < n) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
    }
    return out;
  }
  function isBusy(dayIdx, slotIdx) { return (dayIdx * 3 + slotIdx * 5) % 4 === 0; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function renderDemoDays() {
    if (!demo.days.length) demo.days = nextWorkdays(5);
    var locale = esVE() ? "es-VE" : "es-AR";
    var box = $("#demo-days");
    box.innerHTML = "";
    demo.days.forEach(function (d, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", String(i === demo.dayIndex));
      b.innerHTML = "<span></span><strong></strong>";
      $("span", b).textContent = cap(d.toLocaleDateString(locale, { weekday: "short" }).replace(".", ""));
      $("strong", b).textContent = d.getDate();
      b.addEventListener("click", function () { demo.dayIndex = i; demo.slot = null; renderDemoDays(); });
      box.appendChild(b);
    });
    renderDemoSlots();
    $("#demo-confirm").disabled = demo.slot === null;
    $("#demo-confirm").textContent = esVE() ? "Reservar cita" : "Reservar turno";
    if (demo.slot === null) $("#demo-result").innerHTML = "";
  }

  function renderDemoSlots() {
    var box = $("#demo-slots");
    box.innerHTML = "";
    SLOTS.forEach(function (t, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = t;
      var busy = isBusy(demo.dayIndex, i);
      b.disabled = busy;
      if (busy) b.setAttribute("aria-label", t + ", no disponible");
      b.setAttribute("aria-pressed", String(demo.slot === i));
      b.addEventListener("click", function () {
        demo.slot = i;
        renderDemoSlots();
        $("#demo-confirm").disabled = false;
        $("#demo-result").innerHTML = "";
      });
      box.appendChild(b);
    });
  }

  function confirmDemo() {
    if (demo.slot === null) return;
    var locale = esVE() ? "es-VE" : "es-AR";
    var d = demo.days[demo.dayIndex];
    var dia = d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
    var seña = esVE()
      ? "Para confirmarla, registra tu pago por Pago Móvil o Zelle."
      : "Para confirmarlo, abonás la seña con Mercado Pago.";
    var res = $("#demo-result");
    res.innerHTML = "<div class='bubble'><b>WhatsApp · Consultorio de ejemplo</b><span></span></div>";
    $("span", res).textContent =
      (esVE() ? "Tu cita quedó reservada: " : "Tu turno quedó reservado: ") + dia + ", " + SLOTS[demo.slot] + " h. " +
      seña + (esVE() ? " Te enviaremos un recordatorio 24 h antes." : " Te enviamos un recordatorio 24 h antes.");
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var revealIO = null;

  function reveal(els) {
    els.forEach(function (el, i) {
      if (!revealIO) return;
      el.classList.add("reveal");
      el.style.setProperty("--d", (i % 6) * 90 + "ms");
      revealIO.observe(el);
    });
  }

  function initReveal() {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    [".section-head", ".services > *", ".filters",
     ".steps li", ".why-grid article", ".faq details", ".footer-grid > *"]
      .forEach(function (sel) { reveal($$(sel)); });
  }

  /* ---------- Navegación: barra de progreso y sección activa en el menú ---------- */
  function initNav() {
    var header = $(".site-header");
    var bar = $(".scroll-progress span");
    var links = $$(".main-nav a");
    var targets = links.map(function (a) { return $(a.getAttribute("href")); });
    var ticking = false;
    var lastCurrent = -1;

    function update() {
      ticking = false;
      var top = header.offsetHeight;
      document.documentElement.style.setProperty("--header-h", top + "px");
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
      var current = -1;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top - top - 120 <= 0) current = i; });
      links.forEach(function (a, i) {
        if (i === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      // Celular: correr el menú para que se vea el link de la sección actual.
      if (current !== lastCurrent) {
        lastCurrent = current;
        var nav = $(".main-nav");
        if (current > -1 && nav.scrollWidth > nav.clientWidth) {
          nav.scrollTo({ left: Math.max(0, links[current].offsetLeft - nav.offsetLeft - 8), behavior: "smooth" });
        }
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- Acordeón del inicio ----------
     Escritorio: paneles lado a lado; el abierto avanza solo cada 6 s (lo marca la línea de progreso,
     que es una animación CSS: al terminar, pasa al siguiente). Se pausa con el mouse encima, con foco
     de teclado adentro, fuera de pantalla o con el botón de pausa.
     Celular: menú desplegable vertical (se abre y cierra tocando cada fila), sin pase automático.
     "Reducir movimiento": sin pase automático. */
  var ACC_GAP = 12;
  var accIndex = 0;
  var accAuto = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
  var accMobile = window.matchMedia("(max-width: 899px)");
  var accTouched = false; // en celular: true cuando la persona ya abrió o cerró alguna fila

  function byId(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }

  function renderAccordion() {
    var box = $("#acc");
    var ctrl = $(".acc-intro .acc-ctrl", box).outerHTML;
    $$(".acc-panel[data-gen]", box).forEach(function (p) { box.removeChild(p); });

    (DATA.destacados || []).forEach(function (d, k) {
      var s = byId(DATA.servicios, d.servicio);
      var p = byId(DATA.proyectos, d.proyecto);
      if (!s || !p) return;
      var i = k + 1;
      var panel = document.createElement("article");
      panel.className = "acc-panel acc-service";
      panel.setAttribute("data-gen", "");
      panel.style.setProperty("--c", p.color);
      panel.innerHTML =
        (p.imagen ? "<img class='acc-bg' src='" + p.imagen + "' alt='' loading='lazy' decoding='async'>" : "") +
        "<button class='acc-tab' type='button' id='acc-t" + i + "' aria-controls='acc-c" + i + "' aria-expanded='false'>" +
          "<span class='acc-dot' aria-hidden='true'></span><span class='acc-label'></span><span class='acc-plus' aria-hidden='true'></span>" +
        "</button>" +
        "<div class='acc-content' id='acc-c" + i + "' role='region' aria-labelledby='acc-t" + i + "'>" +
          "<div class='acc-main'>" +
            "<h2></h2><p class='acc-text'></p>" +
            "<button class='acc-link' type='button'><span></span><svg viewBox='0 0 24 24' aria-hidden='true'><path d='M7 17 17 7M8 7h9v9'/></svg></button>" +
          "</div>" +
          "<div class='acc-mobile'><p class='acc-short'></p><ul class='acc-points'></ul></div>" +
          "<div class='acc-foot'>" +
            "<div class='acc-progress' aria-hidden='true'><span></span></div>" +
            "<h3>Incluye</h3><ul></ul>" +
          "</div>" + ctrl +
        "</div>";
      $(".acc-label", panel).textContent = pick(d.etiqueta, d.etiquetaVE);
      $("h2", panel).textContent = pick(s.titulo, s.tituloVE);
      $(".acc-text", panel).textContent = pick(s.resumen, s.resumenVE);
      $(".acc-link span", panel).textContent = "Ver proyecto: " + p.titulo;
      $(".acc-link", panel).addEventListener("click", function () { openProject(p); });
      $(".acc-short", panel).textContent = pick(s.corto || s.resumen, s.cortoVE || s.corto);
      (d.puntos || []).forEach(function (pt) {
        var li = document.createElement("li"); li.textContent = pt; $(".acc-points", panel).appendChild(li);
      });
      var ul = $(".acc-foot ul", panel);
      s.incluye.slice(0, 4).forEach(function (item) {
        var li = document.createElement("li"); li.textContent = item; ul.appendChild(li);
      });
      box.appendChild(panel);
    });
    accOpen(accIndex);
    accMobileInicial();
    accLayout();
  }

  // Celular: al entrar, todas las filas cerradas (hasta que la persona toque alguna).
  function accMobileInicial() {
    if (!accMobile.matches || accTouched) return;
    accPanels().forEach(function (p) {
      p.classList.remove("is-open");
      $(".acc-tab", p).setAttribute("aria-expanded", "false");
    });
  }

  function accPanels() { return $$("#acc .acc-panel"); }

  function accOpen(i, focusTab) {
    var panels = accPanels();
    accIndex = (i + panels.length) % panels.length;
    panels.forEach(function (p, j) {
      var on = j === accIndex;
      p.classList.toggle("is-open", on);
      $(".acc-tab", p).setAttribute("aria-expanded", String(on));
    });
    if (focusTab) $(".acc-tab", panels[accIndex]).focus({ preventScroll: true });
  }

  function accLayout() {
    var box = $("#acc");
    var n = accPanels().length;
    var strip = window.innerWidth < 1300 ? 80 : 96;
    box.style.setProperty("--strip", strip + "px");
    box.style.setProperty("--open-w", Math.max(0, box.clientWidth - (n - 1) * (strip + ACC_GAP)) + "px");
    box.parentNode.classList.toggle("no-auto", !accAuto.matches);
  }

  // Celular: si al abrir una fila la de arriba se cerró y la página "saltó", volver a mostrar la fila tocada.
  function accKeepInView(panel) {
    requestAnimationFrame(function () {
      var top = panel.getBoundingClientRect().top;
      var headerH = $(".site-header").offsetHeight;
      if (top < headerH + 8) window.scrollBy(0, top - headerH - 8);
    });
  }

  function accSetPaused(paused) {
    var box = $("#acc");
    box.parentNode.classList.toggle("is-paused", paused);
    $$(".acc-pause", box).forEach(function (b) {
      b.setAttribute("aria-pressed", String(paused));
      b.setAttribute("aria-label", paused ? "Reanudar el pase automático" : "Pausar el pase automático");
    });
  }

  function initAccordion() {
    var box = $("#acc");
    var wrap = box.parentNode;
    box.style.setProperty("--gap", ACC_GAP + "px");

    box.addEventListener("click", function (e) {
      var t = e.target.closest("button");
      if (!t || !box.contains(t)) return;
      var panels = accPanels();
      if (t.classList.contains("acc-tab")) {
        var panel = t.closest(".acc-panel");
        if (accMobile.matches) accTouched = true;
        if (accMobile.matches && panel.classList.contains("is-open")) {
          panel.classList.remove("is-open");
          t.setAttribute("aria-expanded", "false");
          return;
        }
        accOpen(panels.indexOf(panel));
        if (accMobile.matches) accKeepInView(panel);
      }
      else if (t.classList.contains("acc-prev")) accOpen(accIndex - 1);
      else if (t.classList.contains("acc-next")) accOpen(accIndex + 1);
      else if (t.classList.contains("acc-pause")) accSetPaused(!wrap.classList.contains("is-paused"));
    });

    box.addEventListener("keydown", function (e) {
      if (!e.target.classList.contains("acc-tab")) return;
      var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      var idx = accPanels().indexOf(e.target.closest(".acc-panel"));
      accOpen(idx + step, true);
    });

    // Al terminar la línea de progreso del panel abierto, pasa al siguiente.
    wrap.addEventListener("animationend", function (e) {
      if (e.animationName === "acc-fill" && accAuto.matches) accOpen(accIndex + 1);
    });

    // Pausas automáticas: mouse encima, foco de teclado adentro, toque (el usuario tomó el control).
    box.addEventListener("mouseenter", function () { wrap.classList.add("is-hover"); });
    box.addEventListener("mouseleave", function () { wrap.classList.remove("is-hover"); });
    box.addEventListener("focusin", function (e) {
      if (e.target.matches && e.target.matches(":focus-visible")) wrap.classList.add("is-focus");
    });
    box.addEventListener("focusout", function (e) {
      if (!box.contains(e.relatedTarget)) wrap.classList.remove("is-focus");
    });
    box.addEventListener("pointerdown", function (e) { if (e.pointerType === "touch") accSetPaused(true); });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        wrap.classList.toggle("is-off", !entries[0].isIntersecting);
      }, { threshold: 0.35 }).observe(box);

    }

    if ("ResizeObserver" in window) new ResizeObserver(accLayout).observe(box);
    else window.addEventListener("resize", accLayout);
    window.addEventListener("load", accLayout);
    if (accAuto.addEventListener) accAuto.addEventListener("change", accLayout);
    if (accMobile.addEventListener) accMobile.addEventListener("change", function () { accOpen(accIndex); accMobileInicial(); accLayout(); });
  }

  /* ---------- Al refrescar, volver siempre al inicio de la página ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function esRecarga() {
    var nav = window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    return !!nav && nav.type === "reload";
  }
  function irAlInicioSiRecarga() {
    if (!esRecarga()) return;
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
  }
  window.addEventListener("load", irAlInicioSiRecarga);

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    irAlInicioSiRecarga();
    $("#year").textContent = new Date().getFullYear();

    var dlg = $("#project-dialog");
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

    $("#demo-confirm").addEventListener("click", confirmDemo);

    initReveal();
    renderFilters();
    renderProjects();
    renderProjectNames();
    initServiceCarousel();
    initAccordion();
    setRegion("ve");
    initNav();
  });
})();
