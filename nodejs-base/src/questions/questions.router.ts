import express from "express";
import asyncHandler from "express-async-handler";
import {IAuthenticatedRequest} from "../types/IAuthenticatedRequest";

const router = express.Router();

router.get('/filters', asyncHandler(async (req: express.Request, res) => {
    res.status(200).send((req as IAuthenticatedRequest).currentUser);
}));

export default router;