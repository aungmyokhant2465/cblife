const { S3 } = require("@aws-sdk/client-s3");
const {
  DIGITAL_OCEAN_ACCESS_KEYID,
  DIGITAL_OCEAN_SECRET_ACCESS_KEY,
} = require("./config");

const s3Client = new S3({
  endpoint: "https://sgp1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: DIGITAL_OCEAN_ACCESS_KEYID,
    secretAccessKey: DIGITAL_OCEAN_SECRET_ACCESS_KEY,
  },
});

module.exports = { s3Client };
