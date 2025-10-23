// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: 'dxaj9lexj',
//   api_key: '755567812358821',
//   api_secret: 'TdpK_yHSnK5D_h'
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'eproject_profile_pictures',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'profile-' + req.user.id,
//   },
// });

// module.exports = {
//   cloudinary,
//   storage,
// };

// updated code
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dxaj9lexj',
  api_key: '755567812358821',
  api_secret: 'TdpK_yHSnK5D_h-gV7z3n4Y'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eproject_profile_pictures',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'profile-' + Date.now(),
  },
});

module.exports = {
  cloudinary,
  storage,
};