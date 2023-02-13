import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get('/health', asyncHandler(async (req, res) => {
    res.status(200).send('Service is UP');
}));

export default router;