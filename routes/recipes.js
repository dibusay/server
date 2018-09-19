const router = require('express').Router();
const { getRecipes } = require("../controllers/recipes_controller");

router.get('/', getRecipes);

module.exports = router;