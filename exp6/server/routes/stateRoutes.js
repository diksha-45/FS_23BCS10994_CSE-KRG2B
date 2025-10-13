import express from "express";
import { getAllStates, addState } from "../controllers/stateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllStates);
router.post("/", protect, addState);

export default router;
