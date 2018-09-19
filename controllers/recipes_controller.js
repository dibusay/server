let axios = require('axios')

module.exports = {
	getRecipes: (req, res) => {
        let query = req.query.q
        axios.get(`https://api.edamam.com/search?q=${query}&app_id=7f184b7a&app_key=a66fc2e336697a82fe7c32f769dc3291`)
            .then(results => {
                res.status(200).json({
                    msg: 'successfully get recipes',
                    hits: results.data.hits
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.msg
                })
            }) 
    }
}