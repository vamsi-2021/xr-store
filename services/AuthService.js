import NetworkService from './NetworkService';

const CLIENT_ID = 'user_client';
const SCOPE = 'lrs:statements/write openid profile email lrs:statements/read/mine';

// Decode a JWT without verifying the signature (client-side read-only use)
function parseJWT(token) {
  try {
    const payload = token.split('.')[1];
    // atob is available in React Native's Hermes engine; replace with a polyfill if needed
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

const AuthService = {
  /**
   * Login
   * POST /token  (application/x-www-form-urlencoded)
   *
   * Returns:
   * {
   *   access_token, refresh_token, id_token, expires_in,
   *   token_type, session_state, scope,
   *   user: { sub, name, given_name, family_name, email, preferred_username, roles }
   * }
   */
  async login(username, password) {
    const data = await NetworkService.postForm('/token', {
      client_id: CLIENT_ID,
      username,
      password,
      grant_type: 'password',
      scope: SCOPE,
    });

    // Store both tokens for authenticated requests and logout
    NetworkService.setTokens(data.access_token, data.refresh_token);

    // Extract user profile from the JWT payload — avoids a separate /userinfo call
    const claims = parseJWT(data.access_token);
    const user = claims
      ? {
          sub: claims.sub,
          name: claims.name,
          given_name: claims.given_name,
          family_name: claims.family_name,
          email: claims.email,
          preferred_username: claims.preferred_username,
          roles: claims.realm_access?.roles ?? [],
        }
      : null;

    return { ...data, user };
  },

  /**
   * Logout
   * POST /logout  (application/x-www-form-urlencoded)
   * Sends refresh_token to invalidate the Keycloak session server-side
   */
  async logout() {
    const refreshToken = NetworkService.getRefreshToken();
    try {
      if (refreshToken) {
        await NetworkService.postForm('/logout', {
          client_id: CLIENT_ID,
          refresh_token: refreshToken,
        });
      }
    } finally {
      // Always clear local tokens even if the server call fails
      NetworkService.clearTokens();
    }
  },

  /**
   * Get current user info
   * GET /userinfo
   * Authorization: Bearer <access_token>
   *
   * Response: { sub, name, given_name, family_name, email, preferred_username, email_verified }
   */
  getUserInfo() {
    return NetworkService.get('/userinfo');
  },
};

export default AuthService;
