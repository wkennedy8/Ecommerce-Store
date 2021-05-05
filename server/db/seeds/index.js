if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('../config/');
const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');
const faker = require('faker');

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  await Category.countDocuments({}, function (err, count) {
    console.log('Number of categories:', count);
  });

  await Product.countDocuments({}, function (err, count) {
    console.log('Number of products:', count);
  });

  const categories = ['Shoes', 'T-Shirts', 'Pants', 'Accessories', 'Hoodies'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const categoryIdArray = [];

  for (let i = 0; i < 5; i++) {
    const category = new Category({
      name: categories[i]
    });
    await category.save();
    categoryIdArray.push(category._id);
  }

  for (let i = 0; i < 20; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      image: faker.image.imageUrl(),
      size: sizes[Math.floor(Math.random() * sizes.length)],
      categoryId:
        categoryIdArray[Math.floor(Math.random() * categoryIdArray.length)]
    });
    await product.save();
  }

  await Category.countDocuments({}, function (err, count) {
    console.log('Number of categories:', count);
  });
  await Product.countDocuments({}, function (err, count) {
    console.log('Number of products:', count);
  });
};

dbReset();
