import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "semicolonsy",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;

  res.json({ location });
};

// export const postUpload = async (req, res) => {
//   const { body: { title, description, _id }, file: { location } } = req;
//   const { user } = req;
//   console.log(file)
  
//     const newVideo = await Video.create({
//       fileUrl: path,
//       fileUrl: location,
//       title: title,
//       description: description,
//     })

//     res.json({ location });
  
// }