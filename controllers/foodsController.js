const Food = require("../models/foods");
const imageUpload = require("../helpers/imageUpload");
const fs = require("fs");

const getFoods = async (req, res) => {
  try {
    const { category } = req.query;
    let config = {};

    if (category) {
      config = {
        category,
      };
    }

    const found = await Food.find(config);

    found.forEach((e) => (e.image = process.env.BASE_URL + "/" + e.image));

    res.status(200).json({
      success: 1,
      data: found,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const createFood = async (req, res) => {
  try {
    if (!req.files?.image || !req.body.name) {
      return res.status(422).json({ success: 0, msg: "Missing fields!" });
    }

    img = await imageUpload(req.files.image.name, req.files.image.data);

    req.body.image = img;

    const newFood = await Food.create(req.body);

    newFood.image = process.env.BASE_URL + "/" + newFood.image;

    res.status(201).json({
      success: 1,
      data: newFood,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const found = await Food.findOne({ _id: id });

    if (!found) {
      return res.status(404).json({
        success: 0,
        msg: "No Food on this id!",
      });
    }

    if (req.files?.image) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      await fs.unlinkSync(found.image);
      req.body.image = img;
    }

    await Food.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      success: 1,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Food.findOne({ _id: id });

    if (!found) {
      return res.status(200).json({ success: 0, msg: "No Food in this id!" });
    }

    await Food.deleteOne({ _id: id });

    found.image !== "" && (await fs.unlinkSync(found.image));

    res.status(200).json({
      success: 1,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

exports.getFoods = getFoods;
exports.createFood = createFood;
exports.updateFood = updateFood;
exports.deleteFood = deleteFood;
