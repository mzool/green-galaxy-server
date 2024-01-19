import multer from "multer";
import path from "path";
import idGenerator from "../../services/idGenerator.js";
function uploadFile(req, res, next) {
    const storage = multer.diskStorage({
        destination: 'uploads/files',
        filename: function (req, file, cb) {
            cb(null, idGenerator(1, false) + "_" + file.originalname);
        },
    });

    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            const ext = path.extname(file.originalname).toLowerCase();
            if (!['.xlsx'].includes(ext)) {
                return callback(null, false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 50 * 1024 * 1024, // 50MB
        }
    }).single("excelFile")

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(422).json({ error: err.message });
        } else if (err?.storageErrors?.length > 0) {
            return res.status(422).json({ error: "Invalid file type" });
        } else if (err) {
            // Handle other errors, possibly log them
            return res.status(500).json({ error: "An error occurred" });
        }
        next();
    });
}

export default uploadFile;
