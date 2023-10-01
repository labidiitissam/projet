import express from "express";
import { createPlace,getlistOfEventPlaces,updatePlace } from "../controllers/eventController.js";
import protect from "../middleware/auth.js";
const router = express.Router();

router
.post("/create",protect,createPlace)
.get('/list',getlistOfEventPlaces)
.put('/:id',protect,updatePlace)



export default router;