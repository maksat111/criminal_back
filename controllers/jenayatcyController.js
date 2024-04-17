const Jenayatcy = require("../models/jenayatcy");
const imageUpload = require("../helpers/imageUpload");
const fs = require("fs");

const jenayatcyDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const found = await Jenayatcy.find({ _id: id });

    res.status(200).json({
      success: 1,
      data: found[0],
    });
  } catch (err) {
    res.status(500).json({
      success: 1,
      data: err.message,
    });
  }
};

const getJenayatcy = async (req, res) => {
  try {
    const { name, jenayaty, saklanyan_yeri, baslan_wagty, bosamaly_wagty } =
      req.query;
    let config = [];

    if (name) {
      config.push({ name: { $regex: `(?i)${name}` } });
      config.push({ surname: { $regex: `(?i)${name}` } });
      config.push({ father_name: { $regex: `(?i)${name}` } });
    }
    if (jenayaty) {
      config.push({ jenayaty: { $regex: `(?i)${jenayaty}` } });
    }
    if (saklanyan_yeri) {
      config.push({ saklanyan_yeri: { $regex: `(?i)${saklanyan_yeri}` } });
    }
    if (baslan_wagty) {
      config.push({ baslan_wagty: { $regex: `(?i)${baslan_wagty}` } });
    }
    if (bosamaly_wagty) {
      config.push({ bosamaly_wagty: { $regex: `(?i)${bosamaly_wagty}` } });
    }

    const found = await Jenayatcy.find(
      config.length == 0 ? {} : { $or: config }
    );

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
      req.body.image1 = process.env.BASE_URL + "/" + img;
    }
    if (req.files?.image2) {
      img = await imageUpload(req.files.image2.name, req.files.image2.data);
      req.body.image2 = process.env.BASE_URL + "/" + img;
    }
    if (req.files?.image3) {
      img = await imageUpload(req.files.image3.name, req.files.image3.data);
      req.body.image3 = process.env.BASE_URL + "/" + img;
    }
    if (req.files?.image4) {
      img = await imageUpload(req.files.image4.name, req.files.image4.data);
      req.body.image4 = process.env.BASE_URL + "/" + img;
    }

    const newJenayatcy = await Jenayatcy.create(req.body);

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
      const data = found.image.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
      req.body.image1 = img;
    }
    if (req.files?.image2) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      const data = found.image.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
      req.body.image2 = img;
    }
    if (req.files?.image3) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      const data = found.image.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
      req.body.image3 = img;
    }
    if (req.files?.image4) {
      img = await imageUpload(req.files.image.name, req.files.image.data);
      const data = found.image.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
      req.body.image4 = img;
    }

    await Jenayatcy.findByIdAndUpdate(id, req.body);

    const data = {
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      image4: req.body.image4,
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

    if (found.image1) {
      const data = found.image1.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
    }
    if (found.image2) {
      const data = found.image2.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
    }
    if (found.image3) {
      const data = found.image3.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
    }
    if (found.image4) {
      const data = found.image4.split("/");
      await fs.unlinkSync(data[3] + "/" + data[4]);
    }

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
    const data = file.split("/");
    await fs.unlinkSync(data[3] + "/" + data[4]);

    await Jenayatcy.findByIdAndUpdate(id, { [field]: null });

    res.status(200).json({
      success: 1,
    });
  } catch (err) {
    console.log(err);
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
exports.jenayatcyDetails = jenayatcyDetails;
