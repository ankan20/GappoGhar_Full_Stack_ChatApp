import multer from "multer";
const storage = multer.diskStorage({});

const multerUpload = multer({
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
});

const singleAvatar = multerUpload.single("avatar");

const attachmentsMulter = multerUpload.array("files",5);

export {multerUpload ,singleAvatar , attachmentsMulter}