const cloudinary = require("cloudinary").v2;

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

// const image = "../testImages/test.png";

// cloudinary.uploader
//   .upload(image)
//   .then((result) => console.log("result", result));

const uploadProductImageToCloudinary = async (tempPath) => {
  const fileData = await cloudinary.uploader.upload(tempPath, {
    folder: "riovino",
    format: "webp",
  });

  return fileData;
};

const removeProductImageFromCloudinary = async (fileID) => {
  await cloudinary.uploader.destroy(fileID);
};

module.exports = {
  uploadProductImageToCloudinary,
  removeProductImageFromCloudinary,
};
