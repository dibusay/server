const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const fs = require('fs')

// TODO: add S3 processing here
// - Get image from client vie req.body
// - Post to S3 (DONE)
// - Get image filename (DONE)
// - Upload to Rekognition (DONE)
// - Generate food type by face emotion
// -
const faceEmotions = function(req, res) {

    AWS.config.loadFromPath('./awsconfig.json') //TODO setting credentials access key and secret key
    AWS.config.update({region: 'us-east-1'});
    
    var rekognition = new AWS.Rekognition();
    var BUCKET = "masakyuk-rekognition" //TODO => create bucket in s3
    let randomFileName = uuid()
    
    // let base64data = req.body.image
    fs.readFile('./assets/smiling-man.jpg', function(err, data) {
        if(err) throw err
        // console.log(data)
        
        let base64data = new Buffer(data, 'binary')
        console.log('base64data', base64data)
        var s3 = new AWS.S3()
        s3.putObject({
            Bucket: BUCKET,
            Key: `${randomFileName}.jpg`,
            Body: base64data, // base64data
        }, function (err, response) {
            if (err) throw err
            console.log('S3 response',response) // -> returns Etag (don't know for what)
            // TODO: Move Rekognition process here
            var params = {
                Attributes: ['ALL', 'DEFAULT'],
                Image: {
                     S3Object: {
                      Bucket: BUCKET, 
                      Name: `${randomFileName}.jpg`//TODO => get the image name in s3
                     }
                }
            }
            
            rekognition.detectFaces(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack)
                    res.status(400).json(err)
                } else {
                    console.log(data);
                    // Filter emotions, convert it to FoodTypes
                    // Search Recipe API again
                    // Send emotions, foodtype, and recipes
        
                    // res.status(200).json({
                    //     emotions: data.FaceDetails[0].Emotions
                    // })
                    res.status(200).json(data)
                }
            });
        })
    })
    
}

module.exports = {
    faceEmotions
}