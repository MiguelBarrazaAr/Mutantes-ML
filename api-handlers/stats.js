exports.handler = async (event) => {
    const human = 100
    const mutant = 60
    const ratio = 0.6
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            "count_mutant_dna": mutant,
            "count_human_dna": human,
            "ratio": ratio
        }),
    };
    return response;
};