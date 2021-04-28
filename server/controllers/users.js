const User = require('../db/models/user');

exports.createUser = async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // await req.user.populate('orders').execPopulate();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
