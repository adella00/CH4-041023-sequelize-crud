const router = require("express").Router();

const Product = require("../controllers/productController");

const upload = require("../middlewares/uploader");

router.post("/", upload.single("image"), Product.createProduct);
router.post("/", Product.createProduct);
router.get("/", Product.findProducts);
router.get("/:id", Product.findProductById);
router.patch("/:id", Product.updateProduct);
router.delete("/:id", Product.deleteProduct);

module.exports = router;
