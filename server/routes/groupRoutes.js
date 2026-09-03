const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

  createGroup,
  getGroups,
  joinGroup,

} = require("../controllers/groupController");


// CREATE GROUP
router.post(
  "/",
  authMiddleware,
  createGroup
);


// GET ALL GROUPS
router.get(
  "/",
  authMiddleware,
  getGroups
);


// JOIN GROUP
router.post(
  "/join/:id",
  authMiddleware,
  joinGroup
);


module.exports = router;
