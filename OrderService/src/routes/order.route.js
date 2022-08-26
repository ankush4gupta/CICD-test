const express =  require("express");
const router =  express.Router();
const { getAllOrders }  =  require("../controllers/order.controller");

router.get("/getOrders",getAllOrders);
module.exports = router;