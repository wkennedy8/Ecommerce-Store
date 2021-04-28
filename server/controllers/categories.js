const Category = require('../db/models/category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.populate('products').execPopulate();
    res.status(200).json(category.products);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
