const { Product } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const createPage = async (req, res) => {
  res.render("create.ejs");
};

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const file = req.file;
  let img;
  console.log(req.body);
  try {
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }
    // IMG-10062023.jpeg

    await Product.create({
      name,
      price,
      stock,
      imageUrl: img,
    });

    res.redirect("/dashboard/admin");
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.render("index.ejs", {
      products,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createPage,
  createProduct,
  findProducts,
};
