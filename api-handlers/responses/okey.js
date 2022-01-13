function okey() {
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify('OK'),
    };
}

module.exports = okey