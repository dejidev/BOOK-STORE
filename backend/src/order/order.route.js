const express = require("express");
const router = express.Router();
const { createOrder, getOrderByEmail } = require("./order.controller")

router.post("/", createOrder)

//Get order by email
router.get("/:email", getOrderByEmail)

module.exports = router;