const AWS = require('aws-sdk')
AWS.config.loadFromPath('./awsconfig.json')
AWS.config.update({region: 'eu-west-1'});

var machinelearning = new AWS.MachineLearning({apiVersion:'2014-12-12'})

function findFoodbyMood(mood,cb){
    var params = {
        MLModelId: 'ml-MOO9bBv5CHZ', 
        PredictEndpoint: 'https://realtime.machinelearning.eu-west-1.amazonaws.com',
        Record: {
            "mood" : mood.emotion,
            "gender" : mood.gender.toLowerCase(),
            "age" : mood.age.toString()
        }
    };
    machinelearning.predict(params, function(err, data) {
        console.log('masuk sini')

        if (err) {
            console.log(err, err.stack);
        }
        else{
            cb(data)
        }     
    });

}

module.exports = findFoodbyMood