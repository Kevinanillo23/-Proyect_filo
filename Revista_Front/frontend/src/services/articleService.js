import { API_BASE_URL } from "../configuration";
import { fetchWithAuth } from "../utils/authHelper";

/**
 * Service for handling Article API requests.
 * Uses the Fetch API to interact with the backend.
 */
class ArticleService {
    constructor() {
        this.baseUrl = `${API_BASE_URL}/api/articles`;
    }

    /**
     * Helper to handle response and errors
     */
    async _request(endpoint, options = {}, requireAuth = false) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const res = requireAuth
                ? await fetchWithAuth(url, options) // Handles token refresh
                : await fetch(url, options); // Public access

            if (!res.ok) {
                // Try to parse error message from server
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || errorData.message || `Request failed with status ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error(`ArticleService Error [${endpoint}]:`, error);
            throw error;
        }
    }

    async getAll(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        return this._request(`?${queryParams}`);
    }

    async getById(id) {
        return this._request(`/${id}`);
    }

    /**
     * Add a specific comment to an article
     * @param {string} id Article ID
     * @param {string} text Comment text
     */
    async addComment(id, text) {
        return this._request(`/${id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        }, true);
    }
}

export const articleService = new ArticleService();
