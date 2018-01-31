const router = require("express").Router();
const {
  getAllUsers,
  getUserByUsername
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:username", getUserByUsername);

module.exports = router;
