const mongoose = require("mongoose");

const JenayatcySchema = new mongoose.Schema(
  {
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    image4: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    father_name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    birth_place: {
      type: String,
      required: true,
    },
    passport_number: {
      type: String,
      required: true,
    },
    hasapda_yeri: {
      type: String,
      required: true,
    },
    saklanyan_yeri: {
      type: String,
      required: true,
    },
    jenayaty: {
      type: String,
      required: true,
    },
    ayratyn_alamaty: {
      type: String,
      required: true,
    },
    yakyn_hossary: {
      type: String,
      required: true,
    },
    baslan_wagty: {
      type: String,
      required: true,
    },
    bosamaly_wagty: {
      type: String,
      required: true,
    },
    hasiyetnamasy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jenayatcy", JenayatcySchema);
