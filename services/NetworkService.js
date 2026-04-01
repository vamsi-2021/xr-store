const BASE_URL = 'https://keycloak.betaflixinc.com/realms/BetaFlix-Experiments/protocol/openid-connect';

// In-memory token store — replace with SecureStore/AsyncStorage for persistence
let accessToken = null;
let refreshToken = null;

const NetworkService = {
  // ─── Token Management ────────────────────────────────────────────────────────

  setTokens(access, refresh) {
    accessToken = access;
    refreshToken = refresh;
  },

  getToken() {
    return accessToken;
  },

  getRefreshToken() {
    return refreshToken;
  },

  clearTokens() {
    accessToken = null;
    refreshToken = null;
  },

  // ─── JSON Request ─────────────────────────────────────────────────────────────

  async request(method, endpoint, body = null, requiresAuth = true) {
    const url = `${BASE_URL}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (requiresAuth && accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = { method, headers };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    return this._send(url, options);
  },

  // ─── Form-Encoded Request (required by Keycloak token endpoints) ──────────────

  async postForm(endpoint, params) {
    const url = `${BASE_URL}${endpoint}`;

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };

    const body = new URLSearchParams(params).toString();

    return this._send(url, { method: 'POST', headers, body });
  },

  // ─── Shared Response Handler ──────────────────────────────────────────────────

  async _send(url, options) {
    const response = await fetch(url, options);

    let data;
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message =
        (data && (data.error_description || data.message)) ||
        (typeof data === 'string' ? data : null) ||
        `Request failed with status ${response.status}`;
      const error = new Error(message);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  },

  // ─── Convenience Methods ──────────────────────────────────────────────────────

  get(endpoint, requiresAuth = true) {
    return this.request('GET', endpoint, null, requiresAuth);
  },

  post(endpoint, body, requiresAuth = true) {
    return this.request('POST', endpoint, body, requiresAuth);
  },

  put(endpoint, body, requiresAuth = true) {
    return this.request('PUT', endpoint, body, requiresAuth);
  },

  delete(endpoint, requiresAuth = true) {
    return this.request('DELETE', endpoint, null, requiresAuth);
  },
};

export default NetworkService;
