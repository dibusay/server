let axios = require('axios')

module.exports = {
	getRecipes: (req, res) => {
        let query = req.query.q
        console.log('query===>', query) 
        console.log('type query==>',typeof query) //string
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
                console.log('server: from recipes_controllers===>', recipes)
                res.status(200).json({
                    msg: 'successfully get recipes',
                    recipes
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.msg
                })
            }) 
    }
}