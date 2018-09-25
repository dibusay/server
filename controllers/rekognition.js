const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const axios = require('axios')
const findFoodByMood = require('../helper/mood.js')
// const apiURL = 'http://localhost:3000'
// const fs = require('fs')
// let image = fs.readFileSync('./person2.jpeg','base64')

// const fetch = require('node-fetch')

// TODO: add S3 processing here
// - Get image from client vie req.body
// - Post to S3 (DONE)
// - Get image filename (DONE)
// - Upload to Rekognition (DONE)
// - Generate food type by face emotion (DONE)
// - Search Edamam API for recipe (DONE)
// - res.send data from recipe API (DONE)

const faceEmotions = function(req, res) {
    // console.log("hasil image",image);
    
    AWS.config.loadFromPath('./awsconfig.json') //TODO setting credentials access key and secret key
    AWS.config.update({region: 'us-east-1'});
    
    var rekognition = new AWS.Rekognition();
    var BUCKET = "masakyuk-rekognition" //TODO => create bucket in s3
    let randomFileName = uuid()

    // let image = req.body.image
    let base64img = req.body.base64
    // let base64img = image

    let base64data = new Buffer(base64img, 'base64')
    // console.log('base64data', base64data)

    // let imageUri = 'data:image/png;base64,' + req.body.base64
    var s3 = new AWS.S3()
    s3.putObject({
        Bucket: BUCKET,
        Key: `${randomFileName}`,
        Body: base64data, // base64data
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    }, function (err, response) {
        if (err) throw err
        console.log('S3 response',response) // -> returns Etag (don't know for what)
        // TODO: Move Rekognition process here
        var params = {
            Attributes: ['ALL', 'DEFAULT'],
            Image: {
                 S3Object: {
                  Bucket: BUCKET, 
                  Name: `${randomFileName}`//TODO => get the image name in s3
                 }
            }
        }
        
        rekognition.detectFaces(params, function(err, data) {
            if (err) {
                console.log(err, err.stack)
                return res.status(400).json(err)
            } else {
                // Filter emotions, convert it to FoodTypes
                const emotion = data.FaceDetails[0].Emotions[0].Type
                const age = data.FaceDetails[0].AgeRange.Low
                const gender = data.FaceDetails[0].Gender.Value
                console.log("result emotion",emotion,age,gender);
                findFoodByMood({ emotion, age, gender },function(result){
                    console.log('food type',result.Prediction.predictedLabel)
                    // Search Recipe API
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
    
                        // Send emotions, foodtype, and recipes
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