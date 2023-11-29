const mongoose = require("mongoose");

const FoodsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name_en: {
      type: String,
      default: "No name",
    },
    name_ru: {
      type: String,
      default: "No name",
    },
    name_tm: {
      type: String,
      default: "No name",
    },
    description_en: {
      type: String,
      default: "No description",
    },
    description_ru: {
      type: String,
      default: "No description",
    },
    description_tm: {
      type: String,
      default: "No description",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Foods", FoodsSchema);
