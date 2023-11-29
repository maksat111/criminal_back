const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users");

const createUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res
        .status(403)
        .json({ success: 0, message: "This username is not aviable!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      surname,
      email,
      password: encryptedPassword,
    });

    res.status(201).json({ success: 1, data: createdUser });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const Users = await User.find();

    Users.forEach((item) => (item.password = undefined));

    res.status(200).json({
      success: 1,
      data: Users,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findOne({ _id: id });

    if (!foundUser) {
      return res.status(200).json({ success: 0, msg: "No User in this id!" });
    }

    const deletedUser = await User.deleteOne({ _id: id });

    res.status(200).json({
      success: 1,
      data: foundUser,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email } = req.body;

    let updatedUser = await User.findByIdAndUpdate(id, {
      name,
      surname,
      email,
    });

    updatedUser.name = name;
    updatedUser.surname = surname;
    updatedUser.email = email;

    res.status(200).json({
      success: 1,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    const found = await User.findOne({ email });

    if (found && (await bcrypt.compare(password, found.password))) {
      const token = jwt.sign(
        { _id: found._id, email: found.email, role: found.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1500h",
        }
      );

      found.password = undefined;

      return res
        .status(200)
        .json({ success: 1, data: { ...found._doc, token } });
    }

    res.status(400).json({ success: 0, msg: "Invalid credentials!" });
  } catch (err) {
    res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
};

exports.createUser = createUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.loginUser = loginUser;
