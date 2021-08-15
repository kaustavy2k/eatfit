const express = require("express");
const getFood = require("../controllers/getFood");
const authController = require("../controllers/authController");
const userContoller = require("../controllers/userController");
const foodController = require("../controllers/foodController");
const ailmentController = require("../controllers/ailmentController");
const orderController = require("../controllers/orderController")
const router = express.Router();
router
  .route("/main")
  .get(authController.protect, getFood.getAllFood);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/signup").post(authController.signup);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);
router.route("/updateMe").patch(authController.protect, userContoller.updateMe);
router
  .route("/deleteMe")
  .delete(authController.protect, userContoller.deleteMe);


router.route("/payment").post( orderController.payment);
router.route("/get-order").get( orderController.getOrder);

router.route("/get-food").get(authController.protect, foodController.getFood);
router.route("/get-food-all").get(authController.protect, foodController.getFoodAll);
router.route("/food-add").post(authController.protect, foodController.foodAdd);
router.route("/get-food-filter").post(authController.protect, foodController.getFoodFilter);



router.route("/get-ailment-all").get(authController.protect, ailmentController.getAilmentAll);

module.exports = router;
