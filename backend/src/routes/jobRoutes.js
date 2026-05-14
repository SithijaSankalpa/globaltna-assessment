const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const {
  createJobValidator,
  updateStatusValidator,
} = require("../validators/jobValidators");
const validate = require("../middleware/validate");

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", createJobValidator, validate, createJob);
router.patch("/:id", updateStatusValidator, validate, updateJobStatus);
router.delete("/:id", deleteJob);

module.exports = router;
