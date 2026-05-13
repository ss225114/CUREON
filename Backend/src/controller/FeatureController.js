import Doctor from "../models/Doctor.js";
import axios from "axios";

const getSimilarDoctors = async (doc) => {
  console.log("doctor data for similarity search:", doc);
  const doctor = await Doctor.findById(doc[0]._id);

  const response = await axios.post("http://localhost:8005/similar", doctor);

  const ids = response.data.map((r) => r.id);

  const doctors = await Doctor.find({ _id: { $in: ids } });

  return doctors;
};

export const searchDoctors = async (req, res) => {
  try {
    // console.log(req.body);

    const {
      specialization,
      name,
      location,
      minFee,
      maxFee,
      minRating,
      gender,
      useSimilarity,
    } = req.body;

    const filter = { isActive: true };

    if (specialization) {
      filter.specialization = Array.isArray(specialization)
        ? { $in: specialization }
        : { $in: [specialization] };
    }

    if (name) {
      filter.fullName = { $regex: name, $options: "i" };
    }

    if (location) {
      filter.location = location;
    }

    if (gender) {
      filter.gender = gender;
    }

    if (minFee || maxFee) {
      filter.consultationFee = {};
      if (minFee) filter.consultationFee.$gte = minFee;
      if (maxFee) filter.consultationFee.$lte = maxFee;
    }

    if (minRating) {
      filter.rating = { $gte: minRating };
    }

    let doctors = await Doctor.find(filter).sort({ clusterId: -1 }).limit(20);

    if (!useSimilarity) {
      return res.json(doctors);
    }

    const similarDoctors = await getSimilarDoctors(doctors);
    console.log("similar doctors: ", similarDoctors);

    return res.json(similarDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const data = await Doctor.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
};

export const getAllSpecializations = async (req, res) => {
  try {
    const specializations = await Doctor.distinct("specialization");

    res.status(200).json({
      success: true,
      count: specializations.length,
      data: specializations,
    });
  } catch (error) {
    console.error("Error fetching specializations:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch specializations",
    });
  }
};

// export const searchDoctors = async (req, res) => {
//   try {
//     const {
//       specialization,
//       name,
//       location,
//       minFee,
//       maxFee,
//       minRating,
//       gender,
//       useSimilarity,
//     } = req.body;

//     const filter = {
//       isActive: true,
//     };
//     if (specialization) {
//       filter.specialization = Array.isArray(specialization)
//         ? { $in: specialization }
//         : { $in: [specialization] };
//     }

//     if (name) {
//       filter.fullName = {
//         $regex: name,
//         $options: "i",
//       };
//     }

//     if (location) {
//       filter.location = location;
//     }

//     if (gender) {
//       filter.gender = gender;
//     }

//     if (minFee || maxFee) {
//       filter.consultationFee = {};

//       if (minFee) {
//         filter.consultationFee.$gte = minFee;
//       }

//       if (maxFee) {
//         filter.consultationFee.$lte = maxFee;
//       }
//     }

//     if (minRating) {
//       filter.rating = {
//         $gte: minRating,
//       };
//     }

//     let doctors = await Doctor.find(filter)
//       .sort({ clusterId: -1 })
//       .limit(20)
//       .lean();

//     if (!doctors.length) {
//       return res.json([]);
//     }

//     if (!useSimilarity) {
//       return res.json(doctors.slice(0, 5));
//     }

//     const seedDoctor = doctors[0];

//     const response = await axios.post(
//       "http://localhost:8005/similar",
//       seedDoctor,
//     );

//     const rankedIds = response.data.map((d) => d.id);

//     const similarDoctors = await Doctor.find({
//       _id: { $in: rankedIds },
//     }).lean();

//     const mapped = similarDoctors.map((doctor) => {
//       const similarityData = response.data.find(
//         (d) => d.id === doctor._id.toString(),
//       );

//       const similarityScore = similarityData ? similarityData.score : 0;

//       const finalScore =
//         similarityScore * 0.5 +
//         doctor.rating * 0.3 +
//         (1 / doctor.consultationFee) * 0.2;

//       return {
//         ...doctor,
//         finalScore,
//       };
//     });

//     mapped.sort((a, b) => b.finalScore - a.finalScore);

//     return res.json(mapped.slice(0, 5));
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// };
