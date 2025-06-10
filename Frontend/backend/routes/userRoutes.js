const express = require("express");
const { getAllUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserById);
router.get("/getAllUser", getAllUsers);

module.exports = router;
