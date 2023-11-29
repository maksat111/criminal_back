const fs = require("fs");

const imageUpload = (img_name, img_data) => {
  const randomNumber = Math.floor(Math.random() * 999999999999);
  const img_direction = `uploads/` + randomNumber + `${img_name}`;
  fs.writeFile(img_direction, img_data, function (err) {
    if (err) {
      return;
    }
  });
  return img_direction;
};

module.exports = imageUpload;
