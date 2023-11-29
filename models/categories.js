const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name_ru: {
      type: String,
      default: "No name",
    },
    name_en: {
      type: String,
      default: "No name",
    },
    name_tm: {
      type: String,
      default: "No name",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
