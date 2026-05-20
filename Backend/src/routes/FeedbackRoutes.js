import express from "express";
import { getDoctor, submitFeedback } from "../controller/FeedBackController.js";


const router = express.Router();

router.get("/get/:id", getDoctor);
router.post("/submit", submitFeedback);


export default router;
