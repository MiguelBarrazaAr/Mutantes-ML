exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('pong'),
    };
    return response;
};