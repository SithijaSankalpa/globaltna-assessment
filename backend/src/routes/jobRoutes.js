const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

const {
  createJobValidator,
  updateStatusValidator,
  updateJobValidator,
} = require("../validators/jobValidators");
const validate = require("../middleware/validate");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Homeowner only
router.post(
  "/",
  protect,
  authorizeRoles("homeowner"),
  createJobValidator,
  validate,
  createJob,
);
router.put(
  "/:id",
  protect,
  authorizeRoles("homeowner"),
  updateJobValidator,
  validate,
  updateJob,
);
router.delete("/:id", protect, authorizeRoles("homeowner"), deleteJob);

// Tradesperson only
router.patch(
  "/:id",
  protect,
  authorizeRoles("tradesperson"),
  updateStatusValidator,
  validate,
  updateJobStatus,
);

module.exports = router;
