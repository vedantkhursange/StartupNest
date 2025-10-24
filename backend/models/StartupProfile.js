const mongoose = require("mongoose")

const startupProfileSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: "text",
  },
  description: {
    type: String,
    required: true,
  },
  fundingLimit: {
    type: Number,
    required: true,
  },
  avgEquityExpectation: {
    type: Number,
    required: true,
  },
  targetIndustry: {
    type: String,
    required: true,
  },
  preferredStage: {
    type: String,
    required: true,
    enum: ["idea", "MVP", "pre-revenue", "scaling", "established"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("StartupProfile", startupProfileSchema)
