const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const { createItem, getItems, updateItem, deleteItem } = require("../controllers/itemController");

router.post("/", auth, createItem);
router.get("/", auth, getItems);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, role(["admin"]), deleteItem);

module.exports = router;
