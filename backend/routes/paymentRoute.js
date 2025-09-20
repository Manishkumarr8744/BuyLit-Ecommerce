const express= require("express")
const router= express.Router();

const {isAuthenticatedUser}=require("../middlewares/authenication");
const { processPayment, sendStripeAPIkey } = require("../controller/paymentController");

router.route("/payment/process").post(processPayment)
router.route("/stripeapikey").get(sendStripeAPIkey)

module.exports=router;
