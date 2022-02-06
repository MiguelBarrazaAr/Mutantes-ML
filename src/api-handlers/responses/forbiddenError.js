function forbiddenError() {
    return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('Forbidden')
    };
}

module.exports = forbiddenError