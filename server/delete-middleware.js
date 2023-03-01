const AWS = require("aws-sdk");
const S3 = require("aws-sdk/clients/s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_S3_BUCKET,
});

function deleteMiddleware() {
  s3.deleteObject(
    { Bucket: "travelappmaxcenbucket", Key: "1677634862836.JPG" },
    (err, data) => {
      console.error(err);
      console.log(data);
    }
  );
}

module.exports = deleteMiddleware;
