// routes/prescriptionRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const User = require("../models/User.js");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "prescriptions",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// Upload prescription image and text
router.post("/upload-prescription", upload.single("image"), async (req, res) => {
  try {
    const { note, userId, prescriptionText } = req.body;
    const imageUrl = req.file.path;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.prescriptions = user.prescriptions || [];
    user.prescriptions.push({
      imageUrl,
      prescriptionText,
      date: new Date()
    });

    await user.save();

    res.status(200).json({ message: "Prescription uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading prescription" });
  }
});

// Get all prescriptions by user email
router.get("/get-prescriptions/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.prescriptions || []);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
});

module.exports = router;
