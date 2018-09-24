const AWS = require('aws-sdk')

const faceEmotions = function(req, res) {
    // TODO: add S3 processing here
    // - Get image from client vie req.body
    // - Post to S3
    // - Get image filename
    // - Upload to Rekognition

    AWS.config.loadFromPath('./awsconfig.json') //TODO setting credentials access key and secret key
    AWS.config.update({region: 'us-east-1'});
    
    var rekognition = new AWS.Rekognition();
    
    var BUCKET = "masakyuk-rekognition" //TODO => create "amazon-rekognition" bucket in s3
    var params = {
        Attributes: ['ALL', 'DEFAULT'],
        Image: {
             S3Object: {
              Bucket: BUCKET, 
              Name: "pp-2.jpg" //TODO => get the image name in s3
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
}

module.exports = {
    faceEmotions
}