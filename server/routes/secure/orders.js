const router = require('express').Router();

const { paymentIntent, newOrder } = require('../../controllers/orders');

router.post('/intent', paymentIntent);
router.post('/', newOrder);

module.exports = router;
