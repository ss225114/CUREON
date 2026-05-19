import Doctor from "../models/Doctor.js";
import DoctorReview from "../models/DoctorReviews.js";

export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id });
    return res.status(200).json({
      doctor,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "error fetching doctor name",
    });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { id, rating, review } = req.body;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Calculate new average rating
    const newRatingCount = doctor.ratingCount + 1;

    const newAverageRating =
      (doctor.rating * doctor.ratingCount + rating) /
      newRatingCount;

    // Update doctor rating data
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        $set: {
          rating: newAverageRating,
        },
        $inc: {
          ratingCount: 1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Store review
    const newReview = await DoctorReview.create({
      docId: id,
      review,
    });

    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      updatedDoctor,
      newReview,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
