const foodFormood = {   "HAPPY" : ["chamomile","chocolate","tea","onion","corn"] ,
                        "SAD" : ["chocolate","avocado","milk","cereal","almond","cheese","salmon"],
                        "ANGRY" : ["green tea","popcorn","peanut", "barley","daikon"],
                        "CONFUSED" : ["barley","lentils","white beans","wheat","daikon"],
                        "DISGUSTED" : ["millet","sweet rice","garbanzo","aduki beans","sweet squash"],
                        "SURPRISED" : ["aduki beans", "black beans", "buckwheat","salad"],
                        "CALM" : ["miso soup", "aduki beans", "black beans", "buckwheat", "soba noodles", "winter squash"],
                        "UNKNOWN" : [ "chamomile","chocolate","tea","onion","corn", "avocado","milk","cereal","almond",
                                    "cheese","salmon","green tea","popcorn","peanut", "barley","daikon","lentils",
                                    "white beans","wheat","millet","sweet rice","garbanzo","aduki beans","sweet squash"
                                ]            
                    }
// const axios = require('axios')

function findFoodbyMood(mood){
    var resultFood = "rice"
    for(var key in foodFormood){
        if(mood===key||mood.toUpperCase()===key){
            var combine = Math.floor(Math.random()*foodFormood[key].length)
            resultFood = foodFormood[key][combine]
        }
    }
    return(resultFood)
}

module.exports = findFoodbyMood