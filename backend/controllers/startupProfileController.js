const StartupProfile = require("../models/StartupProfile")

const getAllStartupProfiles = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, searchValue = "", sortBy = "createdAt", sortValue = -1 } = req.query

    const searchQuery = {}
    if (searchValue) {
      searchQuery.$or = [
        { category: { $regex: searchValue, $options: "i" } },
        { description: { $regex: searchValue, $options: "i" } },
        { targetIndustry: { $regex: searchValue, $options: "i" } },
      ]
    }

    const skip = (page - 1) * pageSize
    const profiles = await StartupProfile.find(searchQuery)
      .populate("mentorId", "userName email")
      .sort({ [sortBy]: Number.parseInt(sortValue) })
      .skip(skip)
      .limit(Number.parseInt(pageSize))

    const total = await StartupProfile.countDocuments(searchQuery)

    res.status(200).json({ profiles, total, page: Number.parseInt(page), pageSize: Number.parseInt(pageSize) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getStartupProfileById = async (req, res) => {
  try {
    const { id } = req.params
    const profile = await StartupProfile.findById(id).populate("mentorId", "userName email")

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addStartupProfile = async (req, res) => {
  try {
    const newProfile = await StartupProfile.create(req.body)
    res.status(200).json({ message: "Profile added successfully", profile: newProfile })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateStartupProfile = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProfile = await StartupProfile.findByIdAndUpdate(id, req.body, { new: true })

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteStartupProfile = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProfile = await StartupProfile.findByIdAndDelete(id)

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.status(200).json({ message: "Profile deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getStartupProfilesByMentorId = async (req, res) => {
  try {
    const { mentorId } = req.params
    const { page = 1, pageSize = 10, sortBy = "createdAt", sortValue = -1 } = req.query

    const skip = (page - 1) * pageSize
    const profiles = await StartupProfile.find({ mentorId })
      .populate("mentorId", "userName email")
      .sort({ [sortBy]: Number.parseInt(sortValue) })
      .skip(skip)
      .limit(Number.parseInt(pageSize))

    const total = await StartupProfile.countDocuments({ mentorId })

    res.status(200).json({ profiles, total, page: Number.parseInt(page), pageSize: Number.parseInt(pageSize) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllStartupProfiles,
  getStartupProfileById,
  addStartupProfile,
  updateStartupProfile,
  deleteStartupProfile,
  getStartupProfilesByMentorId,
}
