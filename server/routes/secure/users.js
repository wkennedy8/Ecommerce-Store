const router = require('express').Router();
const { getCurrentUser } = require('../../controllers/users');

router.get('/current', getCurrentUser);

module.exports = router;
