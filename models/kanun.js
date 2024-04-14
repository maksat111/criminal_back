const mongoose = require("mongoose");

const KanunSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "No content",
    },
    statya: {
      type: String,
      default: "No content",
    },
    description: {
      type: String,
      default: "No content",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kanun", KanunSchema);
