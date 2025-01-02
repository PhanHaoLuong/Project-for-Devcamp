function sanitizeInput(input) {
    let sanitized = input.trim();
    sanitized = sanitized.replace(/\s+/g, '');
    sanitized = sanitized.replace(/[^a-zA-Z0-9@_\.-]/g, '');
    return sanitized;
}

export default sanitizeInput;