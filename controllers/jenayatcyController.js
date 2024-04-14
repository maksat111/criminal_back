const Jenayatcy = require("../models/jenayatcy");
const imageUpload = require("../helpers/imageUpload");
const fs = require("fs");

const getJenayatcy = async (req, res) => {
  try {
    const { search } = req.query;
    let config = {};

    // if (category) {
    //   config = {
    //     category,
    //   };
    // }

    const found = await Jenayatcy.find();

    found.forEach((e) => {
      e.image1 = process.env.BASE_URL + "/" + e.image1;
      e.image2 = process.env.BASE_URL + "/" + e.image2;
      e.image3 = process.env.BASE_URL + "/" + e.image3;
      e.image4 = process.env.BASE_URL + "/" + e.image4;
    });

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

const createJenayatcy = async (req, res) => {
  try {
    // if (
    //   !req.files?.image1 ||
    //   !req.files?.image2 ||
    //   !req.files?.image3 ||
    //   !req.files?.image4
    // ) {
    //   return res.status(422).json({ success: 0, msg: "Missing fields!" });
    // }
    if (req.files?.image1) {
      img = await imageUpload(req.files.image1.name, req.files.image1.data);
      req.body.image1 = img;
    }
    if (req.files?.image2) {
      img = await imageUpload(req.files.image2.name, req.files.image2.data);
      req.body.image2 = img;
    }
    if (req.files?.image3) {
      img = await imageUpload(req.files.image3.name, req.files.image3.data);
      req.body.image3 = img;
    }
    if (req.files?.image4) {
      img = await imageUpload(req.files.image4.name, req.files.image4.data);
      req.body.image4 = img;
    }

    const newJenayatcy = await Jenayatcy.create(req.body);

    newJenayatcy.image1 = process.env.BASE_URL + "/" + newJenayatcy.image1;
    newJenayatcy.image2 = process.env.BASE_URL + "/" + newJenayatcy.image2;
    newJenayatcy.image3 = process.env.BASE_URL + "/" + newJenayatcy.image3;
    newJenayatcy.image4 = process.env.BASE_URL + "/" + newJenayatcy.image4;

    res.status(201).json({
      success: 1,
      data: newJenayatcy,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const updateJenayatcy = async (req, res) => {
  try {
    const { id } = req.params;

    const found = await Jenayatcy.findOne({ _id: id });

    if (!found) {
      return res.status(404).json({
        success: 0,
        msg: "No Jenayatcy on this id!",
      });
    }

    if (req.files?.image1) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      await fs.unlinkSync(found.image);
      req.body.image1 = img;
    }
    if (req.files?.image2) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      await fs.unlinkSync(found.image);
      req.body.image2 = img;
    }
    if (req.files?.image3) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      await fs.unlinkSync(found.image);
      req.body.image3 = img;
    }
    if (req.files?.image4) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      await fs.unlinkSync(found.image);
      req.body.image4 = img;
    }

    await Jenayatcy.findByIdAndUpdate(id, req.body);

    const data = {
      image1: process.env.BASE_URL + "/" + req.body.image1,
      image2: process.env.BASE_URL + "/" + req.body.image2,
      image3: process.env.BASE_URL + "/" + req.body.image3,
      image4: process.env.BASE_URL + "/" + req.body.image4,
    };

    res.status(200).json({
      success: 1,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const deleteJenayatcy = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Jenayatcy.findOne({ _id: id });

    if (!found) {
      return res
        .status(200)
        .json({ success: 0, msg: "No Jenayatcy in this id!" });
    }

    await Jenayatcy.deleteOne({ _id: id });

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

const fileDelete = async (req, res) => {
  try {
    const { file, id, field } = req.query;
    await fs.unlinkSync(file);

    await Jenayatcy.findByIdAndUpdate(id, { [field]: null });

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

exports.getJenayatcy = getJenayatcy;
exports.createJenayatcy = createJenayatcy;
exports.updateJenayatcy = updateJenayatcy;
exports.deleteJenayatcy = deleteJenayatcy;
exports.fileDelete = fileDelete;
