const express = require("express");
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require("../middlewares/auth");

// ------------------------------------------- Controllers --------------------------------------------- //
const foodsController = require("../controllers/foodsController");
const categoriesController = require("../controllers/categoriesController");
const usersController = require("../controllers/usersController");

//---------------------------------------------- User Routes --------------------------------------------------- //
router.post("/login", usersController.loginUser);
router.get("/admin/user/list", auth, usersController.getUser);
router.post("/admin/user/create", usersController.createUser);
router.patch("/admin/user/update/:id", auth, usersController.updateUser);
router.delete("/admin/user/delete/:id", auth, usersController.deleteUser);

//---------------------------------------------- Category Routes --------------------------------------------------- //
router.get("/category/list", categoriesController.getCategories);
router.get("/admin/category/list", auth, categoriesController.getCategories);
router.post("/admin/category/create", categoriesController.create);
router.patch("/admin/category/update/:id", auth, categoriesController.update);
router.delete(
  "/admin/category/delete/:id",
  auth,
  categoriesController.deleteCategory
);

//---------------------------------------------- Food Routes --------------------------------------------------- //
router.get("/food/list", foodsController.getFoods);
router.get("/admin/food/list", auth, foodsController.getFoods);
router.post("/admin/food/create", foodsController.createFood);
router.patch("/admin/food/update/:id", auth, foodsController.updateFood);
router.delete("/admin/food/delete/:id", auth, foodsController.deleteFood);

module.exports = router;
