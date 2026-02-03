import { useState, useEffect, useCallback } from "react";
import { articleService } from "../services/articleService";

/**
 * Custom Hook to manage Article state and fetching logic.
 * Acts as a Controller for the Article data.
 * 
 * @param {Object} initialParams - Initial search/filter parameters
 * @returns {Object} { articles, loading, error, refetch }
 */
export const useArticles = (searchParams) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {};
            // Convert URLSearchParams or Object to plain object for service
            if (searchParams instanceof URLSearchParams) {

                searchParams.forEach((value, key) => {
                    if (value && value !== 'null') params[key] = value;
                });
            } else if (typeof searchParams === 'object') {
                Object.keys(searchParams).forEach(key => {
                    if (searchParams[key] && searchParams[key] !== 'null') {
                        params[key] = searchParams[key];
                    }
                });
            }


            // Default logic for Home page (if no specific search, limit to 12)
            if (!params.search && !params.category && !params.limit) {
                params.limit = "12";
            }

            const data = await articleService.getAll(params);
            setArticles(data.articles || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return { articles, loading, error, refetch: fetchArticles };
};
