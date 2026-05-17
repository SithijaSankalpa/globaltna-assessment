const JobRequest = require("../models/JobRequest");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// @desc    Get all jobs
// @route   GET /api/jobs
exports.getAllJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search && search.trim()) {
      const safeSearch = escapeRegex(search.trim());
      filter.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const jobs = await JobRequest.find(filter)
      .populate("createdBy", "name role")
      .populate("statusUpdatedBy", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id)
      .populate("createdBy", "name role")
      .populate("statusUpdatedBy", "name role");

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Create job — homeowner only
// @route   POST /api/jobs
exports.createJob = async (req, res, next) => {
  try {
    const job = await JobRequest.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job request created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job details — homeowner who owns it, only if status is still Open
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    // Only the owner can edit
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to edit this job" });
    }

    // Cannot edit if a tradesperson has already acted on it
    if (job.statusUpdatedBy) {
      return res.status(403).json({
        success: false,
        message:
          "This job cannot be edited — a tradesperson has already updated its status",
      });
    }

    // Cannot edit if status is not Open
    if (job.status !== "Open") {
      return res.status(403).json({
        success: false,
        message: "Only Open jobs can be edited",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "category",
      "location",
      "contactName",
      "contactEmail",
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) job[field] = req.body[field];
    });

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update status — tradesperson only
// @route   PATCH /api/jobs/:id
exports.updateJobStatus = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req.body.status,
          statusUpdatedBy: req.user._id,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job — homeowner who owns it only
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job request not found" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Job request deleted successfully" });
  } catch (error) {
    next(error);
  }
};
