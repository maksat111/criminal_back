const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/ulanyjy");

const createUser = async (req, res) => {
  try {
    const { name, surname, username, password, role } = req.body;
    const foundUser = await User.findOne({ username });

    if (foundUser) {
      return res
        .status(403)
        .json({ success: 0, message: "This username is not aviable!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      surname,
      username,
      role,
      password: encryptedPassword,
    });

    res.status(201).json({ success: 1, data: createdUser });
  } catch (err) {
    console.log(err);
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
    const { name, surname, username } = req.body;

    let updatedUser = await User.findByIdAndUpdate(id, {
      name,
      surname,
      username,
    });

    updatedUser.name = name;
    updatedUser.surname = surname;
    updatedUser.username = username;

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
    const { password, username } = req.body;

    const found = await User.findOne({ username });

    if (
      process.env.ADMIN_USERNAME == username &&
      process.env.ADMIN_PASSWORD == password
    ) {
      const token = jwt.sign(
        { _id: 1, role: "SuperAdmin" },
        process.env.TOKEN_KEY,
        {
          expiresIn: "15h",
        }
      );

      return res.status(200).json({
        success: 1,
        data: {
          name: "TITU",
          surname: "Admin",
          role: "Admin",
          token,
        },
      });
    }

    if (found && (await bcrypt.compare(password, found.password))) {
      const token = jwt.sign(
        { _id: found._id, username: found.username, role: found.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "15h",
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
