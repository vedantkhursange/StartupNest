const mongoose = require("mongoose")

const startupSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  startupProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StartupProfile",
    required: true,
  },
  submissionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  marketPotential: {
    type: Number,
    required: true,
  },
  launchYear: {
    type: Date,
    required: true,
  },
  expectedFunding: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 1, // 1 = Submitted, 2 = Shortlisted, 3 = Rejected
  },
  address: {
    type: String,
    required: true,
  },
  pitchDeckFile: {
    name: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    data: {
      type: String, // Base64 encoded file data
      required: true
    }
  }
})

module.exports = mongoose.model("StartupSubmission", startupSubmissionSchema)
