const express = require('express');
const router = express.Router();
const RentController = require("../Controller/rent");

router.post("/create",RentController.create);
router.post("/edit",RentController.edit);
router.delete("/delete/:user/:id",RentController.del);
router.post("/taken",RentController.taken);
router.get("/rentlist",RentController.rentlist);
router.get("/rent/:id",RentController.rentById);

module.exports = router;