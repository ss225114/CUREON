import { log } from "console";
import Doctor from "../models/Doctor.js";
import axios from "axios";

const getSimilarDoctors = async (doc) => {
  console.log("doctor data for similarity search:", doc);
  const doctor = await Doctor.findById(doc[0]._id);

  // const payload = {
  //   id: doctor._id.toString(),
  //   consultationFee: doctor.consultationFee,
  //   rating: doctor.rating,
  // };

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
