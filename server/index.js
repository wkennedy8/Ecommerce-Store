if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//import db connection
require('./db/config');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');
//passport middleware
const passport = require('./middleware/authentication');

//open routes
const openUserRoutes = require('./routes/open/user');
const openProductRoutes = require('./routes/open/products');
const openCategoryRoutes = require('./routes/open/categories');

//authenticated routes
const secureProductRoutes = require('./routes/secure/products');
const secureCartRoutes = require('./routes/secure/carts');
const secureUserRoutes = require('./routes/secure/users');
const secureOrderRoutes = require('./routes/secure/orders');

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

app.use('/api/users', openUserRoutes);
app.use('/api/products', openProductRoutes);
app.use('/api/categories', openCategoryRoutes);

app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/products', secureProductRoutes);
app.use('/api/cart', secureCartRoutes);
app.use('/api/users', secureUserRoutes);
app.use('/api/order', secureOrderRoutes);

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});
