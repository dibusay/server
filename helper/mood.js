const AWS = require('aws-sdk')
AWS.config.loadFromPath('./awsconfig.json') //TODO setting credentials access key and secret key
AWS.config.update({region: 'eu-west-1'});

var machinelearning = new AWS.MachineLearning({apiVersion:'2014-12-12'})

function findFoodbyMood(mood){
    var params = {
        MLModelId: 'ml-MOO9bBv5CHZ' /* required */
    };
    console.log('masuk sini')
    machinelearning.createRealtimeEndpoint(params, function(err, data) {
        console.log('================ masuk create ====================')
        if (err){
            console.log(err, err.stack); // an error occurred
        } else{
            console.log(data);           // successful response
            return(data)
        }   
        
    });

}



module.exports = findFoodbyMood