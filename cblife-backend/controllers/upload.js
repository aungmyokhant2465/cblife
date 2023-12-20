const uploadRouter = require("express").Router();

const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../utils/s3Client");

const { v4: uuidv4 } = require("uuid");

uploadRouter.get("/image", async (_, res) => {
  try {
    const imageUploadInfo = await ImageUploadInfoGenerator();
    res.json({
      error: 0,
      message: "imageUploadURL Generation Successful",
      imageUploadUrl: imageUploadInfo.imageUploadUrl,
      imageName: imageUploadInfo.imageName,
    });
  } catch (e) {
    res.json({
      error: 1,
      message: e.message,
      imageUploadUrl: "",
      imageUploadInfo: "",
    });
  }
});

const ImageUploadInfoGenerator = async (name) => {
  try {
    // const imageName = uuidv4();
    const imageName = name ? "" + name + Date.now() : uuidv4();
    const bucketParams = {
      Bucket: "axra",
      Key: `CBLife/${imageName}`,
      ContentType: "image/jpeg",
      ACL: "public-read",
    };

    const imageUploadUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand(bucketParams),
      { expiresIn: 150 * 60 }
    ); // Adjustable expiration.
    console.log("URL:", imageUploadUrl);
    return { imageUploadUrl, imageName };
  } catch (e) {
    throw new Error(e.message);
  }
};

uploadRouter.delete("/image", async (req, res) => {
  try {
    const { imageName } = req.body;
    await deleteImage(imageName);
    res.json({ error: 0, message: "delete Image Successful" });
  } catch (e) {
    res.json({ error: 1, message: e.message });
  }
});

const deleteImage = async (imageName) => {
  try {
    const bucketParams = {
      Bucket: "axra",
      Key: `CBLife/${imageName}`,
    };
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    console.log("Success", data);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = uploadRouter;
