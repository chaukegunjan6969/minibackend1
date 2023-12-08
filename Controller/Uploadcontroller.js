const register = require("../Model/Registermodel");

const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(fileType, suppoertedTypes) {
  return suppoertedTypes.includes(fileType);
}

async function uploadFileCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("Temp File Path", file.tempFilePath);
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadImage = async (req, res) => {
  try {
    const { nameofproperty, ownerName, city, price } = req.body;

    console.log(nameofproperty, city, ownerName, price);

    const file = req.files.imageFile;

    console.log(file);

    const suppoertedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);

    if (!isFileTypeSupported(fileType, suppoertedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File Format Not Supported",
      });
    }

    console.log(fileType);

    const response = await uploadFileCloudinary(file, "codeHelp");
    console.log(response);

    const fileData = await register.create({
      nameofproperty,
      ownerName,
      city,
      price,
      imageurl: response.secure_url,
    });

    console.log(fileData);

    res.json({
      success: true,
      message: "Image Succesfully Uploader",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: "False",
      message: "Somethinng Went Wrong",
    });
  }
};
