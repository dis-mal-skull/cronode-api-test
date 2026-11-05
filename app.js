(() => {
  "use strict";

  const CATALOG = window.CRONODE_CATALOG || [];
  const CATEGORY_TOTALS = CATALOG.reduce((totals, module) => {
    totals[module.category] = (totals[module.category] || 0) + module.endpoints.length;
    return totals;
  }, {});
  const TOTAL_ENDPOINTS = CATALOG.reduce((total, module) => total + module.endpoints.length, 0);

  const STORAGE_KEYS = {
    jwt: "cronode.jwt",
    apiKey: "cronode.apiKey",
    history: "cronode.history",
    env: "cronode.env",
    customBase: "cronode.customBase",
    cors: "cronode.cors",
    category: "cronode.category"
  };

  const ENV_BASES = {
    test: "https://testapi-cronode.senacpic.pro",
    local: "http://localhost:3000"
  };

  const CORS_PROXY = "https://corsproxy.io/?url=";
  const MAX_HISTORY = 50;
  const TIMEOUT_MS = 30000;
  const LOGIN_BUTTON_LABEL = "Iniciar sesión y capturar token";

  const PRE_CONFIGURED_KEYS = [
    {
      label: "CPIC Master Key",
      value: "6df3418530dd69237774158c434a7995725e84b0cbbed8e8f4d6d036d2502ffc"
    },
    { label: "AutoDoc Service Key", value: "ak_live_autodoc_98234xz1" },
    { label: "Face Recognition Key", value: "ak_live_face_84762rt3" }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const readStore = (key, fallback = "") => {
    try {
      const value = window.localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  };

  const writeStore = (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      showToast("No se pudo guardar en localStorage.", "error");
    }
  };

  const loadHistory = () => {
    try {
      const parsed = JSON.parse(readStore(STORAGE_KEYS.history, "[]"));
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => item && item.id).slice(0, MAX_HISTORY);
    } catch (error) {
      return [];
    }
  };

  const storedEnv = readStore(STORAGE_KEYS.env, "test");
  const initialEnv = ["test", "local", "custom"].includes(storedEnv) ? storedEnv : "test";
  const storedCategory = readStore(STORAGE_KEYS.category, "jwt");
  const initialCategory = ["jwt", "apiKey"].includes(storedCategory) ? storedCategory : "jwt";

  const state = {
    env: initialEnv,
    category: initialCategory,
    customBase: readStore(STORAGE_KEYS.customBase, ""),
    corsProxy: readStore(STORAGE_KEYS.cors, "0") === "1",
    jwt: readStore(STORAGE_KEYS.jwt, ""),
    apiKey: readStore(STORAGE_KEYS.apiKey, ""),
    history: loadHistory(),
    currentEndpoint: null,
    method: "GET",
    path: "/api/v1/areas",
    headers: [],
    query: [],
    body: "",
    bodyType: "json",
    selectedEndpointId: null,
    activeRequestTab: "headers",
    activeResponseTab: "json",
    responseVisible: false,
    file: null,
    lastResponse: null,
    sending: false,
    sendingLogin: false
  };

  const refs = {
    envSelect: $("#env-select"),
    customBaseInput: $("#custom-base-url"),
    credentialsBtn: $("#btn-credentials"),
    historyBtn: $("#btn-history"),
    historyCount: $("#history-count"),
    creditsBtn: $("#btn-credits"),
    endpointSearch: $("#endpoint-search"),
    endpointCount: $("#endpoint-count"),
    categoryButtons: $$("[data-category]"),
    jwtCount: $("#jwt-count"),
    apiKeyCount: $("#api-key-count"),
    catalog: $("#catalog"),
    catalogEmpty: $("#catalog-empty"),
    methodSelect: $("#method-select"),
    pathInput: $("#path-input"),
    sendBtn: $("#send-btn"),
    endpointMeta: $("#endpoint-meta"),
    fullUrl: $("#full-url"),
    proxyNote: $("#proxy-note"),
    copyUrlBtn: $("#copy-url-btn"),
    corsToggle: $("#cors-toggle"),
    envHint: $("#env-hint"),
    headersCount: $("#headers-count"),
    queryCount: $("#query-count"),
    autoHeadersList: $("#auto-headers-list"),
    editAuthBtn: $("#edit-auth-btn"),
    headersList: $("#headers-list"),
    addHeaderBtn: $("#add-header-btn"),
    queryList: $("#query-list"),
    addQueryBtn: $("#add-query-btn"),
    bodyWarning: $("#body-warning"),
    jsonEditorWrap: $("#json-editor-wrap"),
    bodyInput: $("#body-input"),
    bodyStatus: $("#body-status"),
    beautifyBtn: $("#beautify-btn"),
    multipartWrap: $("#multipart-wrap"),
    fileInput: $("#file-input"),
    fileName: $("#file-name"),
    statusBadge: $("#status-badge"),
    responseMethod: $("#response-method"),
    responseTime: $("#response-time"),
    responseSize: $("#response-size"),
    corsAlert: $("#cors-alert"),
    corsAlertText: $("#cors-alert-text"),
    retryCorsBtn: $("#retry-cors-btn"),
    copyJsonBtn: $("#copy-json-btn"),
    responseEmpty: $("#response-empty"),
    responseLoading: $("#response-loading"),
    responseJson: $("#response-json"),
    responseRaw: $("#response-raw"),
    responseHeaders: $("#response-headers"),
    responseHeadersCount: $("#response-headers-count"),
    credentialsModal: $("#credentials-modal"),
    jwtInput: $("#jwt-input"),
    jwtState: $("#jwt-state"),
    saveJwtBtn: $("#save-jwt-btn"),
    clearJwtBtn: $("#clear-jwt-btn"),
    loginForm: $("#login-form"),
    loginEmail: $("#login-email"),
    loginPassword: $("#login-password"),
    loginBtn: $("#login-btn"),
    loginStatus: $("#login-status"),
    apikeyInput: $("#apikey-input"),
    apikeyState: $("#apikey-state"),
    keyChips: $("#key-chips"),
    saveApiKeyBtn: $("#save-apikey-btn"),
    clearApiKeyBtn: $("#clear-apikey-btn"),
    creditsModal: $("#credits-modal"),
    historyDrawer: $("#history-drawer"),
    historyBackdrop: $("#history-backdrop"),
    clearHistoryBtn: $("#clear-history-btn"),
    historyList: $("#history-list"),
    toastContainer: $("#toast-container"),
    requestTabButtons: $$("[data-request-tab]"),
    requestPanels: $$("[data-request-panel]"),
    responseTabButtons: $$("[data-response-tab]"),
    responsePanels: $$("[data-response-panel]"),
    modalBackdrops: $$(".modal-backdrop")
  };

  const expandedModules = new Set();

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlightJson(value) {
    const escaped = escapeHtml(value);
    return escaped.replace(
      /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let className = "json-number";
        if (match.charAt(0) === '"') {
          className = /:\s*$/.test(match) ? "json-key" : "json-string";
        } else if (match === "true" || match === "false") {
          className = "json-boolean";
        } else if (match === "null") {
          className = "json-null";
        }
        return `<span class="${className}">${match}</span>`;
      }
    );
  }

  function showToast(message, type = "info") {
    if (!refs.toastContainer) return;
    const toast = el("div", `toast is-${type}`, message);
    refs.toastContainer.append(toast);
    window.setTimeout(() => {
      toast.classList.add("is-out");
      window.setTimeout(() => toast.remove(), 220);
    }, 3400);
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function formatTimestamp(timestamp) {
    try {
      return new Date(timestamp).toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
    } catch (error) {
      return "";
    }
  }

  function reasonText(status) {
    const reasons = {
      200: "OK",
      201: "Created",
      202: "Accepted",
      204: "No Content",
      301: "Moved Permanently",
      302: "Found",
      304: "Not Modified",
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      409: "Conflict",
      415: "Unsupported Media Type",
      422: "Unprocessable Entity",
      429: "Too Many Requests",
      500: "Internal Server Error",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout"
    };
    return reasons[status] || "";
  }

  function proxyUrl(url) {
    return `${CORS_PROXY}${encodeURIComponent(url)}`;
  }

  function joinUrl(base, path) {
    const cleanBase = String(base || "").replace(/\/+$/, "");
    const cleanPath = String(path || "");
    if (!cleanPath) return cleanBase;
    return `${cleanBase}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
  }

  function maskSecret(value) {
    if (!value) return "";
    if (value.length <= 8) return "•".repeat(value.length);
    return `${"•".repeat(10)}${value.slice(-4)}`;
  }

  function getBaseUrl() {
    if (state.env === "custom") return state.customBase.trim().replace(/\/+$/, "");
    return ENV_BASES[state.env] || ENV_BASES.test;
  }

  function buildTargetUrl() {
    const base = getBaseUrl();
    let path = state.path.trim();
    if (!path) return base;
    if (!path.startsWith("/")) path = `/${path}`;
    const query = state.query
      .filter((item) => item.key.trim())
      .map((item) => `${encodeURIComponent(item.key.trim())}=${encodeURIComponent(item.value ?? "")}`)
      .join("&");
    if (!query) return `${base}${path}`;
    const separator = path.includes("?") ? "&" : "?";
    return `${base}${path}${separator}${query}`;
  }

  function getEffectiveAuthMode() {
    if (state.currentEndpoint) {
      return state.currentEndpoint.authHeaderKey === "x-api-key" ? "apiKey" : "jwt";
    }
    return state.category;
  }

  function getAutoHeaders(mode = null) {
    const activeMode = mode || getEffectiveAuthMode();
    const headers = [];
    if (state.jwt && activeMode === "jwt") {
      headers.push({ key: "Authorization", value: `Bearer ${state.jwt}`, source: "jwt" });
    }
    if (state.apiKey && activeMode === "apiKey") {
      headers.push({ key: "x-api-key", value: state.apiKey, source: "apikey" });
    }
    return headers;
  }

  function buildRequestHeaders() {
    const headers = {};
    state.headers.forEach((item) => {
      const key = item.key.trim();
      if (key) headers[key] = item.value;
    });
    getAutoHeaders().forEach((item) => {
      headers[item.key] = item.value;
    });
    const hasHeader = (name) => Object.keys(headers).some((key) => key.toLowerCase() === name);
    const sendsBody = state.method !== "GET" && state.method !== "HEAD";
    if (sendsBody && state.bodyType === "multipart") {
      Object.keys(headers).forEach((key) => {
        if (key.toLowerCase() === "content-type") delete headers[key];
      });
    } else if (sendsBody && state.body.trim() && !hasHeader("content-type")) {
      headers["Content-Type"] = "application/json";
    }
    if (!hasHeader("accept")) headers.Accept = "application/json";
    return headers;
  }

  function buildRequestBody() {
    if (state.method === "GET" || state.method === "HEAD") return undefined;
    if (state.bodyType === "multipart") {
      const formData = new FormData();
      if (state.file) formData.append("file", state.file);
      return formData;
    }
    return state.body.trim() ? state.body : undefined;
  }

  function persistAuth() {
    writeStore(STORAGE_KEYS.jwt, state.jwt);
    writeStore(STORAGE_KEYS.apiKey, state.apiKey);
  }

  function persistEnv() {
    writeStore(STORAGE_KEYS.env, state.env);
    writeStore(STORAGE_KEYS.customBase, state.customBase);
  }

  function persistCors() {
    writeStore(STORAGE_KEYS.cors, state.corsProxy ? "1" : "0");
  }

  function persistCategory() {
    writeStore(STORAGE_KEYS.category, state.category);
  }

  function persistHistory() {
    writeStore(STORAGE_KEYS.history, JSON.stringify(state.history));
  }

  function updateFullUrl() {
    const target = buildTargetUrl();
    refs.fullUrl.textContent = target || "—";
    refs.proxyNote.hidden = !state.corsProxy;
    refs.envHint.textContent = `Base: ${getBaseUrl() || "(sin URL base)"}`;
  }

  function updateEndpointMeta(text) {
    refs.endpointMeta.textContent = text;
  }

  function syncMethodSelect() {
    refs.methodSelect.value = state.method;
    refs.methodSelect.dataset.method = state.method;
    refs.bodyWarning.hidden = state.bodyType === "multipart" || state.method !== "GET";
  }

  function validateBody() {
    const raw = state.body.trim();
    refs.bodyStatus.className = "body-status";
    if (!raw) {
      refs.bodyStatus.textContent = "Sin cuerpo";
      return;
    }
    try {
      JSON.parse(raw);
      refs.bodyStatus.classList.add("is-valid");
      refs.bodyStatus.textContent = "JSON válido";
    } catch (error) {
      refs.bodyStatus.classList.add("is-invalid");
      const message = error.message.replace(/^JSON\.parse:\s*/i, "");
      refs.bodyStatus.textContent = `JSON inválido · ${message.length > 90 ? `${message.slice(0, 90)}…` : message}`;
    }
  }

  function renderBodyEditor() {
    const isMultipart = state.bodyType === "multipart";
    refs.jsonEditorWrap.hidden = isMultipart;
    refs.multipartWrap.hidden = !isMultipart;
    refs.bodyWarning.hidden = isMultipart || state.method !== "GET";
    if (isMultipart) {
      state.file = null;
      refs.fileInput.value = "";
      refs.fileName.textContent = "Ningún archivo seleccionado.";
      return;
    }
    refs.bodyInput.value = state.body;
    validateBody();
  }

  function buildKVRow(kind, index, item, keyPlaceholder, valuePlaceholder) {
    const row = el("div", "kv-row");
    const keyInput = el("input", "kv-input is-key");
    keyInput.type = "text";
    keyInput.value = item.key;
    keyInput.placeholder = keyPlaceholder;
    keyInput.spellcheck = false;
    keyInput.setAttribute("aria-label", `${kind === "headers" ? "Clave de cabecera" : "Clave de parámetro"} ${index + 1}`);

    const valueInput = el("input", "kv-input");
    valueInput.type = "text";
    valueInput.value = item.value;
    valueInput.placeholder = valuePlaceholder;
    valueInput.spellcheck = false;
    valueInput.setAttribute("aria-label", `${kind === "headers" ? "Valor de cabecera" : "Valor de parámetro"} ${index + 1}`);

    const removeBtn = el("button", "kv-remove", "×");
    removeBtn.type = "button";
    removeBtn.setAttribute("aria-label", "Eliminar fila");

    keyInput.addEventListener("input", (event) => {
      state[kind][index].key = event.target.value;
      if (kind === "query") updateFullUrl();
    });

    valueInput.addEventListener("input", (event) => {
      state[kind][index].value = event.target.value;
      if (kind === "query") updateFullUrl();
    });

    removeBtn.addEventListener("click", () => {
      state[kind].splice(index, 1);
      if (kind === "headers") {
        renderHeaders();
      } else {
        renderQuery();
        updateFullUrl();
      }
    });

    row.append(keyInput, valueInput, removeBtn);
    return row;
  }

  function renderHeaders() {
    refs.headersList.replaceChildren();
    if (!state.headers.length) {
      refs.headersList.append(el("p", "inline-empty", "Sin cabeceras manuales. Se enviarán solo las automáticas."));
    } else {
      state.headers.forEach((item, index) => {
        refs.headersList.append(buildKVRow("headers", index, item, "Accept", "application/json"));
      });
    }
    refs.headersCount.textContent = String(state.headers.length);
    renderAutoHeaders();
  }

  function renderQuery() {
    refs.queryList.replaceChildren();
    if (!state.query.length) {
      refs.queryList.append(el("p", "inline-empty", "Sin parámetros de consulta."));
    } else {
      state.query.forEach((item, index) => {
        refs.queryList.append(buildKVRow("query", index, item, "limit", "10"));
      });
    }
    refs.queryCount.textContent = String(state.query.length);
  }

  function renderAutoHeaders() {
    refs.autoHeadersList.replaceChildren();
    const mode = getEffectiveAuthMode();
    const autoHeaders = getAutoHeaders(mode);
    if (!autoHeaders.length) {
      const message =
        mode === "apiKey"
          ? "Sin API key configurada. Selecciona una llave en Credenciales para enviarla como x-api-key."
          : "Sin JWT configurado. Usa el Login Rápido o guarda un token en Credenciales.";
      refs.autoHeadersList.append(el("p", "auto-empty", message));
      return;
    }
    autoHeaders.forEach((item) => {
      const row = el("div", "auto-header-row");
      const key = document.createElement("span");
      key.className = "auto-header-key";
      key.innerHTML = `<svg class="lock" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>${escapeHtml(item.key)}<span class="auto-badge">auto</span>`;
      const value = el("span", "auto-header-value", item.source === "jwt" ? `Bearer ${maskSecret(state.jwt)}` : maskSecret(state.apiKey));
      row.append(key, value);
      refs.autoHeadersList.append(row);
    });
  }

  function setRequestTab(tab) {
    state.activeRequestTab = tab;
    refs.requestTabButtons.forEach((button) => {
      const active = button.dataset.requestTab === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    refs.requestPanels.forEach((panel) => {
      panel.hidden = panel.dataset.requestPanel !== tab;
    });
  }

  function setResponseTab(tab) {
    state.activeResponseTab = tab;
    refs.responseTabButtons.forEach((button) => {
      const active = button.dataset.responseTab === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    if (!state.responseVisible) {
      refs.responsePanels.forEach((panel) => {
        panel.hidden = true;
      });
      return;
    }
    refs.responsePanels.forEach((panel) => {
      panel.hidden = panel.dataset.responsePanel !== tab;
    });
  }

  function hideResponsePanels() {
    refs.responsePanels.forEach((panel) => {
      panel.hidden = true;
    });
  }

  function findEndpoint(id) {
    for (const module of CATALOG) {
      const endpoint = module.endpoints.find((item) => item.id === id);
      if (endpoint) return { module, endpoint };
    }
    return null;
  }

  function markSelectedEndpoint() {
    $$(".endpoint-item", refs.catalog).forEach((node) => {
      node.classList.toggle("is-active", node.dataset.endpointId === state.selectedEndpointId);
    });
  }

  function loadEndpoint(id) {
    const found = findEndpoint(id);
    if (!found) return;
    const { module, endpoint } = found;
    const categoryChanged = module.category !== state.category;
    state.category = module.category;
    state.currentEndpoint = endpoint;
    state.selectedEndpointId = endpoint.id;
    state.method = endpoint.method;
    state.path = endpoint.path;
    state.headers = (endpoint.headers || []).map((item) => ({ key: item.key, value: item.value }));
    state.query = (endpoint.query || []).map((item) => ({ key: item.key, value: item.value ?? "" }));
    state.bodyType = endpoint.bodyType === "multipart" ? "multipart" : "json";
    state.body = endpoint.body ? JSON.stringify(endpoint.body, null, 2) : "";
    state.file = null;
    if (endpoint.defaultApiKey && !state.apiKey) {
      state.apiKey = endpoint.defaultApiKey;
      persistAuth();
      updateCredentialStates();
    }
    persistCategory();
    if (categoryChanged) {
      refs.endpointSearch.value = "";
      updateCategoryUI();
      renderCatalog();
    }
    refs.methodSelect.value = state.method;
    refs.pathInput.value = state.path;
    syncMethodSelect();
    renderHeaders();
    renderQuery();
    renderBodyEditor();
    updateFullUrl();
    updateEndpointMeta(`${module.name} · ${endpoint.name} — ${endpoint.description}`);
    markSelectedEndpoint();
  }

  function renderCatalog(filter = "") {
    const query = filter.trim().toLowerCase();
    const categoryTotal = CATEGORY_TOTALS[state.category] || 0;
    let visible = 0;
    refs.catalog.replaceChildren();

    CATALOG.filter((module) => module.category === state.category).forEach((module) => {
      const endpoints = module.endpoints.filter((endpoint) => {
        if (!query) return true;
        const haystack = `${module.name} ${endpoint.name} ${endpoint.method} ${endpoint.path}`.toLowerCase();
        return haystack.includes(query);
      });
      if (!endpoints.length) return;
      visible += endpoints.length;

      const section = el("section", "catalog-module");
      section.style.setProperty("--module-color", module.color);
      const open = query ? true : expandedModules.has(module.id);
      if (open) section.classList.add("is-open");

      const toggle = el("button", "module-toggle");
      toggle.type = "button";
      toggle.dataset.moduleToggle = module.id;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = `<span class="module-icon">${escapeHtml(module.short)}</span><span class="module-name">${escapeHtml(module.name)}</span><span class="module-count">${module.endpoints.length}</span><svg class="chevron" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

      const body = el("div", "module-body");
      body.hidden = !open;

      endpoints.forEach((endpoint) => {
        const item = el("button", "endpoint-item");
        item.type = "button";
        item.dataset.endpointId = endpoint.id;
        if (endpoint.id === state.selectedEndpointId) item.classList.add("is-active");
        item.innerHTML = `<span class="method-badge method-${endpoint.method.toLowerCase()}">${endpoint.method}</span><span class="endpoint-copy"><span class="endpoint-name">${escapeHtml(endpoint.name)}</span><span class="endpoint-path">${escapeHtml(endpoint.path)}</span></span>`;
        body.append(item);
      });

      section.append(toggle, body);
      refs.catalog.append(section);
    });

    refs.endpointCount.textContent = query ? `${visible} / ${categoryTotal} endpoints` : `${TOTAL_ENDPOINTS} endpoints`;
    refs.catalogEmpty.hidden = visible > 0;
  }

  function updateCategoryUI() {
    refs.categoryButtons.forEach((button) => {
      const active = button.dataset.category === state.category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    if (refs.jwtCount) refs.jwtCount.textContent = String(CATEGORY_TOTALS.jwt || 0);
    if (refs.apiKeyCount) refs.apiKeyCount.textContent = String(CATEGORY_TOTALS.apiKey || 0);
  }

  function setCategory(category) {
    if (!["jwt", "apiKey"].includes(category) || category === state.category) return;
    state.category = category;
    state.currentEndpoint = null;
    const firstModule = CATALOG.find((module) => module.category === category);
    if (firstModule) expandedModules.add(firstModule.id);
    persistCategory();
    refs.endpointSearch.value = "";
    renderCatalog();
    updateCategoryUI();
    renderAutoHeaders();
  }

  function handleCatalogClick(event) {
    const toggle = event.target.closest("[data-module-toggle]");
    if (toggle) {
      const section = toggle.closest(".catalog-module");
      const body = section.querySelector(".module-body");
      const isOpen = section.classList.toggle("is-open");
      body.hidden = !isOpen;
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) expandedModules.add(toggle.dataset.moduleToggle);
      else expandedModules.delete(toggle.dataset.moduleToggle);
      return;
    }
    const endpointButton = event.target.closest("[data-endpoint-id]");
    if (endpointButton) loadEndpoint(endpointButton.dataset.endpointId);
  }

  function setStatusBadge(status, label) {
    refs.statusBadge.className = "status-badge";
    if (status === null || status === undefined || status === 0) {
      refs.statusBadge.classList.add("status-error");
      refs.statusBadge.textContent = label || "ERROR";
      return;
    }
    const family = Math.floor(status / 100);
    refs.statusBadge.classList.add(`status-${family}xx`);
    refs.statusBadge.textContent = `${status} ${label || ""}`.trim();
  }

  function renderResponseHeaders(headers) {
    refs.responseHeaders.replaceChildren();
    if (!headers.length) {
      refs.responseHeaders.append(
        el("p", "inline-empty", "El servidor no expuso cabeceras de respuesta (posible restricción CORS).")
      );
      return;
    }
    headers.forEach(([key, value]) => {
      const row = el("div", "header-row");
      row.append(el("span", "header-key", key), el("span", "header-value", value));
      refs.responseHeaders.append(row);
    });
  }

  function renderResponse() {
    const response = state.lastResponse;
    if (!response) return;
    refs.responseEmpty.hidden = true;
    refs.responseLoading.hidden = true;
    state.responseVisible = true;

    setStatusBadge(response.status, response.statusText || reasonText(response.status));
    refs.responseMethod.textContent = state.method;
    refs.responseTime.textContent = `${response.elapsed} ms`;
    refs.responseSize.textContent = formatBytes(response.bytes);
    refs.responseHeadersCount.textContent = String(response.headers.length);

    if (response.isJson) {
      const pretty = JSON.stringify(response.parsed, null, 2);
      response.pretty = pretty;
      refs.responseJson.innerHTML = highlightJson(pretty);
    } else {
      refs.responseJson.textContent = response.raw.trim()
        ? "La respuesta no contiene JSON válido. Revisa la pestaña Raw."
        : "La respuesta está vacía.";
    }

    refs.responseRaw.textContent = response.raw || "(respuesta vacía)";
    renderResponseHeaders(response.headers);
    refs.copyJsonBtn.disabled = false;
    setResponseTab(response.isJson ? "json" : "raw");
  }

  function handleNetworkError(targetUrl, error, elapsed) {
    const message =
      error && error.name === "AbortError"
        ? "La petición excedió el tiempo de espera de 30 segundos."
        : error && error.message
          ? error.message
          : "Error de red desconocido.";

    state.lastResponse = null;
    state.responseVisible = true;
    refs.responseEmpty.hidden = true;
    refs.responseLoading.hidden = true;
    refs.copyJsonBtn.disabled = true;
    setStatusBadge(null, "ERROR");
    refs.responseMethod.textContent = state.method;
    refs.responseTime.textContent = `${elapsed} ms`;
    refs.responseSize.textContent = "—";
    refs.responseHeadersCount.textContent = "0";
    refs.responseJson.textContent = `No se recibió una respuesta válida.\n\n${message}`;
    refs.responseRaw.textContent = `${(error && error.name) || "Error"}: ${message}\n\nURL: ${targetUrl}\n\n${(error && error.stack) || ""}`.trim();
    renderResponseHeaders([]);
    setResponseTab("raw");
    refs.corsAlert.hidden = false;
    refs.corsAlertText.textContent = `No se pudo completar la petición a ${targetUrl}. ${message}${state.corsProxy ? " El proxy CORS ya está activo." : ""}`;
    refs.retryCorsBtn.textContent = state.corsProxy
      ? "Reintentar con CORS Proxy activo"
      : "¿Reintentar con CORS Proxy activado?";
  }

  function setLoading(isLoading) {
    refs.sendBtn.disabled = isLoading;
    refs.sendBtn.classList.toggle("is-loading", isLoading);
    const label = refs.sendBtn.querySelector("span");
    if (label) label.textContent = isLoading ? "Enviando..." : "Enviar Petición";
  }

  async function sendRequest(options = {}) {
    if (state.sending) return;

    if (options.retryWithProxy) {
      state.corsProxy = true;
      refs.corsToggle.checked = true;
      persistCors();
      updateFullUrl();
    }

    const path = state.path.trim();
    if (!path) {
      showToast("Escribe una ruta para enviar la petición.", "error");
      refs.pathInput.focus();
      return;
    }

    if (state.bodyType === "multipart" && !state.file) {
      showToast("Adjunta un archivo antes de enviar la petición.", "error");
      refs.fileInput.focus();
      return;
    }

    const targetUrl = buildTargetUrl();
    const requestUrl = state.corsProxy ? proxyUrl(targetUrl) : targetUrl;
    const headers = buildRequestHeaders();
    const body = buildRequestBody();

    state.sending = true;
    state.lastResponse = null;
    state.responseVisible = false;
    refs.corsAlert.hidden = true;
    refs.responseEmpty.hidden = true;
    refs.responseLoading.hidden = false;
    refs.copyJsonBtn.disabled = true;
    hideResponsePanels();
    refs.statusBadge.className = "status-badge status-idle";
    refs.statusBadge.textContent = "Enviando...";
    refs.responseMethod.textContent = state.method;
    refs.responseTime.textContent = "— ms";
    refs.responseSize.textContent = "—";
    refs.responseHeadersCount.textContent = "0";
    setLoading(true);

    const started = performance.now();
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    let elapsed = 0;

    try {
      const response = await fetch(requestUrl, {
        method: state.method,
        headers,
        body,
        signal: controller.signal,
        mode: "cors",
        cache: "no-store"
      });
      const raw = await response.text();
      elapsed = Math.round(performance.now() - started);
      const bytes = new Blob([raw]).size;
      const responseHeaders = Array.from(response.headers.entries());
      let parsed = null;
      let isJson = false;
      if (raw.trim()) {
        try {
          parsed = JSON.parse(raw);
          isJson = true;
        } catch (error) {
          isJson = false;
        }
      }

      state.lastResponse = {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        elapsed,
        bytes,
        raw,
        parsed,
        isJson,
        headers: responseHeaders,
        contentType: response.headers.get("content-type") || ""
      };

      renderResponse();
      addHistory(targetUrl, response.status);
    } catch (error) {
      elapsed = Math.round(performance.now() - started);
      handleNetworkError(targetUrl, error, elapsed);
      addHistory(targetUrl, null);
    } finally {
      window.clearTimeout(timeoutId);
      state.sending = false;
      setLoading(false);
    }
  }

  function addHistory(targetUrl, status) {
    const snapshot = {
      env: state.env,
      category: state.category,
      customBase: state.customBase,
      method: state.method,
      path: state.path,
      headers: state.headers.map((item) => ({ ...item })),
      query: state.query.map((item) => ({ ...item })),
      body: state.body,
      bodyType: state.bodyType
    };
    state.history.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      method: state.method,
      path: state.path,
      url: targetUrl,
      status,
      timestamp: Date.now(),
      snapshot
    });
    state.history = state.history.slice(0, MAX_HISTORY);
    persistHistory();
    renderHistory();
  }

  function historyStatusClass(status) {
    if (status === null || status === undefined) return "network";
    if (status >= 500) return "server";
    if (status >= 400) return "client";
    return "ok";
  }

  function hostOf(url) {
    try {
      return new URL(url).host;
    } catch (error) {
      return "";
    }
  }

  function renderHistory() {
    refs.historyCount.textContent = String(state.history.length);
    refs.historyList.replaceChildren();
    if (!state.history.length) {
      const empty = el("div", "history-empty");
      empty.append(el("p", "", "Aún no hay peticiones registradas."), el("small", "", "Envía una petición para verla aquí."));
      refs.historyList.append(empty);
      return;
    }

    state.history.forEach((item) => {
      const button = el("button", "history-item");
      button.type = "button";
      button.dataset.historyId = item.id;

      const top = el("div", "history-top");
      top.append(
        el("span", `method-badge method-${String(item.method || "GET").toLowerCase()}`, item.method || "GET"),
        el(
          "span",
          `history-status ${historyStatusClass(item.status)}`,
          item.status === null || item.status === undefined ? "ERR" : String(item.status)
        )
      );

      const path = el("p", "history-path", item.path || item.url);
      const meta = el("div", "history-meta");
      meta.append(el("span", "", formatTimestamp(item.timestamp)), el("span", "", hostOf(item.url)));
      button.append(top, path, meta);
      refs.historyList.append(button);
    });
  }

  function restoreHistory(id) {
    const item = state.history.find((entry) => entry.id === id);
    if (!item) return;
    const snapshot = item.snapshot || {};

    if (snapshot.env === "custom") {
      state.env = "custom";
      state.customBase = snapshot.customBase || "";
    } else if (snapshot.env === "test" || snapshot.env === "local") {
      state.env = snapshot.env;
    }

    state.category = snapshot.category === "apiKey" ? "apiKey" : "jwt";
    state.currentEndpoint = null;
    state.method = snapshot.method || item.method || "GET";
    state.path = snapshot.path || item.path || "/";
    state.headers = Array.isArray(snapshot.headers) ? snapshot.headers.map((entry) => ({ ...entry })) : [];
    state.query = Array.isArray(snapshot.query) ? snapshot.query.map((entry) => ({ ...entry })) : [];
    state.body = typeof snapshot.body === "string" ? snapshot.body : "";
    state.bodyType = snapshot.bodyType === "multipart" ? "multipart" : "json";
    state.file = null;
    state.selectedEndpointId = null;

    persistEnv();
    persistCategory();
    refs.endpointSearch.value = "";
    updateCategoryUI();
    renderCatalog();
    refs.envSelect.value = state.env;
    refs.customBaseInput.hidden = state.env !== "custom";
    refs.customBaseInput.value = state.customBase;
    refs.methodSelect.value = state.method;
    refs.pathInput.value = state.path;
    syncMethodSelect();
    renderHeaders();
    renderQuery();
    renderBodyEditor();
    updateFullUrl();
    updateEndpointMeta("Petición restaurada desde el historial.");
    markSelectedEndpoint();
    closeHistory();
    showToast("Petición restaurada desde el historial.", "info");
  }

  function clearHistory() {
    if (!state.history.length) {
      showToast("El historial ya está vacío.", "info");
      return;
    }
    if (!window.confirm("¿Vaciar el historial de peticiones?")) return;
    state.history = [];
    persistHistory();
    renderHistory();
    showToast("Historial eliminado.", "success");
  }

  function updateCredentialStates() {
    refs.jwtState.textContent = state.jwt ? `Token activo · ${state.jwt.length} car.` : "Sin token";
    refs.jwtState.classList.toggle("online", Boolean(state.jwt));
    refs.jwtState.classList.toggle("offline", !state.jwt);
    refs.apikeyState.textContent = state.apiKey ? "API key activa" : "Sin API key";
    refs.apikeyState.classList.toggle("online", Boolean(state.apiKey));
    refs.apikeyState.classList.toggle("offline", !state.apiKey);
    renderAutoHeaders();
  }

  function renderKeyChips() {
    refs.keyChips.replaceChildren();
    PRE_CONFIGURED_KEYS.forEach((key) => {
      const chip = el("button", "key-chip", key.label);
      chip.type = "button";
      chip.title = key.value;
      if (state.apiKey === key.value) chip.classList.add("is-active");
      chip.addEventListener("click", () => {
        state.apiKey = key.value;
        persistAuth();
        refs.apikeyInput.value = key.value;
        updateCredentialStates();
        renderKeyChips();
        showToast(`API key aplicada: ${key.label}`, "success");
      });
      refs.keyChips.append(chip);
    });
  }

  function saveJwt() {
    let value = refs.jwtInput.value.trim();
    if (/^bearer\s+/i.test(value)) value = value.replace(/^bearer\s+/i, "");
    state.jwt = value;
    refs.jwtInput.value = value;
    persistAuth();
    updateCredentialStates();
    showToast(value ? "JWT guardado correctamente." : "JWT eliminado.", value ? "success" : "info");
  }

  function clearJwt() {
    state.jwt = "";
    refs.jwtInput.value = "";
    persistAuth();
    updateCredentialStates();
    showToast("JWT eliminado.", "info");
  }

  function saveApiKey() {
    state.apiKey = refs.apikeyInput.value.trim();
    refs.apikeyInput.value = state.apiKey;
    persistAuth();
    updateCredentialStates();
    renderKeyChips();
    showToast(state.apiKey ? "API key guardada correctamente." : "API key eliminada.", state.apiKey ? "success" : "info");
  }

  function clearApiKey() {
    state.apiKey = "";
    refs.apikeyInput.value = "";
    persistAuth();
    updateCredentialStates();
    renderKeyChips();
    showToast("API key eliminada.", "info");
  }

  function setLoginStatus(message, className = "") {
    refs.loginStatus.textContent = message;
    refs.loginStatus.className = `form-status${className ? ` ${className}` : ""}`;
  }

  function extractToken(data) {
    if (!data) return null;
    if (typeof data === "string") {
      const text = data.trim();
      return /^[\w-]+\.[\w-]+\.[\w-]+$/.test(text) ? text : null;
    }
    const candidates = [
      data.token,
      data.access_token,
      data.accessToken,
      data.jwt,
      data.jwtToken,
      data.data && data.data.token,
      data.data && data.data.access_token,
      data.data && data.data.accessToken
    ];
    for (const candidate of candidates) {
      if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    }
    return null;
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (state.sendingLogin) return;

    const email = refs.loginEmail.value.trim();
    const password = refs.loginPassword.value;
    if (!email || !password) {
      setLoginStatus("Ingresa email y contraseña para iniciar sesión.", "is-error");
      return;
    }

    state.sendingLogin = true;
    refs.loginBtn.disabled = true;
    refs.loginBtn.textContent = "Autenticando...";
    setLoginStatus("Conectando con /api/v1/auth/authenticate...", "is-info");

    try {
      const endpointUrl = joinUrl(getBaseUrl(), "/api/v1/auth/authenticate");
      const requestUrl = state.corsProxy ? proxyUrl(endpointUrl) : endpointUrl;
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ institutional_email: email, password }),
        cache: "no-store"
      });
      const text = await response.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (error) {
        data = text;
      }

      if (!response.ok) {
        const detail =
          (data && typeof data === "object" && (data.message || data.error)) ||
          text.slice(0, 140) ||
          `HTTP ${response.status}`;
        throw new Error(`HTTP ${response.status} · ${detail}`);
      }

      const token = extractToken(data);
      if (!token) throw new Error("La respuesta no contiene un token JWT reconocible.");

      state.jwt = token;
      persistAuth();
      refs.jwtInput.value = token;
      updateCredentialStates();
      refs.loginPassword.value = "";
      setLoginStatus(`Token capturado y guardado (${token.length} caracteres).`, "is-success");
      showToast("Login exitoso. JWT guardado.", "success");
    } catch (error) {
      const hint = state.corsProxy ? "" : " Si es un problema de CORS, activa el Bypass CORS.";
      setLoginStatus(`No se pudo autenticar: ${error.message}.${hint}`, "is-error");
    } finally {
      state.sendingLogin = false;
      refs.loginBtn.disabled = false;
      refs.loginBtn.textContent = LOGIN_BUTTON_LABEL;
    }
  }

  async function copyText(text, message) {
    if (!text) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("clipboard-unavailable");
      }
      showToast(message, "success");
    } catch (error) {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.append(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        showToast(message, "success");
      } catch (fallbackError) {
        showToast("No se pudo copiar al portapapeles.", "error");
      }
    }
  }

  function toggleVisibility(button) {
    const input = document.getElementById(button.dataset.toggleVisibility);
    if (!input) return;
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    button.textContent = show ? "Ocultar" : "Ver";
  }

  function unlockScrollIfIdle() {
    const overlays = [refs.credentialsModal, refs.creditsModal, refs.historyDrawer];
    if (overlays.every((overlay) => overlay.hidden)) {
      document.body.classList.remove("modal-open");
    }
  }

  function openOverlay(id) {
    const node = document.getElementById(id);
    if (!node) return;
    node.hidden = false;
    document.body.classList.add("modal-open");
    const focusTarget = node.querySelector("input:not([type='hidden']), select, textarea, button");
    if (focusTarget) window.setTimeout(() => focusTarget.focus(), 40);
  }

  function closeOverlay(id) {
    const node = document.getElementById(id);
    if (!node) return;
    node.hidden = true;
    unlockScrollIfIdle();
  }

  function openHistory() {
    renderHistory();
    refs.historyDrawer.hidden = false;
    refs.historyBackdrop.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeHistory() {
    refs.historyDrawer.hidden = true;
    refs.historyBackdrop.hidden = true;
    unlockScrollIfIdle();
  }

  function openCredentials() {
    refs.jwtInput.value = state.jwt;
    refs.apikeyInput.value = state.apiKey;
    setLoginStatus("", "");
    updateCredentialStates();
    renderKeyChips();
    openOverlay("credentials-modal");
  }

  function handleEnvChange() {
    state.env = refs.envSelect.value;
    if (state.env === "custom" && !state.customBase) {
      state.customBase = ENV_BASES.test;
    }
    persistEnv();
    refs.customBaseInput.hidden = state.env !== "custom";
    refs.customBaseInput.value = state.customBase;
    updateFullUrl();
    if (state.env === "custom") refs.customBaseInput.focus();
  }

  function handleCustomBaseInput(event) {
    state.customBase = event.target.value;
    persistEnv();
    updateFullUrl();
  }

  function addHeader() {
    state.headers.push({ key: "", value: "" });
    renderHeaders();
    const rows = refs.headersList.querySelectorAll(".kv-row");
    const lastRow = rows[rows.length - 1];
    if (lastRow) lastRow.querySelector("input").focus();
  }

  function addQuery() {
    state.query.push({ key: "", value: "" });
    renderQuery();
    updateFullUrl();
    const rows = refs.queryList.querySelectorAll(".kv-row");
    const lastRow = rows[rows.length - 1];
    if (lastRow) lastRow.querySelector("input").focus();
  }

  function beautifyBody() {
    if (!state.body.trim()) {
      showToast("No hay JSON para embellecer.", "error");
      return;
    }
    try {
      const formatted = JSON.stringify(JSON.parse(state.body), null, 2);
      state.body = formatted;
      refs.bodyInput.value = formatted;
      validateBody();
      showToast("JSON embellecido.", "success");
    } catch (error) {
      showToast(`JSON inválido: ${error.message}`, "error");
    }
  }

  function handleFileChange(event) {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    state.file = file;
    refs.fileName.textContent = file
      ? `${file.name} · ${formatBytes(file.size)}`
      : "Ningún archivo seleccionado.";
  }

  function bindEvents() {
    refs.envSelect.addEventListener("change", handleEnvChange);
    refs.customBaseInput.addEventListener("input", handleCustomBaseInput);
    refs.endpointSearch.addEventListener("input", (event) => renderCatalog(event.target.value));
    refs.catalog.addEventListener("click", handleCatalogClick);
    refs.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => setCategory(button.dataset.category));
    });

    refs.methodSelect.addEventListener("change", (event) => {
      state.method = event.target.value;
      syncMethodSelect();
    });
    refs.pathInput.addEventListener("input", (event) => {
      state.path = event.target.value;
      updateFullUrl();
    });
    refs.sendBtn.addEventListener("click", () => sendRequest());
    refs.corsToggle.addEventListener("change", (event) => {
      state.corsProxy = event.target.checked;
      persistCors();
      updateFullUrl();
    });
    refs.copyUrlBtn.addEventListener("click", () => copyText(buildTargetUrl(), "URL copiada al portapapeles."));

    refs.requestTabButtons.forEach((button) => {
      button.addEventListener("click", () => setRequestTab(button.dataset.requestTab));
    });
    refs.responseTabButtons.forEach((button) => {
      button.addEventListener("click", () => setResponseTab(button.dataset.responseTab));
    });

    refs.addHeaderBtn.addEventListener("click", addHeader);
    refs.addQueryBtn.addEventListener("click", addQuery);
    refs.bodyInput.addEventListener("input", (event) => {
      state.body = event.target.value;
      validateBody();
    });
    refs.beautifyBtn.addEventListener("click", beautifyBody);
    refs.fileInput.addEventListener("change", handleFileChange);
    refs.editAuthBtn.addEventListener("click", openCredentials);

    refs.copyJsonBtn.addEventListener("click", () => {
      if (!state.lastResponse) {
        showToast("No hay respuesta para copiar.", "error");
        return;
      }
      const text = state.lastResponse.isJson ? state.lastResponse.pretty : state.lastResponse.raw;
      copyText(text, state.lastResponse.isJson ? "JSON copiado al portapapeles." : "Respuesta copiada al portapapeles.");
    });
    refs.retryCorsBtn.addEventListener("click", () => sendRequest({ retryWithProxy: true }));

    refs.credentialsBtn.addEventListener("click", openCredentials);
    refs.historyBtn.addEventListener("click", openHistory);
    refs.creditsBtn.addEventListener("click", () => openOverlay("credits-modal"));

    refs.saveJwtBtn.addEventListener("click", saveJwt);
    refs.clearJwtBtn.addEventListener("click", clearJwt);
    refs.saveApiKeyBtn.addEventListener("click", saveApiKey);
    refs.clearApiKeyBtn.addEventListener("click", clearApiKey);
    refs.loginForm.addEventListener("submit", handleLogin);

    refs.clearHistoryBtn.addEventListener("click", clearHistory);
    refs.historyList.addEventListener("click", (event) => {
      const target = event.target.closest("[data-history-id]");
      if (target) restoreHistory(target.dataset.historyId);
    });
    refs.historyBackdrop.addEventListener("click", closeHistory);

    refs.modalBackdrops.forEach((backdrop) => {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) closeOverlay(backdrop.id);
      });
    });

    document.addEventListener("click", (event) => {
      const closer = event.target.closest("[data-close]");
      if (!closer) return;
      if (closer.dataset.close === "history-drawer") closeHistory();
      else closeOverlay(closer.dataset.close);
    });

    $$("[data-toggle-visibility]").forEach((button) => {
      button.addEventListener("click", () => toggleVisibility(button));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (!refs.historyDrawer.hidden) {
          closeHistory();
          return;
        }
        if (!refs.credentialsModal.hidden) {
          closeOverlay("credentials-modal");
          return;
        }
        if (!refs.creditsModal.hidden) {
          closeOverlay("credits-modal");
        }
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        sendRequest();
      }
    });
  }

  function init() {
    if (!CATALOG.length) {
      showToast("No se pudo cargar el catálogo de endpoints.", "error");
      return;
    }

    const categoryModules = CATALOG.filter((module) => module.category === state.category);
    const defaultModule =
      categoryModules.find((module) => module.module === "areas") || categoryModules[0] || CATALOG[0];
    if (defaultModule) expandedModules.add(defaultModule.id);
    if (state.env === "custom" && !state.customBase) {
      state.customBase = ENV_BASES.test;
      persistEnv();
    }

    refs.envSelect.value = state.env;
    refs.customBaseInput.hidden = state.env !== "custom";
    refs.customBaseInput.value = state.customBase;
    refs.corsToggle.checked = state.corsProxy;
    refs.methodSelect.value = state.method;
    refs.pathInput.value = state.path;

    updateCategoryUI();
    renderCatalog();
    renderKeyChips();
    updateCredentialStates();
    renderHeaders();
    renderQuery();
    syncMethodSelect();
    renderBodyEditor();
    updateFullUrl();
    renderHistory();
    setRequestTab("headers");
    setResponseTab("json");

    const firstEndpoint = defaultModule && defaultModule.endpoints[0];
    if (firstEndpoint) loadEndpoint(firstEndpoint.id);
  }

  bindEvents();
  init();
})();
