const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const axios = require('axios')
const findFoodByMood = require('../helper/mood.js')

const faceEmotions = function(req, res) {
    AWS.config.loadFromPath('./awsconfig.json')
    AWS.config.update({region: 'us-east-1'});
    
    var rekognition = new AWS.Rekognition();
    var BUCKET = "masakyuk-rekognition" 
    let randomFileName = uuid()
    let base64img = req.body.base64
    let base64data = new Buffer(base64img, 'base64')
    var s3 = new AWS.S3()
    s3.putObject({
        Bucket: BUCKET,
        Key: `${randomFileName}`,
        Body: base64data, 
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    }, function (err, response) {
        if (err) throw err
        console.log('S3 response',response)
        var params = {
            Attributes: ['ALL', 'DEFAULT'],
            Image: {
                 S3Object: {
                  Bucket: BUCKET, 
                  Name: `${randomFileName}`
                 }
            }
        }
        
        rekognition.detectFaces(params, function(err, data) {
            if (err) {
                console.log(err, err.stack)
                return res.status(400).json(err)
            } else {
                const emotion = data.FaceDetails[0].Emotions[0].Type
                const age = data.FaceDetails[0].AgeRange.Low
                const gender = data.FaceDetails[0].Gender.Value
                console.log("result emotion",emotion,age,gender);
                findFoodByMood({ emotion, age, gender },function(result){
                    console.log('food type',result.Prediction.predictedLabel)

                    var food = result.Prediction.predictedLabel
                    axios({
                        method: 'get',
                        url: `https://api.edamam.com/search?q=${food}&app_id=7f184b7a&app_key=a66fc2e336697a82fe7c32f769dc3291`
                    })
                    .then(({ data }) => {
                        console.log('success get recipes',data)
    
                        let hits = data.hits
                        let recipes = []
                        let recipe = {}
                    
                        for(let hit of hits) {
                            recipe.uri = hit.recipe.uri,
                            recipe.label = hit.recipe.label,
                            recipe.image = hit.recipe.image,
                            recipe.ingredientLines = hit.recipe.ingredientLines,
                            recipe.calories = hit.recipe.calories,
                            recipe.totalTime = hit.recipe.totalTime
                            recipes.push(recipe)
                            recipe = {}
                        }
    
                        res.status(200).json({
                            msg: 'successfully get recipes',
                            recipes,
                            mood: emotion.toLowerCase(),
                            food,
                            age,
                            gender
                        })
                    })
                    .catch((err) => {
                        console.log('error get recipes',response)
                        res.status(500).json({
                            msg: err.message
                        })
                    })
                })
            }
        });
    })
}

module.exports = {
    faceEmotions
}