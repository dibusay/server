const AWS = require('aws-sdk')
AWS.config.loadFromPath('./awsconfig.json') //TODO setting credentials access key and secret key
AWS.config.update({region: 'eu-west-1'});

var machinelearning = new AWS.MachineLearning({apiVersion:'2014-12-12'})

function findFoodbyMood(mood,cb){
    // console.log("dari mood", mood);
    
    var params = {
        MLModelId: 'ml-MOO9bBv5CHZ', /* required */
        PredictEndpoint: 'https://realtime.machinelearning.eu-west-1.amazonaws.com', /* required */
        Record: {
            "mood" : mood.emotion,
            "gender" : mood.gender.toLowerCase(),
            "age" : mood.age.toString()
        }
    };
    console.log("mood",params);
    
    // machinelearning.createRealtimeEndpoint(params, function(err, data) {
    //     console.log('================ masuk create ====================')
    //     if (err){
    //         console.log(err, err.stack); // an error occurred
    //     } else{
    //         console.log(data);           // successful response
    //         return(data)
    //     }   
        
    // });
    machinelearning.predict(params, function(err, data) {
        console.log('masuk sini')

        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else{
            // console.log("hasil ml",data);           // successful response
            cb(data)
        }     
    });

}


//   https://realtime.machinelearning.eu-west-1.amazonaws.com

module.exports = findFoodbyMood