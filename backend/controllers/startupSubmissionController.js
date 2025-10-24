const StartupSubmission = require("../models/StartupSubmission")

// Get all startup submissions with pagination, search, filtering, and sorting
const getAllStartupSubmissions = async (req, res) => {
  try {
const {
      page = 1,
      pageSize = 10,
      searchValue = "",
      sortBy = "submissionDate",
      sortValue = -1,
      status,
    } = req.method === "POST" ? req.body : req.query;
    const searchQuery = {}
    if (searchValue) {
      searchQuery.userName = { $regex: searchValue, $options: "i" }
    }
    if (status) {
      searchQuery.status = Number.parseInt(status)
    }

    const skip = (page - 1) * pageSize
    const submissions = await StartupSubmission.find(searchQuery)
      .sort({ [sortBy]: Number.parseInt(sortValue) })
      .skip(skip)
      .limit(Number.parseInt(pageSize));

    // Remove Base64 data from response to reduce payload size
    const processedSubmissions = submissions.map(submission => {
      const submissionObj = submission.toObject();
      return {
        ...submissionObj,
        pitchDeckFile: {
          name: submissionObj.pitchDeckFile.name,
          contentType: submissionObj.pitchDeckFile.contentType
        }
      };
    });

    const total = await StartupSubmission.countDocuments(searchQuery);

    res.status(200).json({ submissions: processedSubmissions, total })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get submissions by user ID
const getSubmissionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await StartupSubmission.find({ userId });
    
    // Remove Base64 data from response to reduce payload size
    const processedSubmissions = submissions.map(submission => {
      const submissionObj = submission.toObject();
      return {
        ...submissionObj,
        pitchDeckFile: {
          name: submissionObj.pitchDeckFile.name,
          contentType: submissionObj.pitchDeckFile.contentType
        }
      };
    });

    res.status(200).json(processedSubmissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get submission by ID
const getStartupSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeFile } = req.query; // Optional query parameter to include file data
    const submission = await StartupSubmission.findById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // If includeFile is not true, remove Base64 data from response
    const submissionObj = submission.toObject();
    if (!includeFile) {
      submissionObj.pitchDeckFile = {
        name: submissionObj.pitchDeckFile.name,
        contentType: submissionObj.pitchDeckFile.contentType
      };
    }

    res.status(200).json(submissionObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add new submission
const addStartupSubmission = async (req, res) => {
  try {
    // Validate the PDF file data
    const { pitchDeckFile, ...otherData } = req.body;
    
    if (!pitchDeckFile || !pitchDeckFile.data || !pitchDeckFile.name || !pitchDeckFile.contentType) {
      return res.status(400).json({ message: "Pitch deck file data is required" });
    }

    // Validate file type
    if (pitchDeckFile.contentType !== 'application/pdf') {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    // Validate file size (limit to 10MB)
    const sizeInBytes = Buffer.from(pitchDeckFile.data, 'base64').length;
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (sizeInBytes > maxSize) {
      return res.status(400).json({ message: "File size should not exceed 10MB" });
    }

    // Create new submission with validated data
    const newSubmission = await StartupSubmission.create({
      ...otherData,
      pitchDeckFile: {
        data: pitchDeckFile.data,
        name: pitchDeckFile.name,
        contentType: pitchDeckFile.contentType
      }
    });

    // Remove the Base64 data from response to reduce payload size
    const responseSubmission = {
      ...newSubmission.toObject(),
      pitchDeckFile: {
        name: newSubmission.pitchDeckFile.name,
        contentType: newSubmission.pitchDeckFile.contentType
      }
    };

    res.status(200).json({ 
      message: "Submission added successfully", 
      submission: responseSubmission 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update submission
const updateStartupSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { pitchDeckFile, ...otherData } = req.body;

    // If updating the file, validate it
    if (pitchDeckFile) {
      if (!pitchDeckFile.data || !pitchDeckFile.name || !pitchDeckFile.contentType) {
        return res.status(400).json({ message: "Invalid pitch deck file data" });
      }

      // Validate file type
      if (pitchDeckFile.contentType !== 'application/pdf') {
        return res.status(400).json({ message: "Only PDF files are allowed" });
      }

      // Validate file size (limit to 10MB)
      const sizeInBytes = Buffer.from(pitchDeckFile.data, 'base64').length;
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (sizeInBytes > maxSize) {
        return res.status(400).json({ message: "File size should not exceed 10MB" });
      }
    }

    // Update submission
    const updateData = {
      ...otherData,
      ...(pitchDeckFile && {
        pitchDeckFile: {
          data: pitchDeckFile.data,
          name: pitchDeckFile.name,
          contentType: pitchDeckFile.contentType
        }
      })
    };

    const updatedSubmission = await StartupSubmission.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Remove Base64 data from response
    const responseSubmission = {
      ...updatedSubmission.toObject(),
      pitchDeckFile: {
        name: updatedSubmission.pitchDeckFile.name,
        contentType: updatedSubmission.pitchDeckFile.contentType
      }
    };

    res.status(200).json({ 
      message: "Submission updated successfully", 
      submission: responseSubmission 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete submission
const deleteStartupSubmission = async (req, res) => {
  try {
    const { id } = req.params
    const deletedSubmission = await StartupSubmission.findByIdAndDelete(id)

    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" })
    }

    res.status(200).json({ message: "Submission deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllStartupSubmissions,
  getSubmissionsByUserId,
  getStartupSubmissionById,
  addStartupSubmission,
  updateStartupSubmission,
  deleteStartupSubmission,
}
