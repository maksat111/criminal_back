const Kanun = require("../models/kanun");

const getKanun = async (req, res) => {
  try {
    const found = await Kanun.find();
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

const create = async (req, res) => {
  try {
    const { name, statya, description } = req.body;
    const found = await Kanun.findOne({ name, statya, description });

    if (found) {
      return res.status(200).json({
        success: 0,
        msg: "This Kanun is already exists!",
      });
    }

    const newKanun = await Kanun.create({
      name,
      statya,
      description,
    });

    res.status(201).json({
      success: 1,
      data: newKanun,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, statya, description } = req.body;

    const updatedKanun = await Kanun.findByIdAndUpdate(id, {
      name,
      statya,
      description,
    });

    updatedKanun.name = name;
    updatedKanun.statya = statya;
    updatedKanun.description = description;

    res.status(200).json({
      success: 1,
      data: updatedKanun,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const deleteKanun = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Kanun.findOne({ _id: id });

    if (!found) {
      return res.status(200).json({ success: 0, msg: "No Kanun in this id!" });
    }

    const deletedKanun = await Kanun.deleteOne({ _id: id });

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

exports.getKanun = getKanun;
exports.create = create;
exports.update = update;
exports.deleteKanun = deleteKanun;
