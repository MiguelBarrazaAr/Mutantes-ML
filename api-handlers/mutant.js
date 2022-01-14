const isMutant = require("../models/mutantes");
const dnaValidate  = require("../models/dnaValidate");
// respuestas:
const forbiddenError = require("./responses/forbiddenError");
const badRequestError = require("./responses/badRequestError");
const okey  = require("./responses/okey");

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const ddb = new AWS.DynamoDB({apiVersion: 'latest'});

async function dbCreate(dna, isMutant) {
    const params = {
        TableName: 'mutant-ml-api-dev-mutants',
        Item: {
            dna: {
                S: dna.toString(),
            },
            mutant: {
                BOOL: isMutant
            }
        }
      };

      await ddb.putItem(params).promise();
}


exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    if(!dnaValidate(data.dna)) {
        // datos incorrectos:
        return badRequestError();
    }

    if(isMutant(data.dna)) {
        await dbCreate(data.dna, true);
        return okey();
    } else {
        await dbCreate(data.dna, false);
        return forbiddenError();
    }
};
