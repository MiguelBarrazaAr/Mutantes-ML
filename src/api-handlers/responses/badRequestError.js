function badRequestError() {
    return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('BadRequest')
    };
}

module.exports = badRequestError