const router = require("express").Router();
const articlesControllers = require("../../controllers/articlesControllers");

// Matches with "/api/books"
router.route("/")
  .get(articlesControllers.findAll)
  .post(articlesControllers.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(articlesControllers.findById)
  .put(articlesControllers.update)
  .delete(articlesControllers.remove);

module.exports = router;