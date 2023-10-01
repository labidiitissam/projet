import express from "express";
import protect from "../middleware/auth.js";
import {createReservation,getRservationByUser,cancelReservation,getPublisherRservation} from "../controllers/reservationController.js";
const router = express.Router();

router
.post("/create",protect,createReservation)
.get('/',protect,getRservationByUser)
.get('/owner',protect,getPublisherRservation)
.put('/cancel/:id',protect,cancelReservation)



export default router;