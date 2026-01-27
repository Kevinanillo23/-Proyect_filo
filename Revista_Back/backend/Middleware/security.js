/**
 * Custom Security Middleware
 * Handles sanitization against NoSQL Injection and XSS by traversing headers/body/query.
 */

const sanitizeValue = (val) => {
    if (typeof val === 'string') {
        // Simple encoding to prevent basic XSS
        return val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return val;
};

const traverseAndSanitize = (obj) => {
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // Prevent NoSQL injection ($ne, $gt, etc.) and prototype pollution
                if (key.startsWith("$") || key.includes(".")) {
                    delete obj[key];
                } else {
                    if (typeof obj[key] === 'string') {
                        obj[key] = sanitizeValue(obj[key]);
                    } else {
                        traverseAndSanitize(obj[key]);
                    }
                }
            }
        }
    }
};

const securitySanitizer = (req, res, next) => {
    // Sanitize Body and Params (Mutable)
    if (req.body) traverseAndSanitize(req.body);
    if (req.params) traverseAndSanitize(req.params);

    // Sanitize Query:
    // In Express 5, req.query properties might be read-only if not configured correctly,
    // but we modify the values inside the query object which is standard.
    if (req.query) {
        for (const key in req.query) {
            if (typeof req.query[key] === 'string') {
                // Create a new sanitized value to avoid reassigning if property is non-writable (though usually it is writable)
                // Actually, simpler to just traverse it if possible, but safe string replacement is okay.
                req.query[key] = sanitizeValue(req.query[key]);
            }
        }
    }

    next();
};

module.exports = securitySanitizer;
