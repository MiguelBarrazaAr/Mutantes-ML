async function stats(db) {
    const human = await db.countHuman();
    const mutant = await db.countMutant();
    return await Promise.all([human, mutant]).then((r) => {
    const ratio =  ((mutant*100)/human)/100 || 0;
    return  {
        "count_mutant_dna": mutant,
        "count_human_dna": human,
        "ratio": ratio
    };
    });
}

module.exports = stats