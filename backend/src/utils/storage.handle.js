const Multer = require('multer');

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    },
});

const uploadMiddleware = Multer({ storage: storage });

module.exports = uploadMiddleware;