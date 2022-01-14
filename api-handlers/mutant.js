const isMutant = require("../models/mutantes");
const dnaValidate  = require("../models/dnaValidate");
// respuestas:
const forbiddenError = require("./responses/forbiddenError");
const badRequestError = require("./responses/badRequestError");
const okey  = require("./responses/okey");

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const ddb = new AWS.DynamoDB({apiVersion: 'latest'});

function dbCreate(dna, isMutant) {
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

      console.log(params);

      ddb.putItem(params, function(error, data) {
        if (error) {
          console.log("Error", error);
        } else {
          console.log("Success", data);
        }
      });
}


exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    if(!dnaValidate(data.dna)) {
        // datos incorrectos:
        return badRequestError();
    }

    if(isMutant(data.dna)) {
        dbCreate(data.dna, true);
        return okey();
    } else {
        dbCreate(data.dna, false);
        return forbiddenError();
    }
};
