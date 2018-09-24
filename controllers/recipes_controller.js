let axios = require('axios')

module.exports = {
	getRecipes: (req, res) => {
        let query = req.query.q
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=7f184b7a&app_key=a66fc2e336697a82fe7c32f769dc3291`)
            .then(({data}) => {
                let hits = data.hits
                let recipes = []
                let recipe = {}
               
                for(let hit of hits){
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
                    recipes
                })
            })
            .catch(err => {
                console.log('error!!')
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}